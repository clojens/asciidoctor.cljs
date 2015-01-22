(ns lt.plugins.asciidoctor.scaffold
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
            )
  (:require-macros [lt.macros :refer [defui behavior]]))


(def req-template
  '(:require [lt.object :as object]
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
             [lt.objs.plugins :as plugins]
             [lt.objs.editor.pool :as pool]
             [lt.objs.clients.local :as local]
             [lt.objs.sidebar.clients :as clients]
             [clojure.string :as string]
             [crate.binding :as bindings]
             [lt.plugins.asciidoctor.util :as ad-util]))

;; (println (interpose files/line-ending req-template))
