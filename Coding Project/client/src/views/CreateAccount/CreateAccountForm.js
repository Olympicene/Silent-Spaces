import React, {useState} from "react";
import { Link } from "react-router-dom";
import InputBox from "../../components/InputBox/InputBox";
import Button from "../../components/Button/Button"

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

            <div id="side-by-side">
              <InputBox features={{id:"fname", name:"first_name", type:"text", placeholder:"First Name"}} change={handleChange} 
                        style={{backgroundColor: "#BBCEAE", color: "#181D27", border: "1px solid #BBCEAE"}}/>

              <InputBox features={{id:"lname", name:"last_name", type:"text", placeholder:"Last Name"}} change={handleChange}
                            style={{backgroundColor: "#BBCEAE", color: "#181D27", border: "1px solid #BBCEAE"}}/>

            </div>

            <InputBox features={{id:"user", name:"username", type:"text", placeholder:"Username"}} change={handleChange}
                                        style={{display : "block", backgroundColor: "#BBCEAE", color: "#181D27", border: "1px solid #BBCEAE"}}/>

            <InputBox features={{id:"email", name:"email", type:"email", placeholder:"Email"}} change={handleChange}
                                        style={{display : "block", backgroundColor: "#BBCEAE", color: "#181D27", border: "1px solid #BBCEAE"}}/>

            <InputBox features={{id:"password", name:"password", type:"password", placeholder:"Password"}} change={handleChange} 
                                        style={{display : "block", backgroundColor: "#BBCEAE", color: "#181D27", border: "1px solid #BBCEAE"}}/>


            <Button type="submit" theme="contrast" style={{width : "70%", marginTop: "20px"}}> Register</Button>

            {!success && <p>{errors}</p>}
            {success && <h3>SUCCESS Please navigate to the <Link to="/log-in">login</Link> </h3>}
        </form>
    );
  };
  
  export default RegistrationForm;