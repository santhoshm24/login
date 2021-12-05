import { useState,useEffect } from "react";
import "./App.css";

function App()
{
    const initialValues = { username: "",email: "",password:""};
    const [ formValues,setFormValues]= useState(initialValues);
    const[formErrors, setFormErrors] = useState({});
const [isSubmit,setIsSubmit] = useState(false);
 
    const handleChange=(e)  => {
console.log(e.target);
const{name,value}=e.target;
setFormValues({ ...formValues, [name]: value });
console.log(formValues);
    };
    
        const handleSubmit= (e) =>  {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
};

useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit){
        console.log(formValues);
    }
}, [formErrors]);
const validate =(values)  => {
const errors= {};
const regex= /^[^\s@]+@[^\s@]=\.[^\s@]{2,}$/i;
if(!values.username) {
    errors.username="username is required!"  ;
    if(!values.email){
        errors.username= " email is required!" ;
    }else if(!regex.test(values.email)) {
        errors.email= "this is not a valid email format!" ;
    }
    if(!values.password) {
        errors.username =" password is required" ;
    }else if (values.password.length < 4) {
    errors.password="password must be more than 4 characters" ;
    }else if(values.password.length > 10){
        errors.password="password cannot exceed more than 10 characters";
    }
return errors ;
};

 return
(
    <div className="container">
    {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="ui message success">Signed in successfully </div> ) : ( <pre> {JSON.stringify(formValues,undefined, 2)}</pre> )}
    
    
    <form  onSubmit={handleSubmit}>
    <h1>  Login Form </h1>
    <div className="ui divider"></div>
    <div className="ui form">
        <div className="field">
<label>username</label>
<input 
type= 'text' 
name="username"
 placeholder="username" 
 value={ formValues.username}
    onChange={handleChange}
/>
 </div>
 <p>{ formErrors.username}</p>
 <div className="field">
<label>Email</label>
<input type="email"
 name="email"
  placeholder="email"
   value={formValues.email}
       onChange={handleChange}
   />
</div>
<p> { formErrors.email}</p>
<div className="field">
    <label>password</label>
    <input type="password"
     name="password"
      placeholder="password" 
      value={formValues.password}
      onChange={handleChange}
      />
</div>
<button className="fluid ui button blue"> Submit</button>
    </div>
    </form>
   };
   } 
