import React from "react";

interface InputTextareaProps {
	label: string,
	_id: string,
	value: string,
	onChange: () => void
}

const InputText = ({ label, _id, value, onChange } : InputTextareaProps) => {
	return <>
		<div 
			className="form-field" 
			id={_id} 
		>
			<div className="form-label optimizedCheckout-form-label">
				<strong>{label}</strong>
			</div>
			<input 
				className="form-input optimizedCheckout-form-input" 
				defaultValue={value} 
				name={_id}
				onChange={onChange}
				type="text"
			/>
		</div>
	</>
}

export default InputText;