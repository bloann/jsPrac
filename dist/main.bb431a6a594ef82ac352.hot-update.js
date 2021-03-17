/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatejsPrac"]("main",{

/***/ "./src/modules/inputCheck.js":
/*!***********************************!*\
  !*** ./src/modules/inputCheck.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nvar inputCheck = function inputCheck() {\n  var allInputs = document.querySelectorAll('input');\n  allInputs.forEach(function (element) {\n    element.setAttribute('required');\n    element.addEventListener('input', function () {\n      allInputs.forEach(function (element) {\n        console.log(element);\n\n        if (element.closest('.calc-block')) {\n          element.value = element.value.replace(/[^\\d+]/g, '');\n        } else if (element.placeholder === 'Ваше имя' || element.placeholder === 'Ваше сообщение') {\n          element.value = element.value.replace(/[^а-яё\\ \\-]/ig, '');\n        } else if (element.type === 'email') {\n          var emailCheck = /^([a-z0-9_\\.-])+@[a-z0-9-]+\\.([a-z]{2,4}\\.)?[a-z]{2,4}$/i;\n          element.value = element.value.replace(emailCheck, '');\n        } else if (element.type === 'tel') {\n          element.value = element.value.replace(/[^\\d+\\()\\-\\+]/ig, '');\n        }\n      });\n    });\n    element.addEventListener('blur', function (element) {\n      var item = element.target;\n      item.value = item.value.replace(/\\-+/g, '-');\n      var allItems = item.value.match(/./g);\n\n      if (allItems) {\n        for (var i = 0; i < allItems.length; i++) {\n          if ((i === 0 || i === allItems.length) && (allItems[i] === ' ' || allItems[i] === '-')) {\n            allItems.splice(i, 1);\n          }\n\n          item.value = allItems.join('');\n        }\n\n        if (item.placeholder === 'Ваше имя') {\n          var itemArr = item.value.split(' ');\n          item.value = '';\n          itemArr.forEach(function (elem) {\n            return item.value += elem[0].toUpperCase() + elem.slice(1) + ' ';\n          });\n        }\n      }\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (inputCheck);\n\n//# sourceURL=webpack://jsPrac/./src/modules/inputCheck.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7c5b434542dabefc6e36")
/******/ })();
/******/ 
/******/ }
);