(ns lt.plugins.asciidoctor.util
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.dev :as dev]
            [lt.util.dom :as dom]
            [lt.util.load :as load]
            [lt.objs.tabs :as tabs]
            [lt.objs.find :as finds]
            [lt.objs.command :as cmd]
            [lt.objs.sidebar.command :as cmds]
            [lt.objs.files :as files]
            [lt.objs.document :as doc]
            [lt.objs.editor :as editor]
            [lt.objs.opener :as opener]
            [lt.objs.deploy :as deploy]
            [lt.objs.console :as console]
            [lt.objs.plugins :as plugins]
            [lt.objs.editor.pool :as pool]
            [lt.objs.clients.local :as local]
            [lt.objs.sidebar.clients :as clients]
            [clojure.string :as string]
            [crate.binding :as bindings]
            )
  (:require-macros [lt.macros :refer [defui behavior]]))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; helpers
;;

(enable-console-print!)

(def not-nil? (complement nil?))

(defn get-ed
  "Get current editor value."
  [] @(pool/last-active))

(defn get-in-ed
  "Get from current editor value keys."
  [& ks] (get-in (get-ed) (apply vector ks)))

(def ns*
  "'Hackish' way of getting the current namespace unless
  macro's are used seems to be the only way."
  (namespace ::x))

(def guessed-name
  "Educated guess of this plugin name. Other ways not possible
  without constant string me thinks."
  (string/capitalize ((string/split ns* ".") 2)))

(defn get-all
  "Return all asciidoctor editors."
  [] (object/by-tag :editor.asciidoctor))

(defn file-types
  "Returns this plugin found file and mime types associated if any."
  [] (get (:types @files/files-obj) guessed-name))

(defn file-exts
  "Returns this plugin associated extensions if any."
  [] (mapv name (:exts (file-types))))

(defn has-types?
  "Predicate returns true if associated file types have been found, false if not."
  [] (not-nil? (file-types)))

(defn encapsulate
  "Takes a sequence sq as first argument, opening/closing tokens ot/ct and separator.
  Returns encapsulated string representation e.g.
  (encapsulate [\"foo\" \"bar\"] \"(\" \")\" \"|\") ;=> (foo|bar)"
  [sq ot ct sep]
  (str ot (string/join (interpose sep sq)) ct))

(defn patternize
  "Returns a regular expression pattern from file types associated, if any."
  [] (when (has-types?) (re-pattern (encapsulate (file-exts) ".*(" ")" "|"))))

(defn desc
  "Standard format of command description: 'Topic: First word is capitalized'"
  [txt &{topic :topic :or {topic guessed-name}}]
  (str topic ": " (string/capitalize txt)))

(defn ensure-and-focus-second-tabset
  "Make tabset and tab appear properly."
  [] (when (< (-> @tabs/multi :tabsets count) 2)
       (cmd/exec! :tabset.new))
  (cmd/exec! :tabset.next))

(defn safe-get-path
  "Return a valid path of this plugin or throw an error if not found."
  [& parts]
  (let [path (files/join (plugins/find-plugin guessed-name) (string/join parts))]
    (if-let [plugin? (files/exists? path)]
      path
      (throw (js/Error. (str "Path " path " could not be found."))))))

(def loader
  "Loads the asciidoctor.js file from bower_components."
  (do
    (load/js (safe-get-path "bower_components/asciidoctor.js/dist/asciidoctor-all.js") true)
    :done))

(def sample-content
  "Returns content of the sample asciidoc file."
  (-> (safe-get-path "resources/example.asciidoc")
      (files/open-sync)
      (:content)))

(defn bower-json
  "Takes a directory and reads the bower.json file if found inside."
  [dir]
  (when-let [content (files/open-sync (files/join dir "bower.json"))]
    (-> (js/JSON.parse (:content content))
        (js->clj :keywordize-keys true)
        (assoc :dir dir)
        )))

(defn adjs-version
  "Returns the version of the bower asciidoctor.js dependency."
  [] (-> (plugins/find-plugin guessed-name)
         bower-json
         :dependencies
         :asciidoctor.js))

(def util-inspect
  (.-inspect (js/require "util")))

(defn inspect [thing depth]
  (util-inspect thing false (or depth 5)))

(defn doctypes
  [] (list
      {:name "book" :desc "document type allows multiple level-0 section titles in a single document"}
      {:name "article" :desc "default doctype is article"}
      {:name "inline" :desc "allows the content of a single paragraph to be formatted and returned without wrapping it in a containing element"}
      {:name "manpage" :desc "enables parsing of metadata necessary to produce a manpage"}
      ))


(defn ->width [width]
  (str (or width 0) "px"))

(def doctype-selector (cmds/filter-list {:items (fn []
                                                 (sort-by :name (doctypes)))
                                        :key :name
                                        :placeholder "Doctype"}))




(behavior ::set-doctype
          :triggers #{:select}
          :reaction (fn [this v]
                      (cmd/exec-active! v)))

(behavior ::init-doctype-selector
          :triggers #{:init}
          :reaction (fn [app]
                      (object/raise doctype-selector :refresh!)))


(object/add-behavior! doctype-selector ::set-doctype)

(cmd/command {:command :set-doctype
              :desc (desc "set current asciidoctor document doctype")
              :options doctype-selector
              :exec (fn [dt]
                      (if-let [last (last-active)]
                        (set-doctype last dt)
                        (notifos/set-msg! "Set doctype requires an active asciidoctor editor")))})


(defn get-opts
   [&{doctype :doctype attrs :attrs
      :or {attrs ["showtitle"] doctype "book"}}]
  (when-not js/window.asciidoctor
    loader
    (let [m {:doctype doctype :attributes (JSON/stringify attrs)}
          ks (->> m keys (map name))]
      (Opal.hash2 (clj->js ks)
                  (clj->js m)))))

;; (get-opts)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; ui
;;

(declare options)


(defui add-button [this]
  [:h2.toggle.add.button "Select Doctype"]
  :click (fn []
           (object/raise this :selecting!)))


(defui check-button []
       [:div.button "Update Asciidoctor"]
       :click (fn []
                (js/alert "bower npm?")))

(defui style-link [css]
  [:a.asciidoctor-css {:href css} css]
  :click (fn []
           (js/alert css)

           ))

(defui list-doctypes
  []
  [:select
   (for [dt   [[:book "document type allows multiple level-0 section titles in a single document"]
               [:article "default doctype is article"]
               [:inline "allows the content of a single paragraph to be formatted and returned without wrapping it in a containing element"]
               [:manpage "enables parsing of metadata necessary to produce a manpage"]]
         ]
     [:option {:value (first dt)} (second dt)]
     )])


;; (let [sa (bindings/subatom cmd/manager :commands)]
;;   (->> @sa keys sort (interpose \newline) println))



;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; objects
;;
(object/object* ::editor.asciidoctor.sample
                :tags [:editor.asciidoctor.sample]
                :name "Asciidoctor sample"
                :file ""
                :options ""
                :doctype ""
                :adoc-input ""
                :html-output ""
                :init (fn [this filename]
                         (let [main (pool/create {:mime (:mime (file-types))
                                                 :content (-> (safe-get-path filename)
                                                              (files/open-sync)
                                                              (:content))})]
                           (object/update! this [:name]
                                           (constantly (str filename " - Live Asciidoctor")))

;;                            (object/merge! ed {:asciidoctor main})
;;                            (object/assoc-in! ed [:asciidoctor] main)
;;                            (object/assoc-in! (:asciidoctor @ed) [:adoc-input] (editor/->val ed))
;;                            (object/assoc-in! (:asciidoctor @ed) [:file] filename)

                             ;;(-> Opal.Asciidoctor (.$convert (:content this) (get-opts))



                        )))


;; (def test123
;;   (object/create :editor.asciidoctor.sample "resources/example.asciidoc"))

;; @test123
;; (object/->def ::editor.asciidoctor.sample)



(object/object* ::ad.pane
                :tags [:ad.pane]
                :name "Asciidoctor about"
                :css "bar"
                :init (fn [this filename css]
                        (let [main (pool/create {:mime (:mime (file-types))
                                                 :content (-> (safe-get-path filename)
                                                              (files/open-sync)
                                                              (:content))})]
                          (object/merge! this {:ed main})
                          [:div#version-info
                           [:div.info
                            [:dl
                             [:dt "Plugin version"] [:dd (-> (plugins/find-plugin guessed-name)
                                                             bower-json
                                                             :version)]
                             [:dt "Asciidoctor version"] [:dd (adjs-version)]
                             [:dt "Stylesheet" [:dd (style-link css)]]
                             ]

                            (list-doctypes)
                            (check-button)


                            ]
                           (editor/->elem main)
                           ]
                          )))




;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; behaviors
;;

(behavior ::on-close-destroy
          :triggers #{:close}
          :desc (desc "close tab and tabset as well if last tab")
          :reaction (fn [this]
                      ;; two methods, both work
                      ;;(object/raise this :destroy)
                      (object/destroy! this)
                      ))


(behavior ::set-default-css
          :triggers #{:set-default-css!}
          :desc (desc "default stylesheet file for asciidoctor output")
          :reaction (fn [this file]
                      (object/assoc-in! (:asciidoctor @ed) [:css] file)
                      ))


(behavior ::read-editor
          :triggers [:change ::read-editor]
          :debounce 350
          :desc (desc "read the content inside an editor")
          :reaction (fn [ed]
                      (object/assoc-in! (:asciidoctor @ed) [:adoc-input] (editor/->val ed))
                      (try

                        (catch :default e
                          (println (.-message e))))))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; commands
;;


(cmd/command {:command :editor.asciidoctor.example
              :desc (desc "open example file")
              :exec (fn [_]
                      (let [ed (object/create ::ad.pane "resources/example.asciidoc" "foo")]
                        (object/add-tags ed [:editor.asciidoctor])
                        (tabs/add! ed)
                        (tabs/active! ed)
                        (editor/focus ed)
                        (editor/refresh ed)
                        (editor/close ed)

                        ))})


(cmd/command {:command :editor.asciidoctor.watch
              :desc (desc "watch this editor for changes")
              :exec (fn []
                      (when-not js/window.asciidoctor
                        loader
                      (let [ed (pool/last-active)
                            filename (get-in @ed [:info :name])
                            ad (object/create ::ad.pane filename "css")]
                        (ensure-and-focus-second-tabset)
                        (tabs/add-or-focus! ad)
                        (cmd/exec! :tabset.prev)
                        (object/assoc-in! ed [:asciidoctor] ad)
                        (object/add-behavior! ed ::read-editor)
                        (object/raise ed ::read-editor))))
              })

;; (behavior ::example
;;           :triggers #{:fresh-start}
;;           :reaction open-example)



;;
;; ui
;;

;; (defui ad-panel [this]
;;   [:div.asciidoctor (bindings/bound this :user-input)])

;; (object/object* ::asciidoctor.document
;;                 :behaviors [::on-close-destroy]
;;                 :name "asciidoctor"
;;                 :user-input ""
;;                 :init (fn [this filename]
;;                         (object/update! this [:name] (constantly (str filename " - Live Asciidoctor.cljs")))
;;                         (ad-panel this)))

;; (let [ed (pool/last-active)
;;       filename (get-in @ed [:info :name])
;;       ad (object/create ::asciidoctor.document filename)]
;;   (object/add-behavior! ed ::read-editor)
;;   (-> @ad :content .-innerHTML)
;;   (-> @ad :content .-innerHTML)
;;   )
