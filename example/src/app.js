/* eslint-disable no-console */
import Request from 'request'

const request = new Request()
const apiUrl = 'https://yesno.wtf/api'

request
	// Пример обычного запроса
	.next(apiUrl, res => console.log(res))
	// Пример запросы с асинхронной функцией обратного вызова
	// и модификацией объекта с опциями для следующего запроса
	.next(apiUrl, async (res) => {
		const data = await res.json()
		const force = data.answer === 'no' ? 'yes' : 'no'

		console.log(res)

		return {
			url: `${apiUrl}?force=${force}`
		}
	})
	// Пример запроса с опциями переданными из предыдущего запроса
	// и выаводом всех доступных данных в функции обратного вызова
	.next({ referrerPolicy: 'no-referrer' }, (res, options, url) => console.log(res, options, url))