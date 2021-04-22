const gql = require('graphql-tag')

module.exports = gql`
	type User {
		id: ID!
		email: String!
		token: String!
		userName: String!
		createdAt: String!
	}

	input RegisterInput {
		userName: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Mutation{
		register(registerInput: RegisterInput): User!
		login(userName: String!, password: String!): User!
	}
`