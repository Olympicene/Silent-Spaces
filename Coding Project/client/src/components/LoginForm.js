import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      

      console.log(JSON.stringify(formData))

      try {
        const response = await fetch('http://localhost:5005/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
        console.log(data);
        navigate('/menu')

      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
        <form onSubmit={handleSubmit}>
            <div className='login-input'>
                <input id="first-name" 
                    name="email"
                    type="text" 
                    placeholder="Email" 
                    onChange={handleChange}/>
                <input id="first-name" 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                    style={{marginBottom : "4rem"}}/>
            </div>
        
            <div className='button-div'>
                <button className='forgot-pw-button'>Forgot your Password?</button>
                <button type="submit" className='login-button'>Log in</button>
                {!(success) && <p>{errors}</p>}
            </div>

            
        </form>
  );
}
  
  export default Login;