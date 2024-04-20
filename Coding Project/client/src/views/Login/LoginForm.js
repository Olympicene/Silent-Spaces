import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox/InputBox";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [errors, setErrors] = useState('');
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      console.log(JSON.stringify(formData))

      try {
        const response = await fetch('http://localhost:5005/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });
  
        if (!response.ok) {
          let res = await response.json()
          console.log(res)

          if ('error' in res) {
            // validator error
            setErrors(res.error['undefined'])
          } else {
            // account error
            setErrors(res.message)
          }

          throw new Error('Login failed');
        }
  
        const data = await response.json();
        navigate('/home')

      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    require('./Login.css')
    return (
        <form onSubmit={handleSubmit}>
            <InputBox features={{id:"email", name:"email", type:"text", placeholder:"Email"}} 
            change={handleChange} 
            style={{display : "block", backgroundColor: "#F2F1DC", color: "#254D32"}}/>
            <InputBox features={{id:"password", name:"password", type:"password", placeholder:"Password"}} 
            change={handleChange} 
            style={{display : "block", backgroundColor: "#F2F1DC", color: "#254D32", marginBottom : "4rem"}}/>
        
            <div className='button-div'>
                <button className='forgot-pw-button'>Forgot your Password?</button>
                <button type="submit" className='login-button'>Log in</button>
                {<p>{errors}</p>}
            </div>
            
        </form>
  );
}
  
  export default Login;