if(!lt.util.load.provided_QMARK_('lt.plugins.asciidoctor.util')) {
goog.provide('lt.plugins.asciidoctor.util');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.console');
goog.require('lt.objs.opener');
goog.require('lt.objs.document');
goog.require('lt.objs.find');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
goog.require('lt.objs.clients.local');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.dev');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.clients.local');
goog.require('lt.objs.tabs');
goog.require('lt.util.dom');
goog.require('lt.objs.files');
goog.require('crate.binding');
goog.require('lt.objs.dev');
goog.require('lt.objs.command');
goog.require('lt.objs.find');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.tabs');
goog.require('lt.objs.deploy');
goog.require('lt.objs.console');
goog.require('clojure.string');
goog.require('lt.objs.document');
goog.require('lt.objs.plugins');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.sidebar.clients');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('lt.objs.app');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.objs.opener');
goog.require('lt.object');
goog.require('crate.binding');
goog.require('lt.util.load');
cljs.core.enable_console_print_BANG_.call(null);
lt.plugins.asciidoctor.util.not_nil_QMARK_ = cljs.core.complement.call(null,cljs.core.nil_QMARK_);
/**
* Get current editor value.
*/
lt.plugins.asciidoctor.util.get_ed = (function get_ed(){return cljs.core.deref.call(null,lt.objs.editor.pool.last_active.call(null));
});
/**
* Get from current editor value keys.
* @param {...*} var_args
*/
lt.plugins.asciidoctor.util.get_in_ed = (function() { 
var get_in_ed__delegate = function (ks){return cljs.core.get_in.call(null,lt.plugins.asciidoctor.util.get_ed.call(null),cljs.core.apply.call(null,cljs.core.vector,ks));
};
var get_in_ed = function (var_args){
var ks = null;if (arguments.length > 0) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return get_in_ed__delegate.call(this,ks);};
get_in_ed.cljs$lang$maxFixedArity = 0;
get_in_ed.cljs$lang$applyTo = (function (arglist__15960){
var ks = cljs.core.seq(arglist__15960);
return get_in_ed__delegate(ks);
});
get_in_ed.cljs$core$IFn$_invoke$arity$variadic = get_in_ed__delegate;
return get_in_ed;
})()
;
/**
* 'Hackish' way of getting the current namespace unless
* macro's are used seems to be the only way.
*/
lt.plugins.asciidoctor.util.ns_STAR_ = cljs.core.namespace.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","x","lt.plugins.asciidoctor.util/x",4269474275));
/**
* Educated guess of this plugin name. Other ways not possible
* without constant string me thinks.
*/
lt.plugins.asciidoctor.util.guessed_name = clojure.string.capitalize.call(null,clojure.string.split.call(null,lt.plugins.asciidoctor.util.ns_STAR_,".").call(null,2));
/**
* Return all asciidoctor editors.
*/
lt.plugins.asciidoctor.util.get_all = (function get_all(){return lt.object.by_tag.call(null,new cljs.core.Keyword(null,"editor.asciidoctor","editor.asciidoctor",2363281441));
});
/**
* Returns this plugin found file and mime types associated if any.
*/
lt.plugins.asciidoctor.util.file_types = (function file_types(){return cljs.core.get.call(null,new cljs.core.Keyword(null,"types","types",1124748267).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.files.files_obj)),lt.plugins.asciidoctor.util.guessed_name);
});
/**
* Returns this plugin associated extensions if any.
*/
lt.plugins.asciidoctor.util.file_exts = (function file_exts(){return cljs.core.mapv.call(null,cljs.core.name,new cljs.core.Keyword(null,"exts","exts",1017032164).cljs$core$IFn$_invoke$arity$1(lt.plugins.asciidoctor.util.file_types.call(null)));
});
/**
* Predicate returns true if associated file types have been found, false if not.
*/
lt.plugins.asciidoctor.util.has_types_QMARK_ = (function has_types_QMARK_(){return lt.plugins.asciidoctor.util.not_nil_QMARK_.call(null,lt.plugins.asciidoctor.util.file_types.call(null));
});
/**
* Takes a sequence sq as first argument, opening/closing tokens ot/ct and separator.
* Returns encapsulated string representation e.g.
* (encapsulate ["foo" "bar"] "(" ")" "|") ;=> (foo|bar)
*/
lt.plugins.asciidoctor.util.encapsulate = (function encapsulate(sq,ot,ct,sep){return [cljs.core.str(ot),cljs.core.str(clojure.string.join.call(null,cljs.core.interpose.call(null,sep,sq))),cljs.core.str(ct)].join('');
});
/**
* Returns a regular expression pattern from file types associated, if any.
*/
lt.plugins.asciidoctor.util.patternize = (function patternize(){if(cljs.core.truth_(lt.plugins.asciidoctor.util.has_types_QMARK_.call(null)))
{return cljs.core.re_pattern.call(null,lt.plugins.asciidoctor.util.encapsulate.call(null,lt.plugins.asciidoctor.util.file_exts.call(null),".*(",")","|"));
} else
{return null;
}
});
/**
* Standard format of command description: 'Topic: First word is capitalized'
* @param {...*} var_args
*/
lt.plugins.asciidoctor.util.desc = (function() { 
var desc__delegate = function (txt,p__15896){var map__15898 = p__15896;var map__15898__$1 = ((cljs.core.seq_QMARK_.call(null,map__15898))?cljs.core.apply.call(null,cljs.core.hash_map,map__15898):map__15898);var topic = cljs.core.get.call(null,map__15898__$1,new cljs.core.Keyword(null,"topic","topic",1124450465),lt.plugins.asciidoctor.util.guessed_name);return [cljs.core.str(topic),cljs.core.str(": "),cljs.core.str(clojure.string.capitalize.call(null,txt))].join('');
};
var desc = function (txt,var_args){
var p__15896 = null;if (arguments.length > 1) {
  p__15896 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return desc__delegate.call(this,txt,p__15896);};
desc.cljs$lang$maxFixedArity = 1;
desc.cljs$lang$applyTo = (function (arglist__15961){
var txt = cljs.core.first(arglist__15961);
var p__15896 = cljs.core.rest(arglist__15961);
return desc__delegate(txt,p__15896);
});
desc.cljs$core$IFn$_invoke$arity$variadic = desc__delegate;
return desc;
})()
;
/**
* Make tabset and tab appear properly.
*/
lt.plugins.asciidoctor.util.ensure_and_focus_second_tabset = (function ensure_and_focus_second_tabset(){if((cljs.core.count.call(null,new cljs.core.Keyword(null,"tabsets","tabsets",3756175576).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.tabs.multi))) < 2))
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabset.new","tabset.new",1444331601));
} else
{}
return lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabset.next","tabset.next",1472250630));
});
/**
* Return a valid path of this plugin or throw an error if not found.
* @param {...*} var_args
*/
lt.plugins.asciidoctor.util.safe_get_path = (function() { 
var safe_get_path__delegate = function (parts){var path = lt.objs.files.join.call(null,lt.objs.plugins.find_plugin.call(null,lt.plugins.asciidoctor.util.guessed_name),clojure.string.join.call(null,parts));var temp__4124__auto__ = lt.objs.files.exists_QMARK_.call(null,path);if(cljs.core.truth_(temp__4124__auto__))
{var plugin_QMARK_ = temp__4124__auto__;return path;
} else
{throw (new Error([cljs.core.str("Path "),cljs.core.str(path),cljs.core.str(" could not be found.")].join('')));
}
};
var safe_get_path = function (var_args){
var parts = null;if (arguments.length > 0) {
  parts = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return safe_get_path__delegate.call(this,parts);};
safe_get_path.cljs$lang$maxFixedArity = 0;
safe_get_path.cljs$lang$applyTo = (function (arglist__15962){
var parts = cljs.core.seq(arglist__15962);
return safe_get_path__delegate(parts);
});
safe_get_path.cljs$core$IFn$_invoke$arity$variadic = safe_get_path__delegate;
return safe_get_path;
})()
;
/**
* Loads the asciidoctor.js file from bower_components.
*/
lt.plugins.asciidoctor.util.loader = (function (){lt.util.load.js.call(null,lt.plugins.asciidoctor.util.safe_get_path.call(null,"bower_components/asciidoctor.js/dist/asciidoctor-all.js"),true);
return new cljs.core.Keyword(null,"done","done",1016993524);
})();
/**
* Returns content of the sample asciidoc file.
*/
lt.plugins.asciidoctor.util.sample_content = new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.plugins.asciidoctor.util.safe_get_path.call(null,"resources/example.asciidoc")));
/**
* Takes a directory and reads the bower.json file if found inside.
*/
lt.plugins.asciidoctor.util.bower_json = (function bower_json(dir){var temp__4126__auto__ = lt.objs.files.open_sync.call(null,lt.objs.files.join.call(null,dir,"bower.json"));if(cljs.core.truth_(temp__4126__auto__))
{var content = temp__4126__auto__;return cljs.core.assoc.call(null,cljs.core.js__GT_clj.call(null,JSON.parse(new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(content)),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true),new cljs.core.Keyword(null,"dir","dir",1014003711),dir);
} else
{return null;
}
});
/**
* Returns the version of the bower asciidoctor.js dependency.
*/
lt.plugins.asciidoctor.util.adjs_version = (function adjs_version(){return new cljs.core.Keyword(null,"asciidoctor.js","asciidoctor.js",1788710841).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"dependencies","dependencies",1517678747).cljs$core$IFn$_invoke$arity$1(lt.plugins.asciidoctor.util.bower_json.call(null,lt.objs.plugins.find_plugin.call(null,lt.plugins.asciidoctor.util.guessed_name))));
});
lt.plugins.asciidoctor.util.util_inspect = require("util").inspect;
lt.plugins.asciidoctor.util.inspect = (function inspect(thing,depth){return lt.plugins.asciidoctor.util.util_inspect.call(null,thing,false,(function (){var or__6703__auto__ = depth;if(cljs.core.truth_(or__6703__auto__))
{return or__6703__auto__;
} else
{return 5;
}
})());
});
lt.plugins.asciidoctor.util.doctypes = (function doctypes(){return cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"manpage",new cljs.core.Keyword(null,"desc","desc",1016984067),"enables parsing of metadata necessary to produce a manpage"], null)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"inline",new cljs.core.Keyword(null,"desc","desc",1016984067),"allows the content of a single paragraph to be formatted and returned without wrapping it in a containing element"], null)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"article",new cljs.core.Keyword(null,"desc","desc",1016984067),"default doctype is article"], null)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),"book",new cljs.core.Keyword(null,"desc","desc",1016984067),"document type allows multiple level-0 section titles in a single document"], null));
});
lt.plugins.asciidoctor.util.__GT_width = (function __GT_width(width){return [cljs.core.str((function (){var or__6703__auto__ = width;if(cljs.core.truth_(or__6703__auto__))
{return or__6703__auto__;
} else
{return 0;
}
})()),cljs.core.str("px")].join('');
});
lt.plugins.asciidoctor.util.doctype_selector = lt.objs.sidebar.command.filter_list.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1114430258),(function (){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.asciidoctor.util.doctypes.call(null));
}),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"Doctype"], null));
lt.plugins.asciidoctor.util.__BEH__set_doctype = (function __BEH__set_doctype(this$,v){return lt.objs.command.exec_active_BANG_.call(null,v);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","set-doctype","lt.plugins.asciidoctor.util/set-doctype",3763034194),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.asciidoctor.util.__BEH__set_doctype);
lt.plugins.asciidoctor.util.__BEH__init_doctype_selector = (function __BEH__init_doctype_selector(app){return lt.object.raise.call(null,lt.plugins.asciidoctor.util.doctype_selector,new cljs.core.Keyword(null,"refresh!","refresh!",4597922840));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","init-doctype-selector","lt.plugins.asciidoctor.util/init-doctype-selector",3680863330),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",1017141378),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.asciidoctor.util.__BEH__init_doctype_selector);
lt.object.add_behavior_BANG_.call(null,lt.plugins.asciidoctor.util.doctype_selector,new cljs.core.Keyword("lt.plugins.asciidoctor.util","set-doctype","lt.plugins.asciidoctor.util/set-doctype",3763034194));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"set-doctype","set-doctype",1589561721),new cljs.core.Keyword(null,"desc","desc",1016984067),lt.plugins.asciidoctor.util.desc.call(null,"set current asciidoctor document doctype"),new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.asciidoctor.util.doctype_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (dt){var temp__4124__auto__ = lt.plugins.asciidoctor.util.last_active.call(null);if(cljs.core.truth_(temp__4124__auto__))
{var last = temp__4124__auto__;return lt.plugins.asciidoctor.util.set_doctype.call(null,last,dt);
} else
{return notifos.set_msg_BANG_.call(null,"Set doctype requires an active asciidoctor editor");
}
})], null));
/**
* @param {...*} var_args
*/
lt.plugins.asciidoctor.util.get_opts = (function() { 
var get_opts__delegate = function (p__15899){var map__15901 = p__15899;var map__15901__$1 = ((cljs.core.seq_QMARK_.call(null,map__15901))?cljs.core.apply.call(null,cljs.core.hash_map,map__15901):map__15901);var doctype = cljs.core.get.call(null,map__15901__$1,new cljs.core.Keyword(null,"doctype","doctype",2842799076),"book");var attrs = cljs.core.get.call(null,map__15901__$1,new cljs.core.Keyword(null,"attrs","attrs",1107056660),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["showtitle"], null));if(cljs.core.truth_(window.asciidoctor))
{return null;
} else
{var m = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doctype","doctype",2842799076),doctype,new cljs.core.Keyword(null,"attributes","attributes",1419549897),JSON.stringify.call(null,attrs)], null);var ks = cljs.core.map.call(null,cljs.core.name,cljs.core.keys.call(null,m));return Opal.hash2.call(null,cljs.core.clj__GT_js.call(null,ks),cljs.core.clj__GT_js.call(null,m));
}
};
var get_opts = function (var_args){
var p__15899 = null;if (arguments.length > 0) {
  p__15899 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return get_opts__delegate.call(this,p__15899);};
get_opts.cljs$lang$maxFixedArity = 0;
get_opts.cljs$lang$applyTo = (function (arglist__15963){
var p__15899 = cljs.core.seq(arglist__15963);
return get_opts__delegate(p__15899);
});
get_opts.cljs$core$IFn$_invoke$arity$variadic = get_opts__delegate;
return get_opts;
})()
;
lt.plugins.asciidoctor.util.add_button = (function add_button(this$){var e__8100__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.toggle.add.button","h2.toggle.add.button",3718387527),"Select Doctype"], null));var seq__15908_15964 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1108654330),((function (e__8100__auto__){
return (function (){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"selecting!","selecting!",3653545709));
});})(e__8100__auto__))
], null)));var chunk__15909_15965 = null;var count__15910_15966 = 0;var i__15911_15967 = 0;while(true){
if((i__15911_15967 < count__15910_15966))
{var vec__15912_15968 = cljs.core._nth.call(null,chunk__15909_15965,i__15911_15967);var ev__8101__auto___15969 = cljs.core.nth.call(null,vec__15912_15968,0,null);var func__8102__auto___15970 = cljs.core.nth.call(null,vec__15912_15968,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___15969,func__8102__auto___15970);
{
var G__15971 = seq__15908_15964;
var G__15972 = chunk__15909_15965;
var G__15973 = count__15910_15966;
var G__15974 = (i__15911_15967 + 1);
seq__15908_15964 = G__15971;
chunk__15909_15965 = G__15972;
count__15910_15966 = G__15973;
i__15911_15967 = G__15974;
continue;
}
} else
{var temp__4126__auto___15975 = cljs.core.seq.call(null,seq__15908_15964);if(temp__4126__auto___15975)
{var seq__15908_15976__$1 = temp__4126__auto___15975;if(cljs.core.chunked_seq_QMARK_.call(null,seq__15908_15976__$1))
{var c__7451__auto___15977 = cljs.core.chunk_first.call(null,seq__15908_15976__$1);{
var G__15978 = cljs.core.chunk_rest.call(null,seq__15908_15976__$1);
var G__15979 = c__7451__auto___15977;
var G__15980 = cljs.core.count.call(null,c__7451__auto___15977);
var G__15981 = 0;
seq__15908_15964 = G__15978;
chunk__15909_15965 = G__15979;
count__15910_15966 = G__15980;
i__15911_15967 = G__15981;
continue;
}
} else
{var vec__15913_15982 = cljs.core.first.call(null,seq__15908_15976__$1);var ev__8101__auto___15983 = cljs.core.nth.call(null,vec__15913_15982,0,null);var func__8102__auto___15984 = cljs.core.nth.call(null,vec__15913_15982,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___15983,func__8102__auto___15984);
{
var G__15985 = cljs.core.next.call(null,seq__15908_15976__$1);
var G__15986 = null;
var G__15987 = 0;
var G__15988 = 0;
seq__15908_15964 = G__15985;
chunk__15909_15965 = G__15986;
count__15910_15966 = G__15987;
i__15911_15967 = G__15988;
continue;
}
}
} else
{}
}
break;
}
return e__8100__auto__;
});
lt.plugins.asciidoctor.util.check_button = (function check_button(){var e__8100__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.button","div.button",2319197857),"Update Asciidoctor"], null));var seq__15920_15989 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1108654330),((function (e__8100__auto__){
return (function (){return alert("bower npm?");
});})(e__8100__auto__))
], null)));var chunk__15921_15990 = null;var count__15922_15991 = 0;var i__15923_15992 = 0;while(true){
if((i__15923_15992 < count__15922_15991))
{var vec__15924_15993 = cljs.core._nth.call(null,chunk__15921_15990,i__15923_15992);var ev__8101__auto___15994 = cljs.core.nth.call(null,vec__15924_15993,0,null);var func__8102__auto___15995 = cljs.core.nth.call(null,vec__15924_15993,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___15994,func__8102__auto___15995);
{
var G__15996 = seq__15920_15989;
var G__15997 = chunk__15921_15990;
var G__15998 = count__15922_15991;
var G__15999 = (i__15923_15992 + 1);
seq__15920_15989 = G__15996;
chunk__15921_15990 = G__15997;
count__15922_15991 = G__15998;
i__15923_15992 = G__15999;
continue;
}
} else
{var temp__4126__auto___16000 = cljs.core.seq.call(null,seq__15920_15989);if(temp__4126__auto___16000)
{var seq__15920_16001__$1 = temp__4126__auto___16000;if(cljs.core.chunked_seq_QMARK_.call(null,seq__15920_16001__$1))
{var c__7451__auto___16002 = cljs.core.chunk_first.call(null,seq__15920_16001__$1);{
var G__16003 = cljs.core.chunk_rest.call(null,seq__15920_16001__$1);
var G__16004 = c__7451__auto___16002;
var G__16005 = cljs.core.count.call(null,c__7451__auto___16002);
var G__16006 = 0;
seq__15920_15989 = G__16003;
chunk__15921_15990 = G__16004;
count__15922_15991 = G__16005;
i__15923_15992 = G__16006;
continue;
}
} else
{var vec__15925_16007 = cljs.core.first.call(null,seq__15920_16001__$1);var ev__8101__auto___16008 = cljs.core.nth.call(null,vec__15925_16007,0,null);var func__8102__auto___16009 = cljs.core.nth.call(null,vec__15925_16007,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___16008,func__8102__auto___16009);
{
var G__16010 = cljs.core.next.call(null,seq__15920_16001__$1);
var G__16011 = null;
var G__16012 = 0;
var G__16013 = 0;
seq__15920_15989 = G__16010;
chunk__15921_15990 = G__16011;
count__15922_15991 = G__16012;
i__15923_15992 = G__16013;
continue;
}
}
} else
{}
}
break;
}
return e__8100__auto__;
});
lt.plugins.asciidoctor.util.style_link = (function style_link(css){var e__8100__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.asciidoctor-css","a.asciidoctor-css",3970321995),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",1017115293),css], null),css], null));var seq__15932_16014 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1108654330),((function (e__8100__auto__){
return (function (){return alert(css);
});})(e__8100__auto__))
], null)));var chunk__15933_16015 = null;var count__15934_16016 = 0;var i__15935_16017 = 0;while(true){
if((i__15935_16017 < count__15934_16016))
{var vec__15936_16018 = cljs.core._nth.call(null,chunk__15933_16015,i__15935_16017);var ev__8101__auto___16019 = cljs.core.nth.call(null,vec__15936_16018,0,null);var func__8102__auto___16020 = cljs.core.nth.call(null,vec__15936_16018,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___16019,func__8102__auto___16020);
{
var G__16021 = seq__15932_16014;
var G__16022 = chunk__15933_16015;
var G__16023 = count__15934_16016;
var G__16024 = (i__15935_16017 + 1);
seq__15932_16014 = G__16021;
chunk__15933_16015 = G__16022;
count__15934_16016 = G__16023;
i__15935_16017 = G__16024;
continue;
}
} else
{var temp__4126__auto___16025 = cljs.core.seq.call(null,seq__15932_16014);if(temp__4126__auto___16025)
{var seq__15932_16026__$1 = temp__4126__auto___16025;if(cljs.core.chunked_seq_QMARK_.call(null,seq__15932_16026__$1))
{var c__7451__auto___16027 = cljs.core.chunk_first.call(null,seq__15932_16026__$1);{
var G__16028 = cljs.core.chunk_rest.call(null,seq__15932_16026__$1);
var G__16029 = c__7451__auto___16027;
var G__16030 = cljs.core.count.call(null,c__7451__auto___16027);
var G__16031 = 0;
seq__15932_16014 = G__16028;
chunk__15933_16015 = G__16029;
count__15934_16016 = G__16030;
i__15935_16017 = G__16031;
continue;
}
} else
{var vec__15937_16032 = cljs.core.first.call(null,seq__15932_16026__$1);var ev__8101__auto___16033 = cljs.core.nth.call(null,vec__15937_16032,0,null);var func__8102__auto___16034 = cljs.core.nth.call(null,vec__15937_16032,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___16033,func__8102__auto___16034);
{
var G__16035 = cljs.core.next.call(null,seq__15932_16026__$1);
var G__16036 = null;
var G__16037 = 0;
var G__16038 = 0;
seq__15932_16014 = G__16035;
chunk__15933_16015 = G__16036;
count__15934_16016 = G__16037;
i__15935_16017 = G__16038;
continue;
}
}
} else
{}
}
break;
}
return e__8100__auto__;
});
lt.plugins.asciidoctor.util.list_doctypes = (function list_doctypes(){var e__8100__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",4402849902),(function (){var iter__7420__auto__ = (function iter__15948(s__15949){return (new cljs.core.LazySeq(null,(function (){var s__15949__$1 = s__15949;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__15949__$1);if(temp__4126__auto__)
{var s__15949__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__15949__$2))
{var c__7418__auto__ = cljs.core.chunk_first.call(null,s__15949__$2);var size__7419__auto__ = cljs.core.count.call(null,c__7418__auto__);var b__15951 = cljs.core.chunk_buffer.call(null,size__7419__auto__);if((function (){var i__15950 = 0;while(true){
if((i__15950 < size__7419__auto__))
{var dt = cljs.core._nth.call(null,c__7418__auto__,i__15950);cljs.core.chunk_append.call(null,b__15951,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.first.call(null,dt)], null),cljs.core.second.call(null,dt)], null));
{
var G__16039 = (i__15950 + 1);
i__15950 = G__16039;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15951),iter__15948.call(null,cljs.core.chunk_rest.call(null,s__15949__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15951),null);
}
} else
{var dt = cljs.core.first.call(null,s__15949__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",4298734567),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.first.call(null,dt)], null),cljs.core.second.call(null,dt)], null),iter__15948.call(null,cljs.core.rest.call(null,s__15949__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7420__auto__.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"book","book",1016933979),"document type allows multiple level-0 section titles in a single document"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"article","article",4576493672),"default doctype is article"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inline","inline",4124874251),"allows the content of a single paragraph to be formatted and returned without wrapping it in a containing element"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"manpage","manpage",1849605723),"enables parsing of metadata necessary to produce a manpage"], null)], null));
})()], null));var seq__15952_16040 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,cljs.core.PersistentVector.EMPTY));var chunk__15953_16041 = null;var count__15954_16042 = 0;var i__15955_16043 = 0;while(true){
if((i__15955_16043 < count__15954_16042))
{var vec__15956_16044 = cljs.core._nth.call(null,chunk__15953_16041,i__15955_16043);var ev__8101__auto___16045 = cljs.core.nth.call(null,vec__15956_16044,0,null);var func__8102__auto___16046 = cljs.core.nth.call(null,vec__15956_16044,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___16045,func__8102__auto___16046);
{
var G__16047 = seq__15952_16040;
var G__16048 = chunk__15953_16041;
var G__16049 = count__15954_16042;
var G__16050 = (i__15955_16043 + 1);
seq__15952_16040 = G__16047;
chunk__15953_16041 = G__16048;
count__15954_16042 = G__16049;
i__15955_16043 = G__16050;
continue;
}
} else
{var temp__4126__auto___16051 = cljs.core.seq.call(null,seq__15952_16040);if(temp__4126__auto___16051)
{var seq__15952_16052__$1 = temp__4126__auto___16051;if(cljs.core.chunked_seq_QMARK_.call(null,seq__15952_16052__$1))
{var c__7451__auto___16053 = cljs.core.chunk_first.call(null,seq__15952_16052__$1);{
var G__16054 = cljs.core.chunk_rest.call(null,seq__15952_16052__$1);
var G__16055 = c__7451__auto___16053;
var G__16056 = cljs.core.count.call(null,c__7451__auto___16053);
var G__16057 = 0;
seq__15952_16040 = G__16054;
chunk__15953_16041 = G__16055;
count__15954_16042 = G__16056;
i__15955_16043 = G__16057;
continue;
}
} else
{var vec__15957_16058 = cljs.core.first.call(null,seq__15952_16052__$1);var ev__8101__auto___16059 = cljs.core.nth.call(null,vec__15957_16058,0,null);var func__8102__auto___16060 = cljs.core.nth.call(null,vec__15957_16058,1,null);lt.util.dom.on.call(null,e__8100__auto__,ev__8101__auto___16059,func__8102__auto___16060);
{
var G__16061 = cljs.core.next.call(null,seq__15952_16052__$1);
var G__16062 = null;
var G__16063 = 0;
var G__16064 = 0;
seq__15952_16040 = G__16061;
chunk__15953_16041 = G__16062;
count__15954_16042 = G__16063;
i__15955_16043 = G__16064;
continue;
}
}
} else
{}
}
break;
}
return e__8100__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","editor.asciidoctor.sample","lt.plugins.asciidoctor.util/editor.asciidoctor.sample",1813028628),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.asciidoctor.sample","editor.asciidoctor.sample",3624230715)], null),new cljs.core.Keyword(null,"name","name",1017277949),"Asciidoctor sample",new cljs.core.Keyword(null,"file","file",1017047278),"",new cljs.core.Keyword(null,"options","options",4059396624),"",new cljs.core.Keyword(null,"doctype","doctype",2842799076),"",new cljs.core.Keyword(null,"adoc-input","adoc-input",2305750822),"",new cljs.core.Keyword(null,"html-output","html-output",1867155669),"",new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,filename){var main = lt.objs.editor.pool.create.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mime","mime",1017255846),new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(lt.plugins.asciidoctor.util.file_types.call(null)),new cljs.core.Keyword(null,"content","content",1965434859),new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.plugins.asciidoctor.util.safe_get_path.call(null,filename)))], null));return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1017277949)], null),cljs.core.constantly.call(null,[cljs.core.str(filename),cljs.core.str(" - Live Asciidoctor")].join('')));
}));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","ad.pane","lt.plugins.asciidoctor.util/ad.pane",1192845446),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ad.pane","ad.pane",4111245765)], null),new cljs.core.Keyword(null,"name","name",1017277949),"Asciidoctor about",new cljs.core.Keyword(null,"css","css",1014003061),"bar",new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,filename,css){var main = lt.objs.editor.pool.create.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mime","mime",1017255846),new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(lt.plugins.asciidoctor.util.file_types.call(null)),new cljs.core.Keyword(null,"content","content",1965434859),new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,lt.plugins.asciidoctor.util.safe_get_path.call(null,filename)))], null));lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ed","ed",1013907473),main], null));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#version-info","div#version-info",3819681447),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.info","div.info",1323843421),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dl","dl",1013907450),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",1013907458),"Plugin version"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",1013907442),new cljs.core.Keyword(null,"version","version",1365512266).cljs$core$IFn$_invoke$arity$1(lt.plugins.asciidoctor.util.bower_json.call(null,lt.objs.plugins.find_plugin.call(null,lt.plugins.asciidoctor.util.guessed_name)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",1013907458),"Asciidoctor version"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",1013907442),lt.plugins.asciidoctor.util.adjs_version.call(null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dt","dt",1013907458),"Stylesheet",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dd","dd",1013907442),lt.plugins.asciidoctor.util.style_link.call(null,css)], null)], null)], null),lt.plugins.asciidoctor.util.list_doctypes.call(null),lt.plugins.asciidoctor.util.check_button.call(null)], null),lt.objs.editor.__GT_elem.call(null,main)], null);
}));
lt.plugins.asciidoctor.util.__BEH__on_close_destroy = (function __BEH__on_close_destroy(this$){return lt.object.destroy_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","on-close-destroy","lt.plugins.asciidoctor.util/on-close-destroy",4348115234),new cljs.core.Keyword(null,"desc","desc",1016984067),lt.plugins.asciidoctor.util.desc.call(null,"close tab and tabset as well if last tab"),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1108660586),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.asciidoctor.util.__BEH__on_close_destroy);
lt.plugins.asciidoctor.util.__BEH__set_default_css = (function __BEH__set_default_css(this$,file){return lt.object.assoc_in_BANG_.call(null,new cljs.core.Keyword(null,"asciidoctor","asciidoctor",3108287266).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.asciidoctor.util.ed)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"css","css",1014003061)], null),file);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","set-default-css","lt.plugins.asciidoctor.util/set-default-css",1577456319),new cljs.core.Keyword(null,"desc","desc",1016984067),lt.plugins.asciidoctor.util.desc.call(null,"default stylesheet file for asciidoctor output"),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"set-default-css!","set-default-css!",545510791),null], null), null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.asciidoctor.util.__BEH__set_default_css);
lt.plugins.asciidoctor.util.__BEH__read_editor = (function __BEH__read_editor(ed){lt.object.assoc_in_BANG_.call(null,new cljs.core.Keyword(null,"asciidoctor","asciidoctor",3108287266).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"adoc-input","adoc-input",2305750822)], null),lt.objs.editor.__GT_val.call(null,ed));
try{return null;
}catch (e15959){var e = e15959;return cljs.core.println.call(null,e.message);
}});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","read-editor","lt.plugins.asciidoctor.util/read-editor",2947666135),new cljs.core.Keyword(null,"desc","desc",1016984067),lt.plugins.asciidoctor.util.desc.call(null,"read the content inside an editor"),new cljs.core.Keyword(null,"debounce","debounce",1556599227),350,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"change","change",3947235106),new cljs.core.Keyword("lt.plugins.asciidoctor.util","read-editor","lt.plugins.asciidoctor.util/read-editor",2947666135)], null),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.asciidoctor.util.__BEH__read_editor);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.asciidoctor.example","editor.asciidoctor.example",1436799645),new cljs.core.Keyword(null,"desc","desc",1016984067),lt.plugins.asciidoctor.util.desc.call(null,"open example file"),new cljs.core.Keyword(null,"exec","exec",1017031683),(function (_){var ed = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","ad.pane","lt.plugins.asciidoctor.util/ad.pane",1192845446),"resources/example.asciidoc","foo");lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.asciidoctor","editor.asciidoctor",2363281441)], null));
lt.objs.tabs.add_BANG_.call(null,ed);
lt.objs.tabs.active_BANG_.call(null,ed);
lt.objs.editor.focus.call(null,ed);
lt.objs.editor.refresh.call(null,ed);
return lt.objs.editor.close.call(null,ed);
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.asciidoctor.watch","editor.asciidoctor.watch",547619394),new cljs.core.Keyword(null,"desc","desc",1016984067),lt.plugins.asciidoctor.util.desc.call(null,"watch this editor for changes"),new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){if(cljs.core.truth_(window.asciidoctor))
{return null;
} else
{var ed = lt.objs.editor.pool.last_active.call(null);var filename = cljs.core.get_in.call(null,cljs.core.deref.call(null,ed),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.Keyword(null,"name","name",1017277949)], null));var ad = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.asciidoctor.util","ad.pane","lt.plugins.asciidoctor.util/ad.pane",1192845446),filename,"css");lt.plugins.asciidoctor.util.ensure_and_focus_second_tabset.call(null);
lt.objs.tabs.add_or_focus_BANG_.call(null,ad);
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"tabset.prev","tabset.prev",1472322118));
lt.object.assoc_in_BANG_.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"asciidoctor","asciidoctor",3108287266)], null),ad);
lt.object.add_behavior_BANG_.call(null,ed,new cljs.core.Keyword("lt.plugins.asciidoctor.util","read-editor","lt.plugins.asciidoctor.util/read-editor",2947666135));
return lt.object.raise.call(null,ed,new cljs.core.Keyword("lt.plugins.asciidoctor.util","read-editor","lt.plugins.asciidoctor.util/read-editor",2947666135));
}
})], null));
}
if(!lt.util.load.provided_QMARK_('lt.plugins.asciidoctor')) {
goog.provide('lt.plugins.asciidoctor');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.console');
goog.require('lt.objs.opener');
goog.require('lt.objs.document');
goog.require('lt.objs.find');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
goog.require('lt.objs.clients.local');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.dev');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.clients.local');
goog.require('lt.objs.tabs');
goog.require('lt.util.dom');
goog.require('lt.objs.files');
goog.require('crate.binding');
goog.require('lt.objs.dev');
goog.require('lt.objs.command');
goog.require('lt.plugins.asciidoctor.util');
goog.require('lt.objs.find');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.tabs');
goog.require('lt.objs.deploy');
goog.require('lt.objs.console');
goog.require('lt.plugins.asciidoctor.util');
goog.require('clojure.string');
goog.require('lt.objs.document');
goog.require('lt.objs.plugins');
goog.require('lt.objs.sidebar.clients');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('lt.objs.app');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.objs.opener');
goog.require('lt.object');
goog.require('crate.binding');
goog.require('lt.util.load');
lt.plugins.asciidoctor.create_file = (function create_file(file){var abs = lt.objs.files.join.call(null,lt.plugins.asciidoctor.safe_get_path.call(null),[cljs.core.str(file)].join(''));var temp__4124__auto__ = lt.objs.files.exists_QMARK_.call(null,abs);if(cljs.core.truth_(temp__4124__auto__))
{var real_QMARK_ = temp__4124__auto__;return new cljs.core.Keyword(null,"fuke","fuke",1017058779);
} else
{return require("fs").createWriteStream(file);
}
});
lt.plugins.asciidoctor.core_log = lt.plugins.asciidoctor.create_file.call(null,"foo.txt");
lt.plugins.asciidoctor.write_to_log = (function write_to_log(thing){if(cljs.core.truth_(lt.plugins.asciidoctor.core_log))
{return lt.plugins.asciidoctor.core_log.write(thing);
} else
{return null;
}
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.asciidoctor.options')) {
goog.provide('lt.plugins.asciidoctor.options');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.find');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.files');
goog.require('lt.objs.command');
goog.require('lt.plugins.asciidoctor.util');
goog.require('lt.objs.find');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.sidebar.command');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.plugins.asciidoctor.util');
goog.require('lt.object');
lt.plugins.asciidoctor.options.upper_kw = cljs.core.comp.call(null,cljs.core.keyword,clojure.string.upper_case,cljs.core.name);
lt.plugins.asciidoctor.options.capital_kw = cljs.core.comp.call(null,cljs.core.keyword,clojure.string.capitalize,cljs.core.name);
lt.plugins.asciidoctor.options.lower_kw = cljs.core.comp.call(null,cljs.core.keyword,clojure.string.lower_case,cljs.core.name);
/**
* Takes a sequence of keywords and will return a list of variations on those keywords
* in the forms: upper-case, capitalized and lower-case keywords e.g.
* (variant-ks [:foo :bar :baz]) ;=> (:FOO :Foo :foo :BAR :Bar :bar :BAZ :Baz :baz)
*/
lt.plugins.asciidoctor.options.variant_ks = (function variant_ks(s){return cljs.core.flatten.call(null,cljs.core.map.call(null,cljs.core.juxt.call(null,lt.plugins.asciidoctor.options.upper_kw,lt.plugins.asciidoctor.options.capital_kw,lt.plugins.asciidoctor.options.lower_kw),s));
});
/**
* Handles some common dichotomies and their variations. Allows for both keywords and
* strings as input, as well as 0 or 1. Either capitalized, upper- and lower-case forms
* are accepted and return values are true for truthy values, false for falsey else nil.
*/
lt.plugins.asciidoctor.options.dichotomies = (function dichotomies(in$){var polars = new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"on","on",1013907793),new cljs.core.Keyword(null,"off","off",1014014177),new cljs.core.Keyword(null,"yes","yes",1014023769),new cljs.core.Keyword(null,"no","no",1013907763),new cljs.core.Keyword(null,"true","true",1017473280),new cljs.core.Keyword(null,"false","false",1111100565),new cljs.core.Keyword(null,"enabled","enabled",3699277491),new cljs.core.Keyword(null,"disabled","disabled",1284845038),new cljs.core.Keyword(null,"t","t",1013904358),new cljs.core.Keyword(null,"f","f",1013904344),new cljs.core.Keyword(null,"1","1",1013904291),new cljs.core.Keyword(null,"0","0",1013904290),new cljs.core.Keyword(null,"+","+",1013904285),new cljs.core.Keyword(null,"-","-",1013904287),new cljs.core.Keyword(null,"y","y",1013904363),new cljs.core.Keyword(null,"n","n",1013904352)], null);var vec__15890 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.asciidoctor.options.variant_ks.call(null,cljs.core.keys.call(null,polars)),lt.plugins.asciidoctor.options.variant_ks.call(null,cljs.core.vals.call(null,polars))], null);var truthy = cljs.core.nth.call(null,vec__15890,0,null);var falsey = cljs.core.nth.call(null,vec__15890,1,null);var value = ((typeof in$ === 'string')?cljs.core.keyword.call(null,in$):(((in$ instanceof cljs.core.Keyword))?in$:(((in$ === 0))?new cljs.core.Keyword(null,"0","0",1013904290):((cljs.core._EQ_.call(null,1,in$))?new cljs.core.Keyword(null,"1","1",1013904291):(function(){throw (new Error("Incorrect data type. Need either string or keyword."))})()))));if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([value], true),truthy)))
{return true;
} else
{if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([value], true),falsey)))
{return false;
} else
{return null;
}
}
});
/**
* Predicate to return true if a form of nothingness has been provided.
*/
lt.plugins.asciidoctor.options.nothing_QMARK_ = (function nothing_QMARK_(v){if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([v], true),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, ["",null,new cljs.core.Keyword(null,"nothing","nothing",3143228223),null,new cljs.core.Keyword(null,"empty","empty",1110538431),null,new cljs.core.Keyword(null,"void","void",1017529606),null,new cljs.core.Keyword(null,"null","null",1017297145),null,new cljs.core.Keyword(null,"nil","nil",1014013315),null,new cljs.core.Keyword(null,"sink","sink",1017434629),null], null), null))))
{return true;
} else
{return false;
}
});
/**
* Predicate which returns true in case provided argument
* equals a 'truth' value e.g. true, on, enabled, yes, +, 1, etc.
*/
lt.plugins.asciidoctor.options.enabled_QMARK_ = (function enabled_QMARK_(p1__15891_SHARP_){return lt.plugins.asciidoctor.options.dichotomies.call(null,p1__15891_SHARP_);
});
/**
* Predicate which returns true in case provided argument
* equals a 'false' value e.g. false, off, disabled, no, -, 0, etc.
*/
lt.plugins.asciidoctor.options.disabled_QMARK_ = cljs.core.complement.call(null,lt.plugins.asciidoctor.options.enabled_QMARK_);
/**
* Predicate which returns true if the argument is not nothing? Nothing here
* equals a subset of tokens defined in the nothing? predicate e.g. :empty, :void
*/
lt.plugins.asciidoctor.options.something_QMARK_ = cljs.core.complement.call(null,lt.plugins.asciidoctor.options.nothing_QMARK_);
/**
* Complements the built-in nil? predicate.
*/
lt.plugins.asciidoctor.options.not_nil_QMARK_ = cljs.core.complement.call(null,cljs.core.nil_QMARK_);
/**
* Complements the built-in empty? predicate.
*/
lt.plugins.asciidoctor.options.not_empty_QMARK_ = cljs.core.complement.call(null,cljs.core.empty_QMARK_);
/**
* Toggles between any true/false dichotomies as :enabled and :disabled states.
*/
lt.plugins.asciidoctor.options.toggle_switch = (function toggle_switch(k){if(cljs.core._EQ_.call(null,lt.plugins.asciidoctor.options.dichotomies.call(null,k),true))
{return new cljs.core.Keyword(null,"disabled","disabled",1284845038);
} else
{if(cljs.core._EQ_.call(null,lt.plugins.asciidoctor.options.dichotomies.call(null,k),false))
{return new cljs.core.Keyword(null,"enabled","enabled",3699277491);
} else
{return null;
}
}
});
/**
* Takes a asciidoctor keyword form e.g. :!foo: and returns state as enabled or disabled.
* Asciidoctor keywords use exclamation marks to denote disabled states e.g. :!numbered:
* disables numbered sections throughout the document.
*/
lt.plugins.asciidoctor.options.adoc_flagged_kw = (function adoc_flagged_kw(in$){return (function (k){if((cljs.core._EQ_.call(null,cljs.core.first.call(null,cljs.core.name.call(null,k)),"!")) || (cljs.core._EQ_.call(null,cljs.core.last.call(null,cljs.core.name.call(null,k)),"!")) || (cljs.core._EQ_.call(null,cljs.core.last.call(null,cljs.core.butlast.call(null,cljs.core.name.call(null,k))),"!")))
{return new cljs.core.Keyword(null,"disabled","disabled",1284845038);
} else
{if(lt.plugins.asciidoctor.options.nothing_QMARK_.call(null,new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(k.call(null,lt.plugins.asciidoctor.options.attribute_map))))
{return new cljs.core.Keyword(null,"disabled","disabled",1284845038);
} else
{return new cljs.core.Keyword(null,"enabled","enabled",3699277491);
}
}
}).call(null,cljs.core.keyword.call(null,in$));
});
/**
* Takes a key potentially in asciidoctor attribute form and strips
* naked to its bare minimum clojure form e.g. :!foo!: => :foo
*/
lt.plugins.asciidoctor.options.naked_key = (function naked_key(k){var temp__4124__auto__ = (k instanceof cljs.core.Keyword);if(temp__4124__auto__)
{var k_QMARK_ = temp__4124__auto__;var in$ = cljs.core.name.call(null,k);var in$__$1 = ((cljs.core._EQ_.call(null,cljs.core.first.call(null,in$),"!"))?cljs.core.rest.call(null,in$):in$);var in$__$2 = ((cljs.core._EQ_.call(null,cljs.core.last.call(null,in$__$1),":"))?cljs.core.butlast.call(null,in$__$1):in$__$1);var in$__$3 = ((cljs.core._EQ_.call(null,cljs.core.last.call(null,in$__$2),"!"))?cljs.core.butlast.call(null,in$__$2):in$__$2);return cljs.core.keyword.call(null,clojure.string.join.call(null,in$__$3));
} else
{return null;
}
});
/**
* Takes a keyword and substitutes hyphens for spaces and underscores for hyphens.
*/
lt.plugins.asciidoctor.options.english_key = (function english_key(k){return clojure.string.replace.call(null,clojure.string.replace.call(null,cljs.core.name.call(null,k),"-"," "),"_","-");
});
/**
* Hash-map using asciidoctor form keys which have a built-in flag/switch to denote
* or toggle their often boolean values. Used in doc strings and description of state.
*/
lt.plugins.asciidoctor.options.stateful_attrs = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"!numbered:","!numbered:",4768826371),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"verb","verb",1017520273),new cljs.core.Keyword(null,"auto_numbering","auto_numbering",3902523611),new cljs.core.Keyword(null,"object","object",4285503153),new cljs.core.Keyword(null,"sections","sections",1961841056)], null),new cljs.core.Keyword(null,"description:","description:",3387551536),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"verb","verb",1017520273),new cljs.core.Keyword(null,"description","description",3584325486),new cljs.core.Keyword(null,"object","object",4285503153),new cljs.core.Keyword(null,"document","document",1875625101),new cljs.core.Keyword(null,"default","default",2558708147),""], null),new cljs.core.Keyword(null,"sectids:","sectids:",1961830583),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"verb","verb",1017520273),new cljs.core.Keyword(null,"generation","generation",1319607434),new cljs.core.Keyword(null,"object","object",4285503153),new cljs.core.Keyword(null,"section-title-ids","section-title-ids",624360525),new cljs.core.Keyword(null,"aggregate","aggregate",1189081393),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"using","using",1125486582),(function (){var and__6691__auto__ = new cljs.core.Keyword(null,"section-title","section-title",2568562914);if(cljs.core.truth_(and__6691__auto__))
{return new cljs.core.Keyword(null,"idprefix","idprefix",1196307167);
} else
{return and__6691__auto__;
}
})()], null)], null),new cljs.core.Keyword(null,"idprefix:","idprefix:",2373427679),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"verb","verb",1017520273),new cljs.core.Keyword(null,"prefixing","prefixing",4018730882),new cljs.core.Keyword(null,"object","object",4285503153),new cljs.core.Keyword(null,"section-ids","section-ids",1587577666),new cljs.core.Keyword(null,"default","default",2558708147),"_"], null),new cljs.core.Keyword(null,"!toc:","!toc:",1047945989),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"verb","verb",1017520273),new cljs.core.Keyword(null,"auto_generation","auto_generation",1064042778),new cljs.core.Keyword(null,"object","object",4285503153),new cljs.core.Keyword(null,"table-of-contents","table-of-contents",936078915)], null)], null);
/**
* FIXME: adoc-flagged does not look at :default atm
* Returns a state agnostic key map of attributes, augmenting the value map with :state and :value
*/
lt.plugins.asciidoctor.options.state_agnostic_keymap = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p1__15892_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[lt.plugins.asciidoctor.options.naked_key.call(null,cljs.core.key.call(null,p1__15892_SHARP_))],[cljs.core.into.call(null,cljs.core.val.call(null,p1__15892_SHARP_),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",1125876963),cljs.core.key.call(null,p1__15892_SHARP_),new cljs.core.Keyword(null,"state","state",1123661827),lt.plugins.asciidoctor.options.adoc_flagged_kw.call(null,cljs.core.key.call(null,p1__15892_SHARP_))], null))]);
}),lt.plugins.asciidoctor.options.stateful_attrs));
/**
* Asciidoctor attribute map (in progress as being gathered) which takes a state
* agnostic key (dubbed naked key, or clojure key here) as input using special case
* :all to return all attributes.
*/
lt.plugins.asciidoctor.options.attribute_map = (function attribute_map(k){if(cljs.core._EQ_.call(null,k,new cljs.core.Keyword(null,"all","all",1014000915)))
{return lt.plugins.asciidoctor.options.stateful_attrs;
} else
{return cljs.core.filter.call(null,(function (p1__15893_SHARP_){return cljs.core._EQ_.call(null,lt.plugins.asciidoctor.options.naked_key.call(null,cljs.core.key.call(null,p1__15893_SHARP_)),k);
}),lt.plugins.asciidoctor.options.stateful_attrs);
}
});
/**
* Returns a natural language based representation of the attribute state.
*/
lt.plugins.asciidoctor.options.attribute_nlp_state = (function attribute_nlp_state(k){return cljs.core.map.call(null,(function (p1__15894_SHARP_){return clojure.string.capitalize.call(null,clojure.string.join.call(null," ",cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,lt.plugins.asciidoctor.options.english_key.call(null,new cljs.core.Keyword(null,"object","object",4285503153).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,p1__15894_SHARP_)))),"of"),lt.plugins.asciidoctor.options.english_key.call(null,new cljs.core.Keyword(null,"verb","verb",1017520273).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,p1__15894_SHARP_)))),"the"),lt.plugins.asciidoctor.options.english_key.call(null,lt.plugins.asciidoctor.options.adoc_flagged_kw.call(null,cljs.core.key.call(null,p1__15894_SHARP_))))));
}),lt.plugins.asciidoctor.options.attribute_map.call(null,k));
});
/**
* Returns a normalized map of default attribute values. Uses first the key name to
* determine boolean flag on/off. If the key has a value with :default key it checks
* to see if that value is 'something' (not nothing) or else will switch off, else on.
* With the current setup having description set an empty string as default, renders
* the default value of the attribute as disabled while idprefix is enabled due to _:
* ([:!numbered: :disabled]
* [:description: :disabled] ; <=== empty string suppressed and switched off
* [:sectids: :enabled]
* [:idprefix: :enabled "_"] ; <=== not empty string is shown and switched on
* [:!toc: :disabled])
* Each attribute is named as is, that means with or without exclamation marks followed
* by on/off switch (:enabled or :disabled) always enforced. Optionally third and last
* value of the attribute vector contains the :default value if any and not nothing.
*/
lt.plugins.asciidoctor.options.default_opts = (function default_opts(){return cljs.core.map.call(null,(function (p1__15895_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[lt.plugins.asciidoctor.options.naked_key.call(null,cljs.core.key.call(null,p1__15895_SHARP_))],[cljs.core.apply.call(null,cljs.core.vector,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,(cljs.core.truth_(lt.plugins.asciidoctor.options.something_QMARK_.call(null,new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,p1__15895_SHARP_))))?new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,p1__15895_SHARP_)):null)),lt.plugins.asciidoctor.options.adoc_flagged_kw.call(null,cljs.core.key.call(null,p1__15895_SHARP_))),cljs.core.key.call(null,p1__15895_SHARP_))))]);
}),lt.plugins.asciidoctor.options.attribute_map.call(null,new cljs.core.Keyword(null,"all","all",1014000915)));
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.asciidoctor.scaffold')) {
goog.provide('lt.plugins.asciidoctor.scaffold');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.console');
goog.require('lt.objs.opener');
goog.require('lt.objs.document');
goog.require('lt.objs.find');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
goog.require('lt.objs.clients.local');
goog.require('lt.object');
goog.require('lt.util.dom');
goog.require('lt.objs.dev');
goog.require('lt.objs.app');
goog.require('lt.util.load');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.clients.local');
goog.require('lt.objs.tabs');
goog.require('lt.util.dom');
goog.require('lt.objs.files');
goog.require('crate.binding');
goog.require('lt.objs.dev');
goog.require('lt.objs.command');
goog.require('lt.objs.find');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.tabs');
goog.require('lt.objs.deploy');
goog.require('lt.objs.console');
goog.require('clojure.string');
goog.require('lt.objs.document');
goog.require('lt.objs.plugins');
goog.require('lt.objs.sidebar.clients');
goog.require('clojure.string');
goog.require('lt.objs.plugins');
goog.require('lt.objs.app');
goog.require('lt.objs.editor');
goog.require('lt.objs.files');
goog.require('lt.objs.opener');
goog.require('lt.object');
goog.require('crate.binding');
goog.require('lt.util.load');
lt.plugins.asciidoctor.scaffold.req_template = cljs.core.list(new cljs.core.Keyword(null,"require","require",2109600983),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.object","lt.object",-2122453986,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"object","object",1631067384,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.app","lt.objs.app",-900210962,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"app","app",-1640434726,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.dev","lt.objs.dev",-900208414,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"dev","dev",-1640432178,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.util.dom","lt.util.dom",-273177419,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"dom","dom",-1640431877,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.util.load","lt.util.load",2092978213,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"load","load",-1637204321,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.tabs","lt.objs.tabs",-164879197,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"tabs","tabs",-1636979401,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.find","lt.objs.find",-165288226,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"finds","finds",-1543095405,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.command","lt.objs.command",-1264018920,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"cmd","cmd",-1640432909,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.files","lt.objs.files",1142336068,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"files","files",-1543097296,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.document","lt.objs.document",-1389286336,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"doc","doc",-1640431887,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.editor","lt.objs.editor",-1304303726,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"editor","editor",1346607910,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.opener","lt.objs.opener",-1007055204,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"opener","opener",1643856432,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.deploy","lt.objs.deploy",-1331808500,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"deploy","deploy",1319103136,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.plugins","lt.objs.plugins",1604924013,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"plugins","plugins",-2116161191,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.editor.pool","lt.objs.editor.pool",-172909366,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"pool","pool",-1637084715,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.clients.local","lt.objs.clients.local",481314770,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"local","local",-1537386204,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.objs.sidebar.clients","lt.objs.sidebar.clients",536013891,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"clients","clients",-779943999,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"clojure.string","clojure.string",-2028944364,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"string","string",1762449866,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"crate.binding","crate.binding",-2031081197,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"bindings","bindings",-700408761,null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"lt.plugins.asciidoctor.util","lt.plugins.asciidoctor.util",125395821,null),new cljs.core.Keyword(null,"as","as",1013907364),new cljs.core.Symbol(null,"ad-util","ad-util",1456053541,null)], null));
}

//# sourceMappingURL=asciidoctor_compiled.js.map