import { debounce } from 'lodash';
import React from "react";

interface InputTextareaProps {
	label: string,
	_id: string,
	value: string,
	onChange: (e: any) => void
}

const InputTextarea = ({ label, _id, value, onChange } : InputTextareaProps) => {
	return <>
		<div 
			className="form-field" 
			id={_id} 
		>
			<div className="form-label optimizedCheckout-form-label">
				<strong>{label}</strong>
			</div>
			<textarea 
				className="form-input optimizedCheckout-form-input" 
				defaultValue={value}
				name={_id}
				onChange={debounce((e) => {
					onChange(e);
				}, 1000)}
				rows={3}
			/>
		</div>
	</>
}

export default InputTextarea;