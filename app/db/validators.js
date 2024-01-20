module.exports = {
	checkForbiddenString(value, forbiddenString) {
		if (value === forbiddenString) {
			throw new Error(`Company name '${forbiddenString}' is forbidden`);
		}
	},

	validateEmail(email) {
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return emailRegex.test(email);
	},
};
