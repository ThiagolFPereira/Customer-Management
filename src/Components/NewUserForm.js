import React from 'react';
import InputMask from 'react-input-mask';

const NewUserForm = props => {

    const { handleInputChange, submitNewUser, currentUser } = props
    const name = currentUser.name
    const email = currentUser.email
    const phone = currentUser.phone
    const latitude = currentUser.latitude
    const longitude = currentUser.longitude
  
    return (
        <form onSubmit={submitNewUser}>
            <label>Name</label>
            <input
                type="text"
                id="name"
                placeholder="Example Name"
                onChange={(e) => handleInputChange(e)}
                value={name}
            />
            <label>Email</label>
            <input
                type="text"
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => handleInputChange(e)}
                value={email}
            />
            <label>Phone</label>
            <InputMask
                mask="(99) 99999-9999"
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginRight: '7px'
                }}
                maskChar="_"
                placeholder="Enter phone number"
                id="phone"
                value={phone}
                onChange={(e) => handleInputChange(e)}
            />
            <label>Latitude</label>
            <input
                type="text"
                id="latitude"
                placeholder="Latitude"
                onChange={handleInputChange}
                value={latitude}
            />
            <label>Longitude</label>
            <input
                type="text"
                id="longitude"
                placeholder="Longitude"
                onChange={handleInputChange}
                value={longitude}
            />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default NewUserForm;