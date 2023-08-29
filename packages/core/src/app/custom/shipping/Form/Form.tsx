import React from 'react';

import InputRadio from "./InputRadio";
import InputText from "./InputText";
import InputTextarea from "./InputTextarea";

const Form = (props: any) => {
	let component;

	switch (props.type) {
		case 'textarea':
			component = <InputTextarea { ...props} />;
			break;

		case 'radio':
			component = <InputRadio { ...props} />;
			break;

		case 'text':
			component = <InputText { ...props} />;
			break;

		default:
			component = null;
	}

	return (
		<> {component} </>
	);
};

export default Form;