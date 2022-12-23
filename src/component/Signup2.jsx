import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
// import './Signup.css'
import './Signup2.css'
import { Link } from 'react-router-dom';



const Signup2 = () => {
    const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [dob, setDOB] = useState('');
  const [dobError, setDOBError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isValid, setIsValid] = useState(false);
  

  const phoneNumberRegex = /^\d{10}$/;

  const addressRegex = /^\d+\s[A-z]+\s[A-z]+\s[A-z]+/;


  

  const imageRegex = /\.(jpeg|jpg|gif|png)$/;

  useEffect(() => {
    // Check if the form is valid
    if (phoneNumber && !phoneNumberError) {
      setIsValid(true);
    }else if(profilePicture && !profilePictureError){
        setIsValid(true);
    } 
    
    else {
      setIsValid(false);
    }
  }, [phoneNumber, phoneNumberError]);


  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleProfilePictureChange = (event) => {
    setProfilePictureURL(URL.createObjectURL(event.target.files[0]));
    setProfilePicture(event.target.files[0]);
  };
  const handleDOBChange = (event) => {
    const date = event.target.value;
    const dateObject = new Date(date);
    if (isNaN(dateObject.getTime())) {
      setDOBError('Invalid date. Please enter a valid date.');
    } else {
      setDOB(date);
      setDOBError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authenticate();
    if (!profilePicture) {
      setProfilePictureError('Please select a profile picture.');
    } else if (!imageRegex.test(profilePicture.name)) {
      setProfilePictureError('Invalid file type. Please select an image file (JPEG, JPG, GIF, or PNG).');
    } else if (profilePicture.size > 2000000) {
      setProfilePictureError('File size too large. Please select an image file under 2MB.');
    } else {
      // Profile picture is valid, submit the form
    }
    
        
        event.preventDefault();
        if (!addressRegex.test(address)) {
          setAddressError('Invalid address. Please enter a valid address.');
        } else {
          // Address is valid, submit the form
        }
        event.preventDefault();
        if (!phoneNumberRegex.test(phoneNumber)) {
          setPhoneNumberError('Invalid phone number. Please enter a valid phone number.');
        } else {
          // Phone number is valid, submit the form
        }
        const authenticate = () => {
            event.preventDefault();
        localStorage.setItem('profilePicture', profilePicture);
        localStorage.setItem('dob', dob);
        localStorage.setItem('address', address);
        localStorage.setItem('phonenumber', phoneNumber);
          };
         

         
        
        
      
  };
  return (
    <>
    <form onSubmit={handleSubmit}  >
        <div>
        <label className='lab' id='lab'>Please provide all information only<br/> then submit button will appear</label>
           
      
    <label className='lab'>Profile photo</label>
       <input className='choose' type="file" name="profilePicture" accept="image/*" onChange={handleProfilePictureChange} />
       {profilePictureURL && <img src={profilePictureURL} alt="Profile picture preview" />}
      {profilePictureError && <p>{profilePictureError}</p>}
      </div>
       
      
       <div>

       <label className='lab'>Date of birth</label>
        
        <input type="date" name="dob" value={dob} onChange={handleDOBChange} />
      
      {dobError && <p>{dobError}</p>}
       </div>
      
    
     
         <div>
         <label for='address' className='lab'>Address  </label>
           <input id='email' type="text" placeholder='enter your address' name="address" onChange={handleAddressChange}/>
           {/* {addressError && <p>{addressError}</p>} */}
       </div>
       
       <div>
         <label for='phonenumber' className='lab'>Phonenumber  </label>
           <input id='phonenumber' type="text" placeholder='enter your phonenumber'name="phonenumber"  onChange={handlePhoneNumberChange}/>
           {phoneNumberError && <p>{phoneNumberError}</p>}
          
       </div>
       
       {isValid && (
        <Link to="/puzzle"> 
        <button type='submit'>Submit</button>
       </Link>)}
  
   </form>
   
   </>
  )
}

export default Signup2