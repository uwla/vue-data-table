(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueDataTable"] = factory();
	else
		root["VueDataTable"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  VdtActionButtons: () => (/* reexport */ ActionButtons),
  VueDataTable: () => (/* reexport */ DataTable),
  "default": () => (/* binding */ entry_lib),
  languageServiceProvider: () => (/* reexport */ languageServiceProvider)
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ const setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ActionButtons/ActionButtons.vue?vue&type=template&id=d37bf7a2&
var render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vdt-action-buttons"},_vm._l((_vm.actionIcons),function(icon,action,i){return _c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.actions.includes(action)),expression:"actions.includes(action)"}],key:i,class:'vdt-action-' + action,on:{"click":function($event){return _vm.triggerAction(action)}}},[_vm._v(" "+_vm._s(icon)+" ")])}),0)
}
var staticRenderFns = []


;// CONCATENATED MODULE: ./src/components/ActionButtons/ActionButtons.js?vue&type=script&lang=js&
/* harmony default export */ const ActionButtonsvue_type_script_lang_js_ = ({
    name: "VdtActionButtons",
    methods: {
        triggerAction(action) {
            this.$emit('userEvent', {
                action: action,
                data: this.data,
            })
        }
    },
    props: {
        actions: {
            type: Array,
            default: () => ['view', 'edit', 'delete']
        },
        actionIcons: {
            type: Object,
            default: () => ({
                view: "👁️",
                edit: "✏️ ",
                delete: "🗑️",
            })
        },
        data: Object
    }
});

;// CONCATENATED MODULE: ./src/components/ActionButtons/ActionButtons.js?vue&type=script&lang=js&
 /* harmony default export */ const ActionButtons_ActionButtonsvue_type_script_lang_js_ = (ActionButtonsvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/components/ActionButtons/ActionButtons.vue



;


/* normalize component */

var component = normalizeComponent(
  ActionButtons_ActionButtonsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const ActionButtons = (component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DataTable.vue?vue&type=template&id=7d7251c0&
var DataTablevue_type_template_id_7d7251c0_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vue-data-table"},[(_vm.showPerPage)?_c('vdt-per-page',_vm._b({on:{"set-per-page":_vm.setPerPageFromUserInput}},'vdt-per-page',_vm.propsPerPage,false)):_vm._e(),(_vm.showSearchFilter)?_c('vdt-search-filter',_vm._b({on:{"set-search":_vm.setSearch}},'vdt-search-filter',_vm.propsSearchFilter,false)):_vm._e(),_c('vdt-table',_vm._b({on:{"sort-column":_vm.sortColumn,"user-event":_vm.emitUserEvent}},'vdt-table',_vm.propsTable,false)),(_vm.showEntriesInfo)?_c('vdt-entries-info',_vm._b({},'vdt-entries-info',_vm.propsEntriesInfo,false)):_vm._e(),(_vm.showPagination)?_c('vdt-pagination',_vm._b({on:{"set-page":_vm.setPage}},'vdt-pagination',_vm.propsPagination,false)):_vm._e(),(_vm.showDownloadButton)?_c('vdt-export-data',_vm._b({},'vdt-export-data',_vm.propsExportData,false)):_vm._e()],1)
}
var DataTablevue_type_template_id_7d7251c0_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EntriesInfo/EntriesInfo.vue?vue&type=template&id=0ca8b42c&
var EntriesInfovue_type_template_id_0ca8b42c_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vdt-info"},[_vm._v(" "+_vm._s(_vm.entriesInfoText)+" ")])
}
var EntriesInfovue_type_template_id_0ca8b42c_staticRenderFns = []


;// CONCATENATED MODULE: ./src/components/EntriesInfo/EntriesInfo.js?vue&type=script&lang=js&
/* harmony default export */ const EntriesInfovue_type_script_lang_js_ = ({
    name: "VdtEntriesInfo",
    props: {
        entriesInfoText: {
            type: String,
            required: true
        }
    }
});

;// CONCATENATED MODULE: ./src/components/EntriesInfo/EntriesInfo.js?vue&type=script&lang=js&
 /* harmony default export */ const EntriesInfo_EntriesInfovue_type_script_lang_js_ = (EntriesInfovue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/EntriesInfo/EntriesInfo.vue



;


/* normalize component */

var EntriesInfo_component = normalizeComponent(
  EntriesInfo_EntriesInfovue_type_script_lang_js_,
  EntriesInfovue_type_template_id_0ca8b42c_render,
  EntriesInfovue_type_template_id_0ca8b42c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const EntriesInfo = (EntriesInfo_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ExportData/ExportData.vue?vue&type=template&id=08d107a6&
var ExportDatavue_type_template_id_08d107a6_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vdt-export"},[_c('span',[_vm._v(_vm._s(_vm.downloadText))]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedExport),expression:"selectedExport"}],staticClass:"vdt-input",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedExport=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.allowedExports),function(exportType,i){return _c('option',{key:i,domProps:{"value":exportType}},[_vm._v(" "+_vm._s(exportType)+" ")])}),0),_c('button',{staticClass:"vdt-btn vdt-btn-primary",on:{"click":function($event){return _vm.download()}}},[_vm._v(" "+_vm._s(_vm.downloadButtonText)+" ")])])
}
var ExportDatavue_type_template_id_08d107a6_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/export-from-json/dist/esm/utils.js
function isArray(data) {
    return Object.prototype.toString.call(data) === '[object Array]';
}
function assert(condition, msg) {
    if (!condition)
        throw new Error(msg);
}
function getValues(data) {
    return Object.keys(data).map(function (key) { return data[key]; });
}
function getKeys(data) {
    return Object.keys(data);
}
function getEntries(data) {
    return Object.keys(data).map(function (key) { return [key, data[key]]; });
}
function normalizeFileName(fileName, extension, fileNameFormatter) {
    var suffix = '.' + extension;
    var extensionPattern = new RegExp("(\\".concat(extension, ")?$"));
    return fileNameFormatter(fileName).replace(extensionPattern, suffix);
}
function normalizeXMLName(name) {
    '555xmlHello .  world!'.trim().replace(/^([0-9,;]|(xml))+/, '');
    return name.replace(/[^_a-zA-Z 0-9:\-\.]/g, '').replace(/^([ 0-9-:\-\.]|(xml))+/i, '').replace(/ +/g, '-');
}
function indent(spaces) {
    return Array(spaces + 1).join(' ');
}
function stripHTML(text) {
    return text.replace(/([<>&])/g, function (_, $1) {
        switch ($1) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            default: return '';
        }
    });
}

;// CONCATENATED MODULE: ./node_modules/export-from-json/dist/esm/processors.js
function generateDataURI(content, type, byBlob) {
    switch (type) {
        case 'txt': {
            var blobType = 'text/plain;charset=utf-8';
            if (byBlob)
                return URL.createObjectURL(new Blob([content], { type: blobType }));
            return "data:,".concat(blobType) + encodeURIComponent(content);
        }
        case 'css': {
            var blobType = 'text/css;charset=utf-8';
            if (byBlob)
                return URL.createObjectURL(new Blob([content], { type: blobType }));
            return "data:,".concat(blobType) + encodeURIComponent(content);
        }
        case 'html': {
            var blobType = 'text/html;charset=utf-8';
            if (byBlob)
                return URL.createObjectURL(new Blob([content], { type: blobType }));
            return "data:,".concat(blobType) + encodeURIComponent(content);
        }
        case 'json': {
            var blobType = 'text/json;charset=utf-8';
            if (byBlob)
                return URL.createObjectURL(new Blob([content], { type: blobType }));
            return "data:,".concat(blobType) + encodeURIComponent(content);
        }
        case 'csv': {
            var blobType = 'text/csv;charset=utf-8';
            if (byBlob)
                return URL.createObjectURL(new Blob([content], { type: blobType }));
            return "data:,".concat(blobType) + encodeURIComponent(content);
        }
        case 'xls': {
            var blobType = 'text/application/vnd.ms-excel;charset=utf-8';
            if (byBlob)
                return URL.createObjectURL(new Blob([content], { type: blobType }));
            return "data:,".concat(blobType) + encodeURIComponent(content);
        }
        case 'xml': {
            var blobType = 'text/application/xml;charset=utf-8';
            if (byBlob)
                return URL.createObjectURL(new Blob([content], { type: blobType }));
            return "data:,".concat(blobType) + encodeURIComponent(content);
        }
        default: {
            return '';
        }
    }
}
function downloadFile(content, type, fileName, byBlob) {
    if (fileName === void 0) { fileName = 'download'; }
    if (byBlob === void 0) { byBlob = true; }
    var dataURI = generateDataURI(content, type, byBlob);
    var anchor = document.createElement('a');
    anchor.href = dataURI;
    anchor.download = fileName;
    anchor.setAttribute('style', 'visibility:hidden');
    document.body.appendChild(anchor);
    anchor.dispatchEvent(new MouseEvent('click', {
        bubbles: false,
        cancelable: false,
        view: window,
    }));
    document.body.removeChild(anchor);
}

;// CONCATENATED MODULE: ./node_modules/export-from-json/dist/esm/converters.js
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};

function _createFieldsMapper(fields) {
    if (!fields
        || isArray(fields) && !fields.length
        || !isArray(fields) && !getKeys(fields).length)
        return function (item) { return item; };
    var mapper = isArray(fields)
        ? fields.reduce(function (map, key) {
            var _a;
            return (__assign(__assign({}, map), (_a = {}, _a[key] = key, _a)));
        }, Object.create(null))
        : fields;
    return function (item) {
        if (isArray(item)) {
            return item
                .map(function (i) { return getEntries(i).reduce(function (map, _a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                if (key in mapper) {
                    map[mapper[key]] = value;
                }
                return map;
            }, Object.create(null)); })
                .filter(function (i) { return getKeys(i).length; });
        }
        return getEntries(item).reduce(function (map, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (key in mapper) {
                map[mapper[key]] = value;
            }
            return map;
        }, Object.create(null));
    };
}
function _prepareData(data) {
    var MESSAGE_VALID_JSON_FAIL = 'Invalid export data. Please provide a valid JSON';
    try {
        return (typeof data === 'string' ? JSON.parse(data) : data);
    }
    catch (_a) {
        throw new Error(MESSAGE_VALID_JSON_FAIL);
    }
}
function _createJSONData(data, replacer, space) {
    if (replacer === void 0) { replacer = null; }
    var MESSAGE_VALID_JSON_FAIL = 'Invalid export data. Please provide valid JSON object';
    try {
        return JSON.stringify(data, replacer, space);
    }
    catch (_a) {
        throw new Error(MESSAGE_VALID_JSON_FAIL);
    }
}
function _createTableMap(data) {
    return data.map(getEntries).reduce(function (tMap, rowKVs, rowIndex) {
        return rowKVs.reduce(function (map, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            var columnValues = map[key] || Array.from({ length: data.length }).map(function (_) { return ''; });
            columnValues[rowIndex] =
                (typeof value !== 'string' ? JSON.stringify(value) : value) || '';
            map[key] = columnValues;
            return map;
        }, tMap);
    }, Object.create(null));
}
function _createTableEntries(tableMap, beforeTableEncode) {
    if (beforeTableEncode === void 0) { beforeTableEncode = function (i) { return i; }; }
    return beforeTableEncode(getEntries(tableMap).map(function (_a) {
        var _b = __read(_a, 2), fieldName = _b[0], fieldValues = _b[1];
        return ({
            fieldName: fieldName,
            fieldValues: fieldValues,
        });
    }));
}
function encloser(value) {
    var enclosingCharacter = /,|"|\n/.test(value) ? '"' : '';
    var escaped = value.replace(/"/g, '""');
    return "".concat(enclosingCharacter).concat(escaped).concat(enclosingCharacter);
}
var defaultCreateCSVDataOption = { beforeTableEncode: function (i) { return i; }, delimiter: ',' };
function createCSVData(data, options) {
    if (options === void 0) { options = {}; }
    var _a = __assign(__assign({}, defaultCreateCSVDataOption), options), beforeTableEncode = _a.beforeTableEncode, delimiter = _a.delimiter;
    if (!data.length)
        return '';
    var tableMap = _createTableMap(data);
    var tableEntries = _createTableEntries(tableMap, beforeTableEncode);
    var head = tableEntries.map(function (_a) {
        var fieldName = _a.fieldName;
        return fieldName;
    }).join(delimiter) + '\r\n';
    var columns = tableEntries.map(function (_a) {
        var fieldValues = _a.fieldValues;
        return fieldValues;
    })
        .map(function (column) { return column.map(encloser); });
    var rows = columns.reduce(function (mergedColumn, column) { return mergedColumn.map(function (value, rowIndex) { return "".concat(value).concat(delimiter).concat(column[rowIndex]); }); });
    return head + rows.join('\r\n');
}
function _renderTableHTMLText(data, beforeTableEncode) {
    assert(data.length > 0);
    var tableMap = _createTableMap(data);
    var tableEntries = _createTableEntries(tableMap, beforeTableEncode);
    var head = tableEntries.map(function (_a) {
        var fieldName = _a.fieldName;
        return fieldName;
    })
        .join('</b></th><th><b>');
    var columns = tableEntries.map(function (_a) {
        var fieldValues = _a.fieldValues;
        return fieldValues;
    })
        .map(function (column) { return column.map(function (value) { return "<td>".concat(value, "</td>"); }); });
    var rows = columns.reduce(function (mergedColumn, column) { return mergedColumn
        .map(function (value, rowIndex) { return "".concat(value).concat(column[rowIndex]); }); });
    return "\n    <table>\n      <thead>\n        <tr><th><b>".concat(head, "</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>").concat(rows.join("</tr>\n        <tr>"), "</tr>\n      </tbody>\n    </table>\n  ");
}
var defaultCreateXLSDataOptions = { beforeTableEncode: function (i) { return i; } };
function createXLSData(data, options) {
    var beforeTableEncode = __assign(__assign({}, defaultCreateXLSDataOptions), options).beforeTableEncode;
    if (!data.length)
        return '';
    var content = "<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n  </head >\n  <body>\n    ".concat(_renderTableHTMLText(data, beforeTableEncode), "\n  </body>\n</html >\n");
    return content;
}
function createXMLData(data) {
    var content = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE base>\n".concat(_renderXML(data, 'base'), "\n");
    return content;
}
function _renderXML(data, tagName, arrayElementTag, spaces) {
    if (arrayElementTag === void 0) { arrayElementTag = 'element'; }
    if (spaces === void 0) { spaces = 0; }
    var tag = normalizeXMLName(tagName);
    var indentSpaces = indent(spaces);
    if (data === null || data === undefined) {
        return "".concat(indentSpaces, "<").concat(tag, " />");
    }
    var content = isArray(data)
        ? data.map(function (item) { return _renderXML(item, arrayElementTag, arrayElementTag, spaces + 2); }).join('\n')
        : typeof data === 'object'
            ? getEntries(data)
                .map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return _renderXML(value, key, arrayElementTag, spaces + 2);
            }).join('\n')
            : indentSpaces + '  ' + stripHTML(String(data));
    var contentWithWrapper = "".concat(indentSpaces, "<").concat(tag, ">\n").concat(content, "\n").concat(indentSpaces, "</").concat(tag, ">");
    return contentWithWrapper;
}

;// CONCATENATED MODULE: ./node_modules/export-from-json/dist/esm/types.js
var exportTypes = {
    txt: 'txt',
    css: 'css',
    html: 'html',
    json: 'json',
    csv: 'csv',
    xls: 'xls',
    xml: 'xml',
};

;// CONCATENATED MODULE: ./node_modules/export-from-json/dist/esm/exportFromJSON.js




function exportFromJSON(_a) {
    var data = _a.data, _b = _a.fileName, fileName = _b === void 0 ? 'download' : _b, extension = _a.extension, _c = _a.fileNameFormatter, fileNameFormatter = _c === void 0 ? function (name) { return name.replace(/\s+/, '_'); } : _c, fields = _a.fields, _d = _a.exportType, exportType = _d === void 0 ? 'txt' : _d, _e = _a.replacer, replacer = _e === void 0 ? null : _e, _f = _a.space, space = _f === void 0 ? 4 : _f, _g = _a.processor, processor = _g === void 0 ? downloadFile : _g, _h = _a.withBOM, withBOM = _h === void 0 ? false : _h, _j = _a.beforeTableEncode, beforeTableEncode = _j === void 0 ? function (i) { return i; } : _j, _k = _a.delimiter, delimiter = _k === void 0 ? ',' : _k;
    var MESSAGE_IS_ARRAY_FAIL = 'Invalid export data. Please provide an array of objects';
    var MESSAGE_UNKNOWN_EXPORT_TYPE = "Can't export unknown data type ".concat(exportType, ".");
    var MESSAGE_FIELD_INVALID = "Can't export string data to ".concat(exportType, ".");
    if (typeof data === 'string') {
        switch (exportType) {
            case 'txt':
            case 'css':
            case 'html': {
                return processor(data, exportType, normalizeFileName(fileName, extension !== null && extension !== void 0 ? extension : exportType, fileNameFormatter));
            }
            default:
                throw new Error(MESSAGE_FIELD_INVALID);
        }
    }
    var fieldsMapper = _createFieldsMapper(fields);
    var safeData = fieldsMapper(_prepareData(data));
    var JSONData = _createJSONData(safeData, replacer, space);
    switch (exportType) {
        case 'txt':
        case 'css':
        case 'html': {
            return processor(JSONData, exportType, normalizeFileName(fileName, extension !== null && extension !== void 0 ? extension : exportType, fileNameFormatter));
        }
        case 'json': {
            return processor(JSONData, exportType, normalizeFileName(fileName, extension !== null && extension !== void 0 ? extension : 'json', fileNameFormatter));
        }
        case 'csv': {
            assert(isArray(safeData), MESSAGE_IS_ARRAY_FAIL);
            var BOM = '\ufeff';
            var CSVData = createCSVData(safeData, { beforeTableEncode: beforeTableEncode, delimiter: delimiter });
            var content = withBOM ? BOM + CSVData : CSVData;
            return processor(content, exportType, normalizeFileName(fileName, extension !== null && extension !== void 0 ? extension : 'csv', fileNameFormatter));
        }
        case 'xls': {
            assert(isArray(safeData), MESSAGE_IS_ARRAY_FAIL);
            var content = createXLSData(safeData, { beforeTableEncode: beforeTableEncode });
            return processor(content, exportType, normalizeFileName(fileName, extension !== null && extension !== void 0 ? extension : 'xls', fileNameFormatter));
        }
        case 'xml': {
            var content = createXMLData(safeData);
            return processor(content, exportType, normalizeFileName(fileName, extension !== null && extension !== void 0 ? extension : 'xml', fileNameFormatter));
        }
        default:
            throw new Error(MESSAGE_UNKNOWN_EXPORT_TYPE);
    }
}
exportFromJSON.types = exportTypes;
exportFromJSON.processors = { downloadFile: downloadFile };
/* harmony default export */ const esm_exportFromJSON = (exportFromJSON);

;// CONCATENATED MODULE: ./node_modules/export-from-json/dist/esm/index.js

/* harmony default export */ const esm = (esm_exportFromJSON);

;// CONCATENATED MODULE: ./src/components/ExportData/ExportData.js?vue&type=script&lang=js&


/* harmony default export */ const ExportDatavue_type_script_lang_js_ = ({
    name: "VdtExportData",
    data() {
        return {
            selectedExport: ""
        }
    },
    methods: {
        download() {
            esm({
                data: this.data,
                fileName: this.downloadFileName,
                exportType: this.selectedExport
            })
        }
    },
    props: {
        data: Array,
        allowedExports: Array,
        downloadButtonText: String,
        downloadFileName: String,
        downloadText: String
    },
    watch: {
        allowedExports: {
            handler(value) {
                this.selectedExport = value[0]
            },
            immediate: true
        }
    }
});

;// CONCATENATED MODULE: ./src/components/ExportData/ExportData.js?vue&type=script&lang=js&
 /* harmony default export */ const ExportData_ExportDatavue_type_script_lang_js_ = (ExportDatavue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/ExportData/ExportData.vue



;


/* normalize component */

var ExportData_component = normalizeComponent(
  ExportData_ExportDatavue_type_script_lang_js_,
  ExportDatavue_type_template_id_08d107a6_render,
  ExportDatavue_type_template_id_08d107a6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const ExportData = (ExportData_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Pagination/Pagination.vue?vue&type=template&id=044219b0&
var Paginationvue_type_template_id_044219b0_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vdt-pagination"},[_c('div',{staticClass:"vdt-pagination-search"},[_c('span',[_vm._v(_vm._s(_vm.paginationSearchText))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pageToGo),expression:"pageToGo"}],staticClass:"vdt-input",attrs:{"min":"1","max":_vm.numberOfPages,"type":"number"},domProps:{"value":(_vm.pageToGo)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter"))return null;return _vm.setCurrentPage(_vm.pageToGo)},"input":function($event){if($event.target.composing)return;_vm.pageToGo=$event.target.value}}}),_c('button',{staticClass:"vdt-btn vdt-btn-primary",on:{"click":function($event){return _vm.setCurrentPage(_vm.pageToGo)}}},[_vm._v(" "+_vm._s(_vm.paginationSearchButtonText)+" ")])]),_c('ul',{staticClass:"vdt-pagination-items"},[_c('li',{staticClass:"vdt-page-item",class:{ disabled: _vm.isFirstPage },on:{"click":function($event){return _vm.setCurrentPage(_vm.previousPage)}}},[_c('span',{staticClass:"vdt-page-link"},[_vm._v(" "+_vm._s(_vm.previousButtonText)+" ")])]),_vm._l((_vm.pagination),function(page,i){return _c('li',{key:i,staticClass:"vdt-page-item",class:{ active: _vm.currentPage === page, disabled: page === '...'},on:{"click":function($event){return _vm.setCurrentPage(page)}}},[_c('span',{staticClass:"vdt-page-link"},[_vm._v(" "+_vm._s(page)+" ")])])}),_c('li',{staticClass:"vdt-page-item",class:{ disabled: _vm.isLastPage },on:{"click":function($event){return _vm.setCurrentPage(_vm.nextPage)}}},[_c('span',{staticClass:"vdt-page-link"},[_vm._v(" "+_vm._s(_vm.nextButtonText)+" ")])])],2)])
}
var Paginationvue_type_template_id_044219b0_staticRenderFns = []


;// CONCATENATED MODULE: ./src/components/Pagination/Pagination.js?vue&type=script&lang=js&
/* harmony default export */ const Paginationvue_type_script_lang_js_ = ({
    name: "VdtPagination",
    data() {
        return {
            pageToGo: 1
        }
    },
    methods: {
        setCurrentPage(page) {
            this.$emit("set-page", Number(page))
        }
    },
    props: {
        paginationSearchButtonText: String,
        paginationSearchText: String,
        previousButtonText: String,
        nextButtonText: String,
        isFirstPage: Boolean,
        isLastPage: Boolean,
        numberOfPages: Number,
        previousPage: Number,
        currentPage: Number,
        nextPage: Number,
        pagination: Array
    },
    watch: {
        currentPage(value) {
            this.pageToGo = value
        },
        pageToGo(value) {
            if (value > this.numberOfPages) {
                return this.numberOfPages
            }
            if (value < 1) {
                return 1
            }
            return value
        }
    }
});

;// CONCATENATED MODULE: ./src/components/Pagination/Pagination.js?vue&type=script&lang=js&
 /* harmony default export */ const Pagination_Paginationvue_type_script_lang_js_ = (Paginationvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Pagination/Pagination.vue



;


/* normalize component */

var Pagination_component = normalizeComponent(
  Pagination_Paginationvue_type_script_lang_js_,
  Paginationvue_type_template_id_044219b0_render,
  Paginationvue_type_template_id_044219b0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const Pagination = (Pagination_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/PerPage/PerPage.vue?vue&type=template&id=362239ad&
var PerPagevue_type_template_id_362239ad_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vdt-perpage"},[_c('span',[_vm._v(_vm._s(_vm.textBeforeOptions))]),_c('select',{domProps:{"value":_vm.currentPerPage},on:{"input":function($event){return _vm.$emit('set-per-page')}}},_vm._l((_vm.perPageSizes),function(length,i){return _c('option',{key:i,domProps:{"value":length}},[_vm._v(" "+_vm._s(length)+" ")])}),0),_c('span',[_vm._v(_vm._s(_vm.textAfterOptions))])])
}
var PerPagevue_type_template_id_362239ad_staticRenderFns = []


;// CONCATENATED MODULE: ./src/components/PerPage/PerPage.js?vue&type=script&lang=js&
/* harmony default export */ const PerPagevue_type_script_lang_js_ = ({
    name: "VdtPerPage",
    computed: {
        textBeforeOptions() {
            return this.perPageText.split(":entries")[0].trim()
        },
        textAfterOptions() {
            return (this.perPageText.split(":entries")[1] || "").trim()
        }
    },
    methods: {
        stringNotEmpty(string) {
            return string !== ""
        }
    },
    props: {
        perPageText: {
            type: String,
            required: true
        },
        currentPerPage: {
            type: Number,
            required: true
        },
        perPageSizes: {
            type: Array,
            required: true
        }
    }
});

;// CONCATENATED MODULE: ./src/components/PerPage/PerPage.js?vue&type=script&lang=js&
 /* harmony default export */ const PerPage_PerPagevue_type_script_lang_js_ = (PerPagevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/PerPage/PerPage.vue



;


/* normalize component */

var PerPage_component = normalizeComponent(
  PerPage_PerPagevue_type_script_lang_js_,
  PerPagevue_type_template_id_362239ad_render,
  PerPagevue_type_template_id_362239ad_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const PerPage = (PerPage_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SearchFilter/SearchFilter.vue?vue&type=template&id=8d3eb916&
var SearchFiltervue_type_template_id_8d3eb916_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vdt-search"},[_c('span',[_vm._v(_vm._s(_vm.searchText))]),_c('input',{attrs:{"type":"search"},domProps:{"value":_vm.search},on:{"input":function($event){return _vm.$emit('set-search')}}})])
}
var SearchFiltervue_type_template_id_8d3eb916_staticRenderFns = []


;// CONCATENATED MODULE: ./src/components/SearchFilter/SearchFilter.js?vue&type=script&lang=js&
/* harmony default export */ const SearchFiltervue_type_script_lang_js_ = ({
    name: "VdtSearchFilter",
    props: {
        searchText: String,
        search: String
    }
});

;// CONCATENATED MODULE: ./src/components/SearchFilter/SearchFilter.js?vue&type=script&lang=js&
 /* harmony default export */ const SearchFilter_SearchFiltervue_type_script_lang_js_ = (SearchFiltervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/SearchFilter/SearchFilter.vue



;


/* normalize component */

var SearchFilter_component = normalizeComponent(
  SearchFilter_SearchFiltervue_type_script_lang_js_,
  SearchFiltervue_type_template_id_8d3eb916_render,
  SearchFiltervue_type_template_id_8d3eb916_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const SearchFilter = (SearchFilter_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SortableColumn/SortingIcon.vue?vue&type=template&id=cfe38036&
var SortingIconvue_type_template_id_cfe38036_render = function render(){var _vm=this,_c=_vm._self._c;return _vm._m(0)
}
var SortingIconvue_type_template_id_cfe38036_staticRenderFns = [function (){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"vdt-sorting-icon"},[_c('div',{staticClass:"icon asc"}),_c('div',{staticClass:"icon desc"})])
}]


;// CONCATENATED MODULE: ./src/components/SortableColumn/SortingIcon.vue?vue&type=template&id=cfe38036&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SortableColumn/SortingIcon.vue?vue&type=script&lang=js&

/* harmony default export */ const SortingIconvue_type_script_lang_js_ = ({
    name: "VdtSortingIcon"
});

;// CONCATENATED MODULE: ./src/components/SortableColumn/SortingIcon.vue?vue&type=script&lang=js&
 /* harmony default export */ const SortableColumn_SortingIconvue_type_script_lang_js_ = (SortingIconvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/SortableColumn/SortingIcon.vue



;


/* normalize component */

var SortingIcon_component = normalizeComponent(
  SortableColumn_SortingIconvue_type_script_lang_js_,
  SortingIconvue_type_template_id_cfe38036_render,
  SortingIconvue_type_template_id_cfe38036_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const SortingIcon = (SortingIcon_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SortableColumn/SortingIndex.vue?vue&type=template&id=e3b5806a&
var SortingIndexvue_type_template_id_e3b5806a_render = function render(){var _vm=this,_c=_vm._self._c;return _c('span',{staticClass:"vdt-sorting-index"},[_vm._v(" "+_vm._s(_vm.index)+" ")])
}
var SortingIndexvue_type_template_id_e3b5806a_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/SortableColumn/SortingIndex.vue?vue&type=script&lang=js&

/* harmony default export */ const SortingIndexvue_type_script_lang_js_ = ({
    name: "VdtSortingIndex",
    props: {
        index: {
            type: Number,
            required: true
        }
    }
});

;// CONCATENATED MODULE: ./src/components/SortableColumn/SortingIndex.vue?vue&type=script&lang=js&
 /* harmony default export */ const SortableColumn_SortingIndexvue_type_script_lang_js_ = (SortingIndexvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/SortableColumn/SortingIndex.vue



;


/* normalize component */

var SortingIndex_component = normalizeComponent(
  SortableColumn_SortingIndexvue_type_script_lang_js_,
  SortingIndexvue_type_template_id_e3b5806a_render,
  SortingIndexvue_type_template_id_e3b5806a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const SortingIndex = (SortingIndex_component.exports);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Table/Table.vue?vue&type=template&id=6ce1c4bf&
var Tablevue_type_template_id_6ce1c4bf_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{staticClass:"vdt-table"},[_c('table',{class:_vm.tableClass},[_c('thead',[_c('tr',_vm._l((_vm.columns),function(column,i){return _c('th',{key:i,staticClass:"vdt-column",class:column.cssClass,attrs:{"data-sortable":column.sortable,"data-sorting":column.sortingMode},on:{"click":function($event){return _vm.$emit('sort-column', column)}}},[_c('div',{staticClass:"vdt-column-content"},[_c('span',[_vm._v(_vm._s(column.title))]),(column.sortingIndex > 0)?_c(_vm.sortingIndexComponent,{tag:"component",attrs:{"index":column.sortingIndex}}):_vm._e(),(column.sortable)?_c(_vm.sortingIconComponent,{tag:"component"}):_vm._e()],1)])}),0)]),(! _vm.isLoading)?_c('tbody',[(_vm.isEmpty)?_c('tr',[_c('td',{staticClass:"vdt-empty-body",attrs:{"colspan":_vm.numberOfColumns}},[_vm._v(" "+_vm._s(_vm.emptyTableText)+" ")])]):_vm._e(),_vm._l((_vm.dataDisplayed),function(data,i){return _c('tr',{key:i},_vm._l((_vm.columns),function(column,j){return _c('td',{key:j},[_c(column.component,_vm._b({tag:"component",on:{"userEvent":_vm.emitUserEvent}},'component',{ data, ...column.componentProps },false))],1)}),0)})],2):_vm._e(),(_vm.isLoading)?_c(_vm.loadingComponent,{tag:"component"}):_vm._e(),(_vm.footerComponent)?_c(_vm.footerComponent,_vm._b({tag:"component"},'component',{ data: _vm.data, dataDisplayed: _vm.dataDisplayed, dataFiltered: _vm.dataFiltered },false)):_vm._e()],1)])
}
var Tablevue_type_template_id_6ce1c4bf_staticRenderFns = []


;// CONCATENATED MODULE: ./src/components/Table/Table.js?vue&type=script&lang=js&
/* harmony default export */ const Tablevue_type_script_lang_js_ = ({
    name: "VdtTable",
    methods: {
        /**
         * Propage upwards an event from a user custom component
         *
         * @returns {void}
         */
        emitUserEvent(payload) {
            this.$emit('user-event', payload)
        },
    },
    props: {
        tableClass: String,
        columns: Array,
        data: Array,
        dataDisplayed: Array,
        dataFiltered: Array,
        emptyTableText: String,
        footerComponent: [Object, String],
        isEmpty: Boolean,
        isLoading: Boolean,
        loadingComponent: [Object, String],
        numberOfColumns: Number,
        sortingIconComponent: Object,
        sortingIndexComponent: Object,
    },
});

;// CONCATENATED MODULE: ./src/components/Table/Table.js?vue&type=script&lang=js&
 /* harmony default export */ const Table_Tablevue_type_script_lang_js_ = (Tablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Table/Table.vue



;


/* normalize component */

var Table_component = normalizeComponent(
  Table_Tablevue_type_script_lang_js_,
  Tablevue_type_template_id_6ce1c4bf_render,
  Tablevue_type_template_id_6ce1c4bf_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const Table = (Table_component.exports);
;// CONCATENATED MODULE: ./src/helpers.js
/**
 * Performs a case-insensitive comparison of two strings
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
function compareStrings(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase())
}

/**
 * Perform a comparison of numeric values (possibly strings)
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
function compareNumbers(a, b) {
    return Number(a) - Number(b)
}

/**
 * Capitalize the first letter of each word and separate words by space
 * @param {String} str
 * @returns {String}
 */
function toTitleCase(str) {
    // convert snake case to title case
    str = str.replace(/_/g, ' ');

    // convert camel case to title case
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');

    // capitalize first letter of each word
    str = str.replace(/\b\w/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())

    // return the result
    return str
}

/**
 * Replace multiple substrings in the given string from the matching arrays.
 * @param {string} target
 * @param {Array} searchValues
 * @param {Array} replacements
 * @returns {String}
 */
function stringReplaceFromArray(target, searchValues, replacements) {
    for (let i = 0; i < searchValues.length; i++) {
        target = target.replace(searchValues[i], replacements[i])
    }
    return target
}

/**
 * Get an array with the numbers in the specified range
 * @param {Number} min
 * @param {Number} max
 * @param {Number} step=1
 * @returns {Array}
 */
function range(min, max, step = 1) {
    var range = []
    for (let i = min; i <= max; i += step) {
        range.push(i)
    }
    return range
}

/**
 * Indicates if the variable is null, undefined, or empty string
 * @param {*} variable
 * @returns {Boolean}
 */
function isNullable(variable) {
    return variable === null || variable === "" || variable === undefined
}

/**
 * Sort an array using stable sort
 * @param {Array} array to be sorted
 * @param {Function} compare function
 * @returns {array}
 */
function stableSort(arr, compare) {
    return arr.map((item, index) => ({item, index}))
        .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
        .map(({item}) => item)
}
/**
 * Safely compare two items, which may be nullable
 * @param {Function} compare function
 * @returns {Function}
 */
function stableCompare(compareFunction) {
    return function(a, b) {
        if (isNullable(a)) return 1
        if (isNullable(b)) return -1
        return compareFunction(a,b)
    }
}

/**
 * Safely stable sort an array that may have null elements
 * @param {Array} array
 * @param {Function} compareFunction
 * @returns {Array}
 */
function arraySafeSort(array, compareFunction) {
    return stableSort(array, stableCompare(compareFunction))
}

/**
 * Sort an array of objects (representing the table) by the given column
 * @param {Array} data
 * @param {Array} column
 * @returns {void}
 */
function sortDataByColumns(data, columns) {
    let l = columns.length

    let fn = (a, b) => {
        let i = 0
        while (i < l) {
            let c = columns[i]
            let { sortingMode, compareFunction: f } = c

            if (isNullable(f))
            {
                let { key, type } = c
                if (type === "string")
                    f = (a,b) => compareStrings(a[key], b[key])
                if (type === "numeric" || type === "number")
                    f = (a,b) => compareNumbers(a[key], b[key])
            }

            let result
            if (sortingMode == "asc") result = f(a, b)
            else result = f(b, a)

            if (result != 0)
                return result
            i += 1
        }
        return 0
    }

    return arraySafeSort(data, fn)
}

/**
 * Cross-browser utility to get the event target value
 * @returns {*}
 */
function getEventTargetValue(event) {
    event = event || window.event
    var target
    if (event !== undefined) {
        target = event.target || event.srcElement
    }
    if (target !== undefined) {
        return target.value
    }
    return null
}


/**
 * Performs search on strings
 * @param {Object} data
 * @param {String} search
 * @param {String} key
 * @returns {Boolean}
 */
function searchStringColumn(data, search, key) {
    return data[key].toLowerCase().includes(search.toLowerCase())
}

/**
 * Performs search on numeric values
 * @param {Object} data
 * @param {String} search
 * @param {String} key
 * @returns {Boolean}
 */
function searchNumericColumn(data, search, key) {
    return data[key].toString().includes(search)
}

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Table/TableCell.vue?vue&type=template&id=521441c0&
var TableCellvue_type_template_id_521441c0_render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('span',[_vm._v(_vm._s(_vm.data[_vm.columnKey]))])
}
var TableCellvue_type_template_id_521441c0_staticRenderFns = []


;// CONCATENATED MODULE: ./src/components/Table/TableCell.js?vue&type=script&lang=js&
/* harmony default export */ const TableCellvue_type_script_lang_js_ = ({
    name: "VdtTableCell",
    props: {
        columnKey: String,
        data: Object,
    }
});

;// CONCATENATED MODULE: ./src/components/Table/TableCell.js?vue&type=script&lang=js&
 /* harmony default export */ const Table_TableCellvue_type_script_lang_js_ = (TableCellvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Table/TableCell.vue





/* normalize component */
;
var TableCell_component = normalizeComponent(
  Table_TableCellvue_type_script_lang_js_,
  TableCellvue_type_template_id_521441c0_render,
  TableCellvue_type_template_id_521441c0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const TableCell = (TableCell_component.exports);
;// CONCATENATED MODULE: ./src/lang/en.js
/* harmony default export */ const en = ({
    perPageText: "Show :entries entries",
    infoText: "Showing :first to :last of :total entries",
    infoFilteredText: "Showing :first to :last of :filtered (filtered from :total entries)",
    nextButtonText: "Next",
    previousButtonText: "Previous",
    paginationSearchText: "Go to page",
    paginationSearchButtonText: "GO",
    searchText: "search:",
    emptyTableText: "No matching records found",
    downloadText: "export as:",
    downloadButtonText: "DOWNLOAD"
});

;// CONCATENATED MODULE: ./src/lang/es.js
/* harmony default export */ const es = ({
    perPageText: "Mostrando :entries datos",
    infoText: "Mostrando :first hasta :last de :total datos",
    infoFilteredText: "Mostrando :first hasta :last de :filtered (filtrado de :total datos)",
    nextButtonText: "Siguiente",
    previousButtonText: "Anterior",
    paginationSearchText: "Ir a la página",
    paginationSearchButtonText: "IR",
    searchText: "buscar:",
    emptyTableText: "No se encontraron datos que coincidan con la búsqueda",
    downloadText: "exportar cómo:",
    downloadButtonText: "DESCARGAR"
});

;// CONCATENATED MODULE: ./src/lang/pt-br.js
/* harmony default export */ const pt_br = ({
    perPageText: "Exibindo :entries dados",
    infoText: "Exibindo :first até :last de :total dados",
    infoFilteredText: "Exibindo :first até :last de :filtered (filtrado de :total dados)",
    nextButtonText: "Próximo",
    previousButtonText: "Anterior",
    paginationSearchText: "Ir para página",
    paginationSearchButtonText: "IR",
    searchText: "pesquisar:",
    emptyTableText: "Nenhum dado correspondente à pesquisa foi encontrado",
    downloadText: "exportar como:",
    downloadButtonText: "BAIXAR"
});

;// CONCATENATED MODULE: ./src/lang.js
/**
 * The following block of code is used to automatically register the
 * lang files. It will recursively scan the lang directory and
 * register them with their "basename".
 */




const translations = {
    "pt-br": pt_br,
    "en": en,
    "es": es,
}

/* utility for the user to change or add new translations */
const languageServiceProvider = {
    setLang(lang, translation) {
        translations[lang] = translation
    },
    removeLang(lang) {
        delete translations[lang]
    },
    setLangText(lang, key, text) {
        translations[lang][key] = text
    }
}

/* harmony default export */ const src_lang = (translations);


;// CONCATENATED MODULE: ./src/parser.js




// default column to all instances of VDT
const globalDefaultColumn = {
    component: TableCell,
    componentProps: {},
    index: 1000,
    searchable: true,
    sortable: true,
    type: "string",
}

const type2searchFunction = {
    string: searchStringColumn,
    numeric: searchNumericColumn,
    number: searchNumericColumn,
}

function parseColumnProps(props) {
    // extract the columns. If not set, columns are derived from columnKeys
    let columns = props.columns || props.columnKeys.map(key => ({ key }))

    // extract the local default column
    let defaultColumn = props.defaultColumn || {}

    // merge default column with the columns
    columns = columns.map(function(column, i) {
        column = { ... column }
        let { key } = column

        // if component not set, need to pass the key to the default component
        if (column.component == null)
            column.componentProps = { columnKey: key }

        // by default, columns with custom components are not sortable or searchable
        if (column.component != null) {
            column.searchable = column.searchable || false
            column.sortable = column.sortable || false
        }

        // merge the column with the default values
        column = { ...globalDefaultColumn, ...defaultColumn, ...column }

        // some default values are dynamically computed
        let { type } = column
        column.title = column.title || toTitleCase(key)
        column.searchFunction = column.searchFunction || type2searchFunction[type]

        // options below are used internally
        // shall not be overwritten by the user
        column.sortingIndex = -1
        column.sortingMode = null
        column.id = i

        return column
    })

    /* order the columns by the index, so the user can
    set a custom order for the columns to be displayed */
    columns.sort(function(a, b) {
        return a.index - b.index
    })

    // finally, return the parsed columns
    return columns
}

function parseTextProps(props) {
    const { lang, text } = props
    return { ...src_lang[lang], ...text }
}

;// CONCATENATED MODULE: ./src/components/DataTable.js?vue&type=script&lang=js&












/* harmony default export */ const DataTablevue_type_script_lang_js_ = ({
    name: "VueDataTable",
    components: {
        VdtEntriesInfo: EntriesInfo,
        VdtExportData: ExportData,
        VdtPagination: Pagination,
        VdtPerPage: PerPage,
        VdtSearchFilter: SearchFilter,
        VdtTable: Table,
    },
    computed: {
        /**
         * Get the total number of columns
         * @var {Number}
         */
        numberOfColumns() {
            return this.parsedColumns.length
        },

        /**
         * Get the column that should be used in searches
         * @var {Array}
         */
        searchableColumns() {
            return this.parsedColumns.filter(column => column.searchable)
        },

        /**
         * Get the column that should be used in searches
         * @var {Array}
         */
        sortableColumns() {
            return this.parsedColumns.filter(column => column.sortable)
        },

        //
        // ─── DATA ───────────────────────────────────────────────────────────────────────
        //

        /**
         * The data displayed in the current table page
         * @var {Array}
         */
        dataDisplayed() {
            const { lastEntry, firstEntry, dataSorted } = this
            // we need to subtract 1 due to array index
            // we need also to subtract 1 for the first
            // item to appear
            const end = lastEntry
            const start = Math.max(0, firstEntry - 1)
            return dataSorted.slice(start, end)
        },

        /**
         * The data filtered by search text
         * @var {Array}
         */
        dataFiltered() {
            const { searchableColumns, data, search } = this
            if (isNullable(search)) {
                return data
            }
            return data.filter(function(row) {
                return searchableColumns.some(function(column) {
                    return column.searchFunction(row, search, column.key)
                })
            })
        },

        /**
         * The data after sorting it by the desirable columns
         * @var {Array}
         */
        dataSorted() {
            var { dataFiltered: data, columnsBeingSorted } = this

            // do not sort if there is no rows or no data to sort
            if (columnsBeingSorted.length === 0 || data.length === 0) {
                return data
            }

            return sortDataByColumns(data, columnsBeingSorted)
        },

        /**
         * Indicates if there are no rows to shown
         * @var {Boolean}
         */
        isEmpty() {
            return this.dataDisplayed.length === 0
        },

        //
        // ─── PER PAGE ───────────────────────────────────────────────────────────────────
        //

        /**
         * Get the index of the first record being displayed in the current page
         * @var {Integer}
         */
        firstEntry() {
            const { dataFiltered, currentPerPage, currentPage } = this
            if (dataFiltered.length === 0) {
                return 0
            }
            return currentPerPage * (currentPage - 1) + 1
        },

        /**
         * Get the index of the last record being displayed in the current page
         * @var {Integer}
         */
        lastEntry() {
            return Math.min(
                this.filteredEntries,
                this.firstEntry + this.currentPerPage - 1
            )
        },

        /**
         * Get the number of records
         * @var {Integer}
         */
        totalEntries() {
            return this.data.length
        },

        /**
         * Get the number of records
         * @var {Integer}
         */
        filteredEntries() {
            return this.dataFiltered.length
        },

        /**
         * The text containing how many rows are being shown
         * @var {String}
         */
        entriesInfoText() {
            const {
                infoText,
                infoFilteredText,
                firstEntry,
                lastEntry,
                filteredEntries,
                totalEntries
            } = this
            const replacements = [
                firstEntry,
                lastEntry,
                filteredEntries,
                totalEntries
            ]
            const searchValues = [":first", ":last", ":filtered", ":total"]
            var text = infoText
            if (totalEntries !== filteredEntries) {
                text = infoFilteredText
            }
            // we take the text provided by the user, then
            // replace the placeholders with the actual
            // values, and return the result
            return stringReplaceFromArray(text, searchValues, replacements)
        },
        //
        // ─── PAGINATION ─────────────────────────────────────────────────────────────────
        //

        /**
         * Get the number of pages
         * @var {Number}
         */
        numberOfPages() {
            return Math.max(
                Math.ceil(this.filteredEntries / this.currentPerPage),
                1
            )
        },

        /**
         * Alias for the number of pages
         * @var {Number}
         */
        lastPage() {
            return this.numberOfPages
        },

        /**
         * Whether this is the last page of the table
         * @var {Boolean}
         */
        isLastPage() {
            return this.currentPage === this.numberOfPages
        },

        /**
         * Whether this is the first page of the table
         * @var {Boolean}
         */
        isFirstPage() {
            return this.currentPage === 1
        },

        /**
         * Get the number of the previous page
         * @var {Number}
         */
        previousPage() {
            return this.currentPage - 1
        },

        /**
         * Get the number of the next page
         * @var {Number}
         */
        nextPage() {
            return this.currentPage + 1
        },

        /**
         * Get the text to be shown in pagination menu
         * @var {Array}
         */
        pagination() {
            // extract the variables from "this"
            // so we don't have to type this.prop
            // every time we access it.
            const { lastPage, currentPage, nextPage, previousPage } = this
            if (lastPage === 1) {
                return [1]
            }
            if (lastPage <= 7) {
                return range(1, lastPage)
            }
            if (lastPage > 7 && currentPage <= 4) {
                return [1, 2, 3, 4, 5, "...", lastPage]
            }
            if (lastPage > 8 && lastPage > currentPage + 3) {
                return [
                    1,
                    "...",
                    previousPage,
                    currentPage,
                    nextPage,
                    "...",
                    lastPage
                ]
            }
            if (lastPage > 7 && lastPage <= currentPage + 3) {
                return [
                    1,
                    "...",
                    lastPage - 3,
                    lastPage - 2,
                    lastPage - 1,
                    lastPage
                ]
            }
        },

        //
        // ─── BINDINGS ────────────────────────────────────────────────────
        //

        /**
         * The props for the PerPage component
         * @var {Object}
         */
        propsPerPage() {
            return {
                currentPerPage: this.currentPerPage,
                perPageSizes: this.perPageSizes,
                perPageText: this.perPageText,
            }
        },

        /**
         * The props for the SearchFilter component
         * @var {Object}
         */
        propsSearchFilter() {
            return {
                search: this.search,
                searchText: this.searchText,
            }
        },

        /**
         * The props for the Table component
         * @var {Object}
         */
        propsTable() {
            return {
                columns: this.parsedColumns,
                data: this.data,
                dataDisplayed: this.dataDisplayed,
                dataFiltered: this.dataFiltered,
                emptyTableText: this.emptyTableText,
                footerComponent: this.footerComponent,
                isEmpty: this.isEmpty,
                isLoading: this.isLoading,
                loadingComponent: this.loadingComponent,
                numberOfColumns: this.numberOfColumns,
                sortingIconComponent: this.sortingIconComponent,
                sortingIndexComponent: this.sortingIndexComponent,
                tableClass: this.tableClass,
            }
        },

        /**
         * The props for the EntriesInfo component
         * @var {Object}
         */
        propsEntriesInfo() {
            return {
                entriesInfoText: this.entriesInfoText
            }
        },

        /**
         * The props for the Pagination component
         * @var {Object}
         */
        propsPagination() {
            return {
                currentPage: this.currentPage,
                isFirstPage: this.isFirstPage,
                isLastPage: this.isLastPage,
                nextButtonText: this.nextButtonText,
                nextPage: this.nextPage,
                numberOfPages: this.numberOfPages,
                pagination: this.pagination,
                paginationSearchButtonText: this.paginationSearchButtonText,
                paginationSearchText: this.paginationSearchText,
                previousButtonText: this.previousButtonText,
                previousPage: this.previousPage,
            }
        },

        /**
         * The props for the DownloadButton component
         * @var {Object}
         */
        propsExportData() {
            return {
                allowedExports: this.allowedExports,
                data: this.dataDisplayed,
                downloadButtonText: this.downloadButtonText,
                downloadFileName: this.downloadFileName,
                downloadText: this.downloadText,
            }
        }
    },

    mounted() {
        this.setDefaults()
    },

    data() {
        return {
            currentPage: 1,
            currentPerPage: 10,
            parsedColumns: [],
            columnsBeingSorted: [],
            perPageText: "",
            downloadText: "",
            downloadButtonText: "",
            emptyTableText: "",
            infoText: "",
            infoFilteredText: "",
            nextButtonText: "",
            previousButtonText: "",
            paginationSearchText: "",
            paginationSearchButtonText: "",
            search: "",
            searchText: ""
        }
    },

    methods: {
        /**
         * Propage upwards an event from a user custom component
         *
         * @returns {void}
         */
        emitUserEvent(payload) {
            this.$emit('userEvent', payload)
        },

        /**
         * Indicates if a page is valid
         * @param {Object} props
         * @returns {Boolean}
         */
        isValidPage(page) {
            return (
                typeof page === "number" &&
                page <= this.numberOfPages &&
                page > 0 &&
                page !== this.currentPage
            )
        },
        /**
         * Parse columns (assign default values while enabling customization)
         * @returns {void}
         */
        parseColumnProps() {
            var parsedColumns = parseColumnProps(this.$props)
            Object.assign(this, { parsedColumns })
        },

        /**
         * Parse the text (choose correct translation while enabling custom text)
         * @returns {void}
         */
        parseTextProps() {
            Object.assign(this, parseTextProps(this.$props))
        },

        /**
         * Toggle the sorting state of the given column.
         *
         * This actually does not sort the column, but only set the state of the
         * column, as well as the state of the other columns affected by it.
         *
         * @param {Object} column
         * @returns {void}
         */
        sortColumn(column) {
            // column is not sortable, ignore it
            if (!column.sortable) {
                return
            }


            // case when the current mode is to only sort a single column
            if (this.sortingMode == "single") {

                // mark other columns as not being sorted
                // skipping the current column
                for (let col of this.sortableColumns) {
                    if (col.id !== column.id) {
                        col.sortingMode = null
                        col.sortingIndex = -1
                    }
                }

                // the column is not being sorted
                // so, mark it as sorted in ascending mode
                if (column.sortingMode === null) {
                    column.sortingMode = "asc"
                    this.columnsBeingSorted = [column]
                    return
                }

                // the column is being sorted in ascending mode
                // so, mark it as sorted in descending mode
                if (column.sortingMode === "asc") {
                    column.sortingMode = "desc"
                    this.columnsBeingSorted = [column]
                    return
                }

                // column is being sorted in descending mode
                // so, mark it as not being sorted
                column.sortingMode = null
                this.columnsBeingSorted = []
                return
            }

            // column is not being sorted
            // so, mark it as sorted in ascending mode
            if (column.sortingMode === null) {
                column.sortingMode = "asc"
                column.sortingIndex = this.columnsBeingSorted.length + 1
                this.columnsBeingSorted.push(column)
                return
            }

            // column is being sorted in ascending mode
            // so, mark it as sorted in descending mode
            if (column.sortingMode === "asc") {
                column.sortingMode = "desc"
                this.columnsBeingSorted.splice(
                    column.sortingIndex - 1,
                    1,
                    column
                )
                return
            }

            // column is being sorted in descending mode
            // so, mark it as not being sorted
            column.sortingMode = null
            column.sortingIndex = -1
            this.columnsBeingSorted = this.columnsBeingSorted.filter(function(c) {
                return c.id !== column.id
            })

            // in this case,
            // it is necessary to update the sorting index of other columns
            // to reflect the fact that there is one less column.
            this.columnsBeingSorted.forEach(function(col, i) {
                col.sortingIndex = i + 1
            })
        },

        /**
         * Set the default values of some attributes
         * @returns {void}
         */
        setDefaults() {
            this.setPerPage(this.defaultPerPage)
        },

        /**
         * Set the current page being displayed
         * @param {Number}
         * @returns {void}
         */
        setPage(value) {
            if (this.isValidPage(value)) {
                this.currentPage = value
            }
        },

        /**
         * Set the current rows per page
         * @param {Number}
         * @returns {void}
         */
        setPerPage(value) {
            var previousFirstEntry, newPerPage, newCurrentPage
            // before updating the value of currentPerPage,
            // we need to store the current firstEntry.
            // We will use it to change the current page.
            previousFirstEntry = this.firstEntry
            newPerPage = this.currentPerPage

            if (!this.perPageSizes.includes(newPerPage)) {
                newPerPage = this.perPageSizes[0]
            }
            if (this.perPageSizes.includes(value)) {
                newPerPage = value
            }
            this.currentPerPage = newPerPage

            // update current per page so that
            // the user will see the same first
            // rows that were being displayed
            newCurrentPage = Math.floor(previousFirstEntry / newPerPage) + 1
            this.setPage(newCurrentPage)
        },

        /**
         * Set the current rows per page from the user input
         * @param {Number}
         * @returns {void}
         */
        setPerPageFromUserInput() {
            const value = Number(getEventTargetValue())
            this.setPerPage(value)
        },

        /**
         * Set the value being searched
         * @param {String}
         * @returns {void}
         */
        setSearch() {
            const value = getEventTargetValue() || ""
            this.search = value.trim()
            this.currentPage = 1
        }
    },

    props: {
        allowedExports: {
            type: Array,
            default: () => ["csv", "json", "txt"]
        },
        columns: {
            type: Array,
            required: false
        },
        columnKeys: {
            type: Array,
            required: false
        },
        data: {
            type: Array,
            required: true
        },
        defaultColumn: {
            type: Object,
            required: false,
            default: () => ({})
        },
        defaultPerPage: {
            type: Number,
            default: 10
        },
        downloadFileName: {
            type: String,
            default: "download",
        },
        footerComponent: {
            type: [Object, String],
            default: null
        },
        perPageSizes: {
            type: Array,
            default: () => [10, 25, 50, 100]
        },
        lang: {
            type: String,
            default: "en"
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        loadingComponent: {
            type: [Object, String],
            default: () => "",
        },
        showEntriesInfo: {
            type: Boolean,
            default: true
        },
        showPerPage: {
            type: Boolean,
            default: true
        },
        showDownloadButton: {
            type: Boolean,
            default: true
        },
        showPagination: {
            type: Boolean,
            default: true
        },
        showSearchFilter: {
            type: Boolean,
            default: true
        },
        sortingMode: {
            type: String,
            default: "multiple",
            validator: value => ["multiple", "single"].includes(value)
        },
        sortingIndexComponent: {
            type: Object,
            default: function() {
                return SortingIndex
            }
        },
        sortingIconComponent: {
            type: Object,
            default: function() {
                return SortingIcon
            }
        },
        tableClass: {
            type: String,
            default: "table table-striped table-hover"
        },
        text: {
            type: Object,
            required: false
        }
    },
    watch: {
        columns: {
            handler: "parseColumnProps",
            deep: true,
            immediate: true
        },
        columnKeys: {
            handler: "parseColumnProps",
            deep: true,
            immediate: true
        },
        text: {
            handler: "parseTextProps",
            deep: true,
            immediate: true
        },
        lang: {
            handler: "parseTextProps"
        },
        perPageSizes: {
            handler: "setDefaults",
        }
    }
});

;// CONCATENATED MODULE: ./src/components/DataTable.js?vue&type=script&lang=js&
 /* harmony default export */ const components_DataTablevue_type_script_lang_js_ = (DataTablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/DataTable.vue



;


/* normalize component */

var DataTable_component = normalizeComponent(
  components_DataTablevue_type_script_lang_js_,
  DataTablevue_type_template_id_7d7251c0_render,
  DataTablevue_type_template_id_7d7251c0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const DataTable = (DataTable_component.exports);
;// CONCATENATED MODULE: ./src/main.js





;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ const entry_lib = (DataTable);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=VueDataTable.umd.js.map