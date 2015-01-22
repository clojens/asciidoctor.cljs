
(defui asciidoc-panel [this]
  [:div.asciidoc (bound this :user-input)])

(object/object* ::ad.document
                :behaviors [::on-close-destroy]
                :name "asciidoc"
                :user-input ""
                :init (fn [this filename]
                          (object/update! this [:name]
                                          (constantly (str filename " - Live Asciidoctor")))
                          (asciidoc-panel this)))

(defn get-options
  []
  (Opal.hash2 (clj->js ["doctype" "attributes"])
              (clj->js {:doctype "inline"
                        :attributes (JSON/stringify ["showtitle"])})))

(defn safe-get-path
  "Path composable from key named parts. Saves creating very lengthy
  strings and joins, validates and throws error if it doesn't exist."
  [& ks]
  (let [sep (if (platform/win?) "\\" "/")
        src (->> (map #(% {:root (str plugins/user-plugins-dir "/asciidoctor")
                           :dist "dist" :pkg "asciidoctor.js"
                           :server-dir "node_modules" :server-file "npm/asciidoctor-core.js"
                           ;; this works best now, the bower one given our context is browser dom?
                           :client-dir "bower_components" :client-file "asciidoctor-all.js"
                           :sample-file "resources/example.asciidoc"
                           }) ks)
                 (interpose sep)
                 string/join)]
    (if (files/exists? src) src
      (throw (js/Error (str "Path " src " does not exist!"))))))


(behavior ::on-close-destroy
          :triggers #{:close}
          :desc "Asciidoc: Close tab and tabset when last"
          :reaction (fn [this]
                      (object/raise this :destroy)))

(behavior ::read-editor
          :triggers [:change ::read-editor]
          :debounce 350
          :desc "Asciidoc: Read the content inside an editor"
          :reaction (fn [ed]
                      (object/assoc-in! (:asciidoc @ed) [:user-input] (editor/->val ed))
                        (try
                          (-> Opal.Asciidoctor (.$convert (get-in @ed [:asciidoc :user-input])
                                                          (get-options)))
                          (catch :default e
                            (println (.-message e))))))



(defn ensure-and-focus-second-tabset []
  (when (< (-> @tabs/multi :tabsets count) 2)
      (cmd/exec! :tabset.new))
  (cmd/exec! :tabset.next))

(cmd/command {:command :asciidoc.convert
              :desc "Asciidoc: Convert current clipboard string"
              :exec (fn []
                      (let [content (platform/paste)
                            options (Opal.hash2 (clj->js ["doctype" "attributes"])
                                                (clj->js {:doctype "inline"
                                                          :attributes (JSON/stringify ["showtitle"])}))]
                        (-> Opal.Asciidoctor (.$convert content options))))})

; Hello *world* _bye_ world
;; (cmd/exec! :asciidoc.convert "foo")

(cmd/command {:command :asciidoc.watch-editor
              :desc "Asciidoc: Watch this editor for changes"
              :exec (fn []
                      (when-not js/window.asciidoc
                        (load/js (safe-get-path :root :client-dir :pkg :dist :client-file) true)
                        (let [ed (pool/last-active)
                              filename (get-in @ed [:info :name])
                              ad (object/create ::ad.document filename)]
                          (ensure-and-focus-second-tabset)
                          (tabs/add-or-focus! ad)
                          (cmd/exec! :tabset.prev)
                          (object/assoc-in! ed [:asciidoc] ad)
                          (object/add-behavior! ed ::read-editor)
                          (object/raise ed ::read-editor))))})



(cmd/command {:command :asciidoc.open-sample
              :desc "Asciidoc: Open the canonical example file"
              :exec (fn []
                      (when-not js/window.asciidoc
                        (load/js (safe-get-path :root :client-dir :pkg :dist :client-file) true)
                        (let [ed (pool/last-active)
                              filename (safe-get-path :root :sample-file)
                              ad (object/create ::ad.document filename)]
                          (cmd/exec! :open-path filename))))})



