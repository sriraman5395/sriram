import React from 'react';
import {useState,useRef,useEffect} from "react";
import "./Signup.css"
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';


const Signup = () => {
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[error,setError]=useState(false)
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[passwordError,setPasswordError]=useState(false)
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        // Check if the form is valid
        if (email && lastName && firstName) {
          setIsValid(true);
        }else if(password && !passwordError){
            setIsValid(true);
        } 
        
        else {
          setIsValid(false);
        }
      }, [password, passwordError] );
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(firstName.length===0||lastName.length===0){
            setError(true);
        }
        if(firstName&&lastName){
            console.log("Firstname:",firstName,"/nLastname:",lastName)
        }
        console.log(firstName,lastName)

        //email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
       
        if (!emailRegex.test(email)) {
          setError('Invalid email address');
          return;
         
        }
        
        setError('');
    

        //password validation
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

//   const validatePassword = (event) => {
//     setPassword(event.target.value);
//     if (!passwordRegex.test(event.target.value)) {
//       setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character');
//     } else {
//       setPasswordError('');
//     }
//   };
      
            
    }

    //emailjs
    const form = useRef(null);

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('gmail', 'template_tm85ror', form.current, '8A9plV5uaxFJvcGXK')
        .then((result) => {
            console.log(result.text);
            console.log("message sent")
            e.target.reset();
            
            
        }, (error) => {
            console.log(error.text);
            
        });

       
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const validatePassword = (e) => {
      setPassword(e.target.value);
      if (!passwordRegex.test(e.target.value)) {
        setPasswordError('Password must contain at least 8 characters');
      } else {
        setPasswordError('');
      }
    };
  return (
    <>
     <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(e);
      sendEmail(e);
     
      
      
    }} ref={form} >
       
        <div>
          <label for='fname' className='lab'>FirstName</label>
            <input id='fname' placeholder='enter your firstname' onChange={e=>setFirstName(e.target.value)} name="firstName"/>
        </div>
        {error&&firstName.length<=0?
        <label>First name cant be empty</label>:""}
        <div>
        <label for='lname' className='lab'>LastName</label>
            <input id='lname' placeholder='enter your lastname' onChange={e=>setLastName(e.target.value)} name="lastName"/>
        </div>
        {error&&lastName.length<=0?
        <label>Last name cant be empty</label>:""}
          <div>
          <label for='email' className='lab'>Email id  </label>
            <input id='email' type="email" placeholder='enter your email'   onChange={e=>setEmail(e.target.value)} name="email"/>
        </div>
        <div>
          <label for='password' className='lab'>Password  </label>
            <input id='password' type="password" placeholder='enter your password'  onChange={validatePassword}name="password"/>
             {passwordError && <p>{passwordError}</p>}
           
        </div>
        
        <label>{error}</label>
        {isValid && (
        <Link to="/signup"> 
        <button type='submit'>Submit</button>
       </Link>)}
   
    </form>
    
    </>

    
  )
}

export default Signup