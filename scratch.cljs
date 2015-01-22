

(defn tell
  "Takes a function f (stub for now, will be output channel) and rest
  clauses parts as keywords to create more natural language data retrieval."
  [f & parts]
  (get-in {:who {:is {:ed? '(get-in-ed :info :name)}}
           :what {:is {:ed? (get-in-ed :info :type-name)}}
           :does {:this {:plugin {:have {:asciidocs?
                                         (files/filter-walk #(re-find ((ad/this-plugin :find) :pattern :file :extensions)
                                                                      (str %))
                                                            "/tmp")
                                         }}}}
           }

          (apply vector parts)))


(defn open-example []
  (when-let [ed (let [ed (pool/create {:mime (:mime (file-types))
                                       :tags [:editor.asciidoctor]
                                       :type-name guessed-name
                                       ;:name "Example.asciidoc"
                                       :content sample-file})]
                  (object/add-tags ed [:editor.transient])
                  (object/raise opener/opener :open ed)
                  (tabs/add! ed)
                  (tabs/active! ed)
                  ed)]
    (editor/set-val ed tutorial-text)
    (js/setTimeout #(editor/refresh ed) 500)
    ed))


(vals @object/instances)

;; js/window
;; (pool/last-active)
;; (pool/create (merge {:doc doc :line-ending (-> @doc :line-ending)} (path->info path)))


(def components
  {:app-keys (keys @app/app)
   :editor-gui (keys (js->clj editor/gui))
   :doc-manager-keys (-> @doc/manager keys)
   :file-name (defn get-filename [ed] (-> @ed :info :name))
   :tricks '["Open a new window"
             (lt.objs.app/open-window)

             (lt.objs.find/current-ed)]

   })


; @app/app

(object/->def :lt.objs.editor/editor)
(-> (finds/current-ed)
    :info)
;(object/instances-by-type :lt.objs.editor/editor)


(defn plugin-list
  []
  (->> (:server-plugins @plugins/manager)
       keys (map name) sort))


(def this-plugin
  {:name "Asciidoctor"
   :exts nil

   })




