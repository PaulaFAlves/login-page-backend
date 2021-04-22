const { ApolloServer } = require('apollo-server')
const moongose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')

const PORT = process.env.PORT || '5000'

const server = new ApolloServer({
	typeDefs,
	resolvers
})

moongose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('MongoDB Connected')
		return server.listen({ port: PORT })
	})
	.then(res => {
		console.log('server running');
	})
	.catch(err => {
		console.log(err)
	})
