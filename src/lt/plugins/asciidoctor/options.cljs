(ns lt.plugins.asciidoctor.options
  (:require [lt.object :as object]
            [lt.objs.find :as finds]
            [lt.objs.command :as cmd]
            [lt.objs.sidebar.command :as cmds]
            [lt.objs.files :as files]
            [lt.objs.editor :as editor]
            [lt.objs.plugins :as plugins]
            [lt.objs.editor.pool :as pool]
            [clojure.string :as string]
            [lt.plugins.asciidoctor.util :as adu])
  (:require-macros [lt.macros :refer [defui behavior]]))

;; common variations of casing allowed in several places (internal use)
(def ^:private upper-kw (comp keyword string/upper-case name))
(def ^:private capital-kw (comp keyword string/capitalize name))
(def ^:private lower-kw (comp keyword string/lower-case name))

(def doctypes
  #{[:book "document type allows multiple level-0 section titles in a single document"]
    [:article "default doctype is article"]
    [:inline "allows the content of a single paragraph to be formatted and returned without wrapping it in a containing element"]
    [:manpage "enables parsing of metadata necessary to produce a manpage"]
    })

(defn variant-ks
  "Takes a sequence of keywords and returns a list of variations on the casing
  of those keywords. Returns lower-, upper-case and capitalized variations."
  [s] (flatten (map (juxt upper-kw capital-kw lower-kw) s)))

;; (= '(:FOO :Foo :foo :BAR :Bar :bar :BAZ :Baz :baz)
;;    (variant-ks [:foo :bar :baz]))

(defn dichotomies
  "Handles some common dichotomies and their variations. Allows for both keywords and
  strings as input, as well as 0 or 1. Either capitalized, upper- and lower-case forms
  are accepted and return values are true for truthy values, false for falsey else nil."
  [in]
  (let [polars {:on :off :yes :no :true :false :enabled :disabled :t :f :1 :0 :+ :- :y :n}
        [truthy falsey] [(variant-ks (keys polars))
                         (variant-ks (vals polars))]
        value (if (string? in) (keyword in)
                (if (keyword? in) in
                  (if (zero? in) :0
                    (if (= 1 in) :1
                      (throw (js/Error. "Incorrect data type. Need either string or keyword."))))))]
    (if (some #{value} truthy)
      true
      (if (some #{value} falsey)
        false
        nil))))

;; (def util-inspect
;;   (.-inspect (js/require "util")))

;; (defn inspect [thing depth]
;;   (util-inspect thing false (or depth 5)))

(defn cl-enum
  "Poor man's emulation of cl-format natural language enumeration
  of sequences. Defaults to 'and', using :conjoin e.g. 'or' is possible."
  [s &{conjoin :conjoin :or {conjoin "and"}}]
  (string/join (flatten (cons (drop-last (butlast (interpose ", " s)))
                              (list (str " " conjoin " ") (last s))))))

;; (true?
;;  (and
;;   (= "one, two and three"
;;      (cl-enum ["one" "two" "three"]))
;;   (= "one, two or three"
;;      (cl-enum ["one" "two" "three"] :conjoin "or"))))


(defn opal-hash
  "Takes optional arguments :doctype and :attributes and passes them to
  the Opal.hash2 internal function to create a map consumable by asciidoctor."
  [& {doctype :doctype attributes :attributes
      :or {doctype "article" attributes ["showtitle"]}}]
  (let [dt (if (some #{(keyword doctype)} (keys doctypes)) doctype
             (throw (js/Error. (str "Not a valid doctype. Require one of "
                                    (cl-enum (map name (keys doctypes)) :conjoin "or")))))
        am {:doctype dt :attributes (apply array attributes)}]
    (Opal.hash2 (clj->js (keys am))
                (clj->js am))))

(opal-hash :doctype "book" :attributes [":!numbered:"])


;;   (Opal.hash2 (clj->js (keys opt-map))
;;               (clj->js {:doctype "book" :attributes (array attributes)})))

;; (= (every? true? (map dichotomies [:true :1 1 :Yes :TRUE :enabled :Enabled :ON]))
;;    (every? false? (map dichotomies [:off :0 0 :NO :False :disabled :no])))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; predicates
;;

(defn nothing?
  "Predicate to return true if a form of nothingness has been provided."
  [v] (if (some #{v} #{"" :nil :empty :nothing :null :void :sink})
        true false))

(def enabled?
  "Predicate which returns true in case provided argument
  equals a 'truth' value e.g. true, on, enabled, yes, +, 1, etc."
  #(dichotomies %))

(def disabled?
  "Predicate which returns true in case provided argument
  equals a 'false' value e.g. false, off, disabled, no, -, 0, etc."
  (complement enabled?))

(def something?
  "Predicate which returns true if the argument is not nothing? Nothing here
  equals a subset of tokens defined in the nothing? predicate e.g. :empty, :void"
  (complement nothing?))

(def not-nil?
  "Complements the built-in nil? predicate."
  (complement nil?))

(def not-empty?
  "Complements the built-in empty? predicate."
  (complement empty?))

;; (disabled? "off") ;=> true
;; (enabled? "on") ;=> true

(defn toggle-switch
  "Toggles between any true/false dichotomies as :enabled and :disabled states."
  [k] (if (= (dichotomies k) true) :disabled
        (if (= (dichotomies k) false) :enabled
          nil)))

;; (= (list :enabled :disabled :enabled :disabled :enabled :disabled :enabled :disabled)
;;    (map toggle-switch [:disabled :enabled :off :on "0" 1 "NO" :Yes]))

(comment "Asciidoctor uses a convention where, while quite a lot of attributes are in fact booleans,
  the non-boolean fields can also be enabled or disabled. Often this is done appropriatly by either
  setting the attribute value to nothing or an empty string, and not by means of exclamation. One
  such example is :description which is set to "" :default. In order to properly determine the state
  we should thus not only look at the attribute key name but also to its value and in particular the
  :default value.

  In conclusion, this allows for a mixed sequence of key and key/value pairs to be entered as attributes,
  sometimes toggling state for booleans by only using the key as :!disabled: or :enabled:

  More or less this will turn out as: [:!foo: :bar: :bam!: {:boo \"bababa\"}]
  ")

(defn adoc-flagged-kw
  "Takes a asciidoctor keyword form e.g. :!foo: and returns state as enabled or disabled.
  Asciidoctor keywords use exclamation marks to denote disabled states e.g. :!numbered:
  disables numbered sections throughout the document."
  [in] ((fn [k] (if (or (= (first (name k)) \!)
                        (= (last (name k)) \!)
                        (= (last (butlast (name k))) \!))
                  :disabled (if (nothing? (:default (k attribute-map)))
                              :disabled :enabled))) (keyword in)))

;; (= true (and (every? #{:disabled} (map adoc-flagged-kw [:!foo: :bar!: :bal! :!bak :!bam!:]))
;;              (every? #{:enabled} (map adoc-flagged-kw [:foo: :bar: :bal :bak :bam:]))))

(defn naked-key
  "Takes a key potentially in asciidoctor attribute form and strips
  naked to its bare minimum clojure form e.g. :!foo!: => :foo"
  [k] (if-let [k? (keyword? k)]
        (let [in (name k)
              in (if (= (first in) \!) (rest in) in)
              in (if (= (last in) \:) (butlast in) in)
              in (if (= (last in) \!) (butlast in) in)]
          (keyword (string/join in)))))

;; (= :foo (first (distinct (map naked-key [:foo :!foo :!foo: :foo!: :!foo!:]))))

(defn english-key
  "Takes a keyword and substitutes hyphens for spaces and underscores for hyphens."
  [k] (string/replace (string/replace (name k) "-" " ") "_" "-"))

;; "Some words just require that-little-extra thing"
;; (= (english-key :oof-ym-rab)
;;    (string/reverse (english-key :bar-my-foo)))

;; TODO: move this to object/object* ::options :attributes []

(def stateful-attrs
  "Hash-map using asciidoctor form keys which have a built-in flag/switch to denote
  or toggle their often boolean values. Used in doc strings and description of state."
  {:!numbered:   {:verb :auto_numbering :object :sections}
   :description: {:verb :description :object :document :default ""}
   :sectids:     {:verb :generation :object :section-title-ids
                  :aggregate {:using (and :section-title :idprefix)}}
   :idprefix:    {:verb :prefixing :object :section-ids :default \_}
   :!toc:        {:verb :auto_generation :object :table-of-contents}})



(def state-agnostic-keymap
  "FIXME: adoc-flagged does not look at :default atm
  Returns a state agnostic key map of attributes, augmenting the value map with :state and :value"
  (into {} (map #(hash-map (naked-key (key %))
                           (into (val %) {:value (key %)
                                          :state (adoc-flagged-kw (key %))}))
                stateful-attrs)))


;; dropped the notion of location/effect descriptions since we cannot modify
;; these baked in attribute effects really, we'll stick to verb -> object ?aggregate


;; TODO: see how aggregates fit in the whole picture...

(defn attribute-map
  "Asciidoctor attribute map (in progress as being gathered) which takes a state
  agnostic key (dubbed naked key, or clojure key here) as input using special case
  :all to return all attributes."
  [k] (if (= k :all) stateful-attrs
        (filter #(= (naked-key (key %)) k) stateful-attrs)))


;; (attribute-map :all)
;; (attribute-map :toc)


(defn attribute-nlp-state
  "Returns a natural language based representation of the attribute state."
  [k] (map #(->> (list (english-key (adoc-flagged-kw (key %)))
                       "the"
                       (english-key (:verb (val %)))
                       "of"
                       (english-key (:object (val %))))
                 (string/join " ")
                 string/capitalize)
           (attribute-map k)))

;; (attribute-nlp-state :numbered)
;; (attribute-nlp-state :toc)
;; (attribute-nlp-state :all)
;; Having done all this, we can allow for a simple checkbox mechanism
;; in defui to toggle attributes while at the same time supporting
;; the asciidoctor notation in e.g. document itself to easily map
;; back and forth between the altered states and have the descriptions
;; match the events e.g. switch off -> disabled ..., switch on -> enabled ...


(defn default-opts
  "Returns a normalized map of default attribute values. Uses first the key name to
  determine boolean flag on/off. If the key has a value with :default key it checks
  to see if that value is 'something' (not nothing) or else will switch off, else on.
  With the current setup having description set an empty string as default, renders
  the default value of the attribute as disabled while idprefix is enabled due to _:
  ([:!numbered: :disabled]
   [:description: :disabled] ; <=== empty string suppressed and switched off
   [:sectids: :enabled]
   [:idprefix: :enabled \"_\"] ; <=== not empty string is shown and switched on
   [:!toc: :disabled])
  Each attribute is named as is, that means with or without exclamation marks followed
  by on/off switch (:enabled or :disabled) always enforced. Optionally third and last
  value of the attribute vector contains the :default value if any and not nothing."
  [] (map #(hash-map (naked-key (key %))
                     (apply vector
                            (remove nil? (list (key %)
                                               (adoc-flagged-kw (key %))
                                               (if (something? (:default (val %)))
                                                 (:default (val %)))))))
          (attribute-map :all)))
