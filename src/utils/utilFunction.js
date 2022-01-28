/* eslint-disable no-useless-escape */

export const resStatus = (req, res, data, code = 200) => res.send({
	data,
	code,
	success: true,
});

// error function
export const resError = (req, res, data, code = 500) => res.send({
	data,
	code,
	success: false,
	// errorMessage: ,
});

export const validateEmail = (email) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email)
};
