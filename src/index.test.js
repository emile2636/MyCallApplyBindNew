import {
	hello,
	fancyEs6Stuff,
	setUpMyBind,
	setUpMyCall,
	setUpMyApply,
	myNew
} from './index'

beforeAll(() => {
	setUpMyBind()
	setUpMyCall()
	setUpMyApply()
})

function Pokemon(name) {
	this.name = name
}

Pokemon.prototype.getName = function () {
	return this.name
}

function pokeInfo(color, type) {
	if (!this.getName) return 'bind by new'
	const str = `${this.getName()} is ${color} and type is ${type}`
	console.log(str)
	return str
}

test('myNew', () => {
	const Pika = myNew(Pokemon, 'pika')
	expect(Pika).toBeInstanceOf(Pokemon)
})

test('myCall', () => {
	const name = 'pika'
	const Pika = myNew(Pokemon, name)
	const color = 'yellow',
		type = 'ELECTRIC'
	expect(pokeInfo.myCall(Pika, color, type)).toMatch(
		`${name} is ${color} and type is ${type}`
	)
})

test('myApply', () => {
	const name = 'pika'
	const Pika = myNew(Pokemon, name)
	const color = 'yellow',
		type = 'ELECTRIC'
	expect(pokeInfo.myApply(Pika, [color, type])).toMatch(
		`${name} is ${color} and type is ${type}`
	)
})

test('myBind', () => {
	const name = 'pika'
	const Pika = myNew(Pokemon, name)
	const color = 'yellow',
		type = 'ELECTRIC'
	const bindPokeInfo = pokeInfo.myBind(Pika)
	expect(bindPokeInfo()).toMatch(`${name} is undefined and type is undefined`)
	expect(bindPokeInfo(color, type)).toMatch(
		`${name} is ${color} and type is ${type}`
	)

	const newBindPokeInfo = pokeInfo.myBind(Pika)
	expect(new newBindPokeInfo()).toBeInstanceOf(pokeInfo)
})
