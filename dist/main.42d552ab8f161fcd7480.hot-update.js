/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatejsPrac"]("main",{

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nvar sendForm = function sendForm() {\n  var errorMessage = 'Что-то пошло не так!',\n      loadMessage = 'Загрузка...',\n      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';\n  var form = document.querySelectorAll('form');\n  var statusMessage = document.createElement('div');\n  statusMessage.style.cssText = 'margin: 10px; color: white; font-size: 2rem;';\n\n  var postData = function postData(body) {\n    body.forEach(function (val, key) {\n      body[key] = val;\n    });\n    return fetch('./server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(body)\n    });\n  };\n\n  form.forEach(function (item) {\n    item.addEventListener('submit', function (event) {\n      event.preventDefault();\n      var form = event.target;\n      form.appendChild(statusMessage);\n      statusMessage.textContent = loadMessage;\n      var formData = new FormData(form);\n      postData(formData).then(function (response) {\n        if (response.status === 200) {\n          statusMessage.textContent = successMessage;\n\n          if (item.matches('.popup')) {\n            var popUp = document.querySelector('.popup'),\n                time = popUp.setTimeout(function () {\n              return popUp.style.display = 'none';\n            }, 3000);\n          }\n        } else {\n          statusMessage.textContent = errorMessage;\n          throw new Error('status network not 200');\n        }\n      })[\"catch\"](function (error) {\n        statusMessage.textContent = errorMessage;\n        console.error(error);\n      });\n      form.querySelectorAll('input').forEach(function (item) {\n        return item.value = '';\n      });\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://jsPrac/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("225d7fd368360cff4180")
/******/ })();
/******/ 
/******/ }
);