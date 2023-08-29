import React from "react";


interface RadioOptionsProps {
	label: string,
	_id: string,
}

interface InputRadioProps {
	label: string,
	_id: string,
	value: string,
	options: RadioOptionsProps[],
	onChange: () => void
}

const InputRadio = ({ label, _id, value, options, onChange } : InputRadioProps) => {
	return <>
		<div className="form-field" id={_id}>
			<div className="form-label optimizedCheckout-form-label">
				<strong>{label}</strong>
			</div>

			{options.map((i) => (
				<div 
					className="flex-centered" 
					key={i._id}>
					<input 
						checked={value === i._id} 
						id={i._id}
						name={_id}
						onChange={onChange}
						type="radio"
						value={i._id}
					/>
					<label 
						htmlFor={i._id}
					>
						{i.label}
					</label>
				</div>
			))}
		</div>
	</>
}

export default InputRadio;