module.exports.validateRegisterInput = (
	userName, 
	email,
	password,
	confirmPassword
) => {
	const errors = {}

	if (userName.trim() === '') {
		errors.userName = 'UserName não pode ser nulo'
	}

	if (email.trim() === '') {
		errors.email = 'Email não pode ser nulo'
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
		if (!email.match(regEx)) {
			errors.email = 'Email inválido'
		}
	}

	if (password === '') {
		errors.password = 'Senha não pode ser nula'
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'Senha não confere'
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1
	}
}

module.exports.validateLoginInput = (userName, password) => {
  const errors = {}

	if (userName.trim() === '') {
		errors.userName = 'UserName não pode ser nulo'
	}
	if (password.trim() === '') {
		errors.password = 'Senha não pode ser nula'
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
}
}
