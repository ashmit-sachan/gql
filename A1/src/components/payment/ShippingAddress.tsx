import React, { useState } from 'react';
import InputText from '../InputText';

function ShippingAddress() {
    // State to hold the StreetAddress value
    const [streetAddress, setStreetAddress] = useState('');

    const handleStreetAddressChange = (newStreetAddress: string) => {
        setStreetAddress(newStreetAddress);
    }

    // State to hold the City value
    const [city, setCity] = useState('');

    const handleCityChange = (newCity: string) => {
        setCity(newCity);
    }

    // Add other form handling logic as necessary
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("StreetAddress: ", streetAddress);
        console.log("City: ", city);
        // Additional submit logic here
    }

    return (
        <div className="mb-6">
            {/* <h2 className="font-bold text-lg mb-4">Shipping address</h2> */}
            <InputText name='StreetAddress' type='text' label={true} autoComplete='StreetAddress' required={true} placeholder='StreetAddress' onChange={handleStreetAddressChange} />
            <div className="flex gap-3 mt-3">
                <InputText name='City' type='text' label={true} required={true} placeholder='City' onChange={handleCityChange} />
                <InputText name='State' type='text' label={true} required={true} placeholder='State / Prov' onChange={handleCityChange} />
                <InputText name='Pin' type='text' label={true} required={true} placeholder='Post Code' onChange={handleCityChange} />
            </div>
        </div>
    );
}

export default ShippingAddress;
