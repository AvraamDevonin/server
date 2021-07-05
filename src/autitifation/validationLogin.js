var validator = require("validator");

function validationLogin(user) {
	const isName = validator.isAlpha(user.name);
	const isEmail = validator.isEmail(user.email);
	const isPass = validator.isStrongPassword(user.password, {
		minLength: 8,
		minLowercase: 0,
		minUppercase: 0,
		minNumbers: 0,
		minSymbols: 0,
	});

    return isName && isEmail && isPass;
}


function validationEmailPass(user) {
 
	const isEmail = validator.isEmail(user.email);
	const isPass = validator.isStrongPassword(user.password, {
		minLength: 8,
		minLowercase: 0,
		minUppercase: 0,
		minNumbers: 0,
		minSymbols: 0,
	});

    return isEmail && isPass;
}

module.exports = {validationLogin, validationEmailPass};