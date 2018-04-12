/**
 * Класс для построения цепочек запросов
 * @class
 */
class Request {

	/**
	 * Создаёт экземпляр Request
	 * @constructs
	 */
	constructor () {
		this._stack = []
		this._inProcessing = false
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
	next (src, resolve, reject) {
		let options

		if (typeof src === 'string') {
			options = { url: src }
		} else {
			options = { ...src }
		}

		this._stack.push({
			options,
			resolve,
			reject
		})

		this._start()

		return this
	}

	/**
	 * Запускает обработку первого запроса в цепочке запросов
	 * @private
	 * @async
	 */
	async _start (options) {
		if (this._inProcessing || this._stack.length === 0) {
			return
		}

		const next = this._stack[0]
		let nextOptions

		this._inProcessing = true

		try {
			const { url, ...opts } = {
				...next.options,
				...options
			}

			const res = await window.fetch(url, {
				method: 'get',
				mode: 'cors',
				...opts
			})

			if (!res.ok) {
				throw new Error(res.statusText)
			}

			if (next.resolve) {
				nextOptions = await next.resolve(res, opts, url)
			}
		} catch (e) {
			if (next.reject) {
				nextOptions = await next.reject(e)
			}
		} finally {
			this._stack.shift()
			this._inProcessing = false
			this._start(nextOptions)
		}
	}


	/**
	 * @readonly
	 * @return {Boolean} Возвращает true, если все запросы выполнены
	 */
	get inProcessing () {
		return this._inProcessing
	}
}

module.exports = Request