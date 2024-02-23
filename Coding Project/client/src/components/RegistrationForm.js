import React, {useState} from "react";
import { Link } from "react-router-dom";


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      username: '',
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
        const response = await fetch('http://localhost:5005/v1/auth/register', {
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


          throw new Error('Registration failed');
        }
  
        const data = await response.json();
        console.log(data);
        setSuccess(true)

      } catch (error) {
        console.error('Error:', error);
        
      }
    };
  
    return (
        <form onSubmit={handleSubmit}>

            <div id="uname">
                <input type="text" id="fname" size="10" name="first_name" placeholder="First Name" defaultValue={formData.first_name} onChange={handleChange}/>
                <input type="text" id="lname" size="11" name="last_name" placeholder="Last Name" defaultValue={formData.last_name} onChange={handleChange}/>
            </div>

            <input type="text" id="user" size="30" name="username" placeholder="Username" defaultValue={formData.username} onChange={handleChange}/>

            <input type="text" id="email" size="30" name="email" placeholder="Email" defaultValue={formData.email} onChange={handleChange}/>

            <input type="password" id="password" size="30" name="password" placeholder="Password" defaultValue={formData.password} onChange={handleChange}/>

            <button type="submit" className= "green-button">Create Account</button>

            <p>{errors}</p>
            {success && <h3>SUCCESS Please navigate to the <Link to="/log-in">login</Link> </h3>}
        </form>
    );
  };
  
  export default RegistrationForm;

//   <form>

//   <input type="password" id="password" size="30" name="password" placeholder="Password"/>
//   <div>
//       <input type="checkbox" id="ageLimit" name="ageLimit"/>
//       <label for="scales">I agree that I am 13 years old or above</label>
//   </div>
//   <Link to="/menu">
//       <input type="submit" class= "green-button" value="Create Account"/>
//   </Link>
// </form>