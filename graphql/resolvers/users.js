const User = require('../../models/User')
const { hash, compare } = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')
const { SECRET_KEY } = require('../../config.js')

function generateToken(user){
	return jwt.sign({
		id: user.id,
		email: user.email,
		userName: user.userName
	}, SECRET_KEY, { expiresIn: '1h'})
}

module.exports = {
	Query: {
		async getUsers() {
			try{
				const users = await User.find()
				return users
			} catch (err) {
				throw new Error(err)
			}
		}
	},
  Mutation: {
		async login(_, { userName, password }) {
			const { errors, valid } = validateLoginInput(userName, password)

			if(!valid){
				throw new UserInputError('errors', { errors })
			}

			const user = await User.findOne({ userName })

			if (!user) {
				errors.general = 'user not found'
				throw new UserInputError('user not found', { errors })
			}

			const match = await compare(password, user.password)

			if (!match) {
				errors.general = 'wrong credentials'
				throw new UserInputError('wrong credentials', { errors })
			}

			const token = generateToken(user)

			return {
				...user._doc,
				id: user.id,
				token
			}
		},

		async register(_, { registerInput: {
			userName, email, password, confirmPassword
		}}) {
			const { valid, errors } = validateRegisterInput(userName, email, password, confirmPassword)

			if (!valid) {
				throw new UserInputError('errors', { errors })
			}

			const user = await User.findOne({ userName })

			if (user) {
				throw new UserInputError('userName is taken', {
					errors: {
							userName: 'userName is taken'
					}
				})
			}

			password = await hash(password, 12)

			const newUser = new User({
				email,
				userName,
				password,
				createdAt: new Date().toISOString()
		})

		const res = await newUser.save()

		const token = generateToken(res)

		return {
			...res._doc,
			id: res.id,
			token
		}
		}
	}
}