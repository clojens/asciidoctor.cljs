(ns lt.plugins.asciidoctor
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.dev :as dev]
            [lt.util.dom :as dom]
            [lt.util.load :as load]
            [lt.objs.tabs :as tabs]
            [lt.objs.find :as finds]
            [lt.objs.command :as cmd]
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
            [lt.plugins.asciidoctor.util :as ad-util]
            )
  (:require-macros [lt.macros :refer [defui behavior]]))




;; fs

(defn create-file
  [file]
  (let [abs (files/join (safe-get-path) (str file))]
    (if-let [real? (files/exists? abs)]
      :fuke
      (.. (js/require "fs")
          (createWriteStream file)))))

(def core-log (create-file "foo.txt"))

;; (map :exts (vals (:types @files/files-obj)))
;; (files/ext->type :ad)

(defn write-to-log [thing]
  (when core-log
    (.write core-log thing)))
