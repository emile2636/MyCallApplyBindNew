export function hello() {
	return 'world'
}

export function fancyEs6Stuff(a, b) {
	return [...a, ...b]
}

export function setUpMyCall() {
	Function.prototype.myCall = function (context = window, ...args) {
		if (typeof this !== 'function')
			throw new TypeError('must called by function')

		context.fn = this
		let result = context.fn(...args)
		delete context.fn
		return result
	}
}

export function setUpMyApply() {
	Function.prototype.myApply = function (context = window, args = []) {
		if (typeof this !== 'function')
			throw new TypeError('must called by function')
		if (!Array.isArray(args))
			throw new TypeError('Need an array for arguments')

		context.fn = this
		let result = context.fn(...args)
		delete context.fn
		return result
	}
}

export function setUpMyBind() {
	Function.prototype.myBind = function (context = window) {
		if (typeof this !== 'function')
			throw new TypeError('must called by function')

		const args = Array.prototype.slice.call(arguments, 1)
		// Array.from(arguments).slice(1)

		const _this = this
		return function F() {
			return this instanceof F
				? new _this(...args, ...arguments) // if new instance
				: _this.apply(context, args.concat(...arguments)) // call directly
		}
	}
}

export function myNew(fn, ...args) {
	let obj = {}
	obj.__proto__ = fn.prototype

	let result = fn.apply(obj, args)

	return result instanceof Object ? result : obj
}
