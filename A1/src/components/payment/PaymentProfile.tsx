import React, { useState } from 'react';
import InputText from '../InputText';

function PaymentDetails() {
    // State to hold the ExpirationDate value
    const [ExpirationDate, setExpirationDate] = useState('');

    const handleExpirationDateChange = (newExpirationDate: string) => {
        setExpirationDate(newExpirationDate);
    }

    // State to hold the CardNumber value
    const [CardNumber, setCardNumber] = useState('');

    const handleCardNumberChange = (newCardNumber: string) => {
        setCardNumber(newCardNumber);
    }

    // State to hold the CardNumber value
    const [cvc, setCvc] = useState('');

    const handleCvcChange = (newCvc: string) => {
        setCvc(newCvc);
    }

    // Add other form handling logic as necessary
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Expiration Date: ", ExpirationDate);
        console.log("Card Number: ", CardNumber);
        console.log("cvc: ", cvc);
        // Additional submit logic here
    }

    return (
        <div className="">
            <h2 className="font-bold text-lg mb-4">Payment details</h2>

            <InputText name='CardNumber' type='text' label={true} required={true} placeholder='Card Number' onChange={handleCardNumberChange} />
            <div className="flex gap-4">
                <div>
                    <InputText name='ExpirationDate' type='text' label={true} required={true} placeholder='Expiration Date' onChange={handleExpirationDateChange} />
                </div>
                <div>
                    <InputText name='CVC' type='text' label={true} required={true} placeholder='CVC' onChange={handleCvcChange} />
                </div>
            </div>
        </div>
    );
}

export default PaymentDetails;
