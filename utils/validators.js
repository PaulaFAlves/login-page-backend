module.exports.validateRegisterInput = (
	userName, 
	email,
	password,
	confirmPassword
) => {
	const errors = {}

	if (userName.trim() === '') {
		errors.userName = 'userName must not be empty'
	}

	if (email.trim() === '') {
		errors.email = 'email must not be emptu'
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
		if (!email.match(regEx)) {
			errors.email = 'email is not valid'
		}
	}

	if (password === '') {
		errors.password = 'password must not be empty'
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'confirm password must be the same '
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1
	}
}

module.exports.validateLoginInput = (userName, password) => {
  const errors = {}

	if (userName.trim() === '') {
		errors.userName = 'userName must not be empty'
	}
	if (password.trim() === '') {
		errors.password = 'password must not be empty'
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1
}
}
