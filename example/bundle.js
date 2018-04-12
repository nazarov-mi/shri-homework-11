/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_request___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_request__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable no-console */


const request = new __WEBPACK_IMPORTED_MODULE_0_request___default.a();
const apiUrl = 'https://yesno.wtf/api';

request
// Пример обычного запроса
.next(apiUrl, res => console.log(res))
// Пример запросы с асинхронной функцией обратного вызова
// и модификацией объекта с опциями для следующего запроса
.next(apiUrl, (() => {
	var _ref = _asyncToGenerator(function* (res) {
		const data = yield res.json();
		const force = data.answer === 'no' ? 'yes' : 'no';

		console.log(res);

		return {
			url: `${apiUrl}?force=${force}`
		};
	});

	return function (_x) {
		return _ref.apply(this, arguments);
	};
})())
// Пример запроса с опциями переданными из предыдущего запроса
// и выаводом всех доступных данных в функции обратного вызова
.next({ referrerPolicy: 'no-referrer' }, (res, options, url) => console.log(res, options, url));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Класс для построения цепочек запросов
 * @class
 */
class Request {

	/**
  * Создаёт экземпляр Request
  * @constructs
  */
	constructor() {
		this._stack = [];
		this._inProcessing = false;
	}

	/**
  * Добавляет новое звено в цепочку запросов.
  * В функции обратного вызова в качестве параметров передаются:
  * объект Responce, объект с опциями и url.
  * @param  {String|Object} src - Url или объект с параметрами запроса
  * @param  {Function} resolve - Функция обратного вызова,
  * срабатывает при удачном завершении запроса.
  * @param  {Function} reject - Функция обратного вызова,
  * срабатывает при неудачном завершении запроса.
  * @return {Request} Возвращает текущий экземпляр класса
  */
	next(src, resolve, reject) {
		let options;

		if (typeof src === 'string') {
			options = { url: src };
		} else {
			options = _extends({}, src);
		}

		this._stack.push({
			options,
			resolve,
			reject
		});

		this._start();

		return this;
	}

	/**
  * Запускает обработку первого запроса в цепочке запросов
  * @private
  * @async
  */
	_start(options) {
		var _this = this;

		return _asyncToGenerator(function* () {
			if (_this._inProcessing || _this._stack.length === 0) {
				return;
			}

			const next = _this._stack[0];
			let nextOptions;

			_this._inProcessing = true;

			try {
				const _next$options$options = _extends({}, next.options, options),
				      { url } = _next$options$options,
				      opts = _objectWithoutProperties(_next$options$options, ['url']);

				const res = yield window.fetch(url, _extends({
					method: 'get',
					mode: 'cors'
				}, opts));

				if (!res.ok) {
					throw new Error(res.statusText);
				}

				if (next.resolve) {
					nextOptions = yield next.resolve(res, opts, url);
				}
			} catch (e) {
				if (next.reject) {
					nextOptions = yield next.reject(e);
				}
			} finally {
				_this._stack.shift();
				_this._inProcessing = false;
				_this._start(nextOptions);
			}
		})();
	}

	/**
  * @return {Boolean} Возвращает true, если все запросы выполнены
  */
	get inProcessing() {
		return this._inProcessing;
	}
}

module.exports = Request;

/***/ })
/******/ ]);