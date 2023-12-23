module.exports = {
	checkForbiddenString(value, forbiddenString) {
		if (value === forbiddenString) {
			throw new Error(`Company name '${forbiddenString}' is forbidden`);
		}
	},
};
