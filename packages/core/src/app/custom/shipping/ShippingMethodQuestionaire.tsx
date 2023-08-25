import React, { useState } from 'react';

const QUESTIONS = {
    isShippingCommercialOrResidential : 'Is your shipping address commercial or residential?',
    requiresLifeGate : 'Do you require a lift gate?',
    requiresDeliveryAppointment: 'Do you require a delivery appointment?',
    deliveryAppointmentContactInformation: 'Delivery Appointment Contact Information',
    whatAreYourReceivingDaysAndHours: 'What are your receiving days and hours?'
};

const ShippingMethodQuestionaire = () => {
	const [state, setState] = useState({});

	const handleInputChanged = (e: any) => {
		console.log(e.target.name)
		console.log(state)
		console.log(setState)
	};

	return <>
		<div id="freight-custom">
            <div className="form-field" >
                <div className="form-label optimizedCheckout-form-label">
                    <strong>{QUESTIONS.isShippingCommercialOrResidential}</strong>
                </div>
                <div className="flex-centered">
                    <input
                        id="commercial" 
                        name="shipping_address_type" 
                        onChange={handleInputChanged}
                        type="radio"
						value="commercial"
                    />
                    <label htmlFor="commercial">Commercial</label>
                </div>
                <div className="flex-centered">
                    <input 
                        id="residential" 
                        name="shipping_address_type" 
                        type="radio" 
                        value="residential"
                    />
                    <label htmlFor="residential">Residential</label>
                </div>
            </div>
            <div className="form-field" >
                <div className="form-label optimizedCheckout-form-label">
                    <strong>{QUESTIONS.requiresLifeGate}</strong>
                </div>
                <div className="flex-centered">
                    <input 
                        id="yes_lift_gate" 
                        name="require_lift_gate" 
                        type="radio"
                        value="yes"
                    />
                    <label htmlFor="yes_lift_gate">Yes (I do not have a forklift or loading dock to get a pallet off a semi-truck)</label>
                </div>
                <div className="flex-centered">
                    <input 
                        id="no_lift_gate" 
                        name="require_lift_gate" 
                        type="radio" 
                        value="no"
                    />
                    <label htmlFor="no_lift_gate">No</label>
                </div>
            </div>
            <div className="form-field" >
                <div className="form-label optimizedCheckout-form-label">
                    <strong>{QUESTIONS.requiresDeliveryAppointment}</strong>
                </div>
                <div className="flex-centered">
                    <input 
                        id="yes_delivery_appointment" 
                        name="delivery_appointment" 
                        type="radio" 
                        value="yes"
                    />
                    <label htmlFor="yes_delivery_appointment">Yes</label>
                </div>
                <div className="flex-centered">
                    <input 
                        id="no_delivery_appointment" 
                        name="delivery_appointment" 
                        type="radio" 
                        value="no"
                    />
                    <label htmlFor="no_delivery_appointment">No</label>
                </div>
            </div>
            <div 
                className="form-field" 
                id="contact-information-delivery" 
            >
                <div className="form-label optimizedCheckout-form-label">
                    <strong>{QUESTIONS.deliveryAppointmentContactInformation}</strong>
                </div>
                <textarea 
                    className="form-input optimizedCheckout-form-input" 
                    name="delivery_appointment_contact_information" 
                    rows={3} />
            </div>
            <div className="form-field">
                <div className="form-label optimizedCheckout-form-label">
                    <strong>{QUESTIONS.whatAreYourReceivingDaysAndHours}</strong>
                </div>
                <textarea 
                    className="form-input optimizedCheckout-form-input" 
                    name="receiving_days_hours" 
                    rows={3} />
            </div>
        </div>
	</>
}

export default ShippingMethodQuestionaire;