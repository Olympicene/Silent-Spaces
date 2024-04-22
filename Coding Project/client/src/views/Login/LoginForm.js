import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Person from '@mui/icons-material/Person';
import styles from "./Login.module.css"

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
    });

    const [errors, setErrors] = React.useState('');
  
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
        navigate('/home')

      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <main className={styles['login']}>
        <CssBaseline />
        <Sheet
          sx={{
            width: 600,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 6, // padding top & bottom
            px: 6, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h1" component="h1">
              <b>Welcome to Silent Spaces!</b>
            </Typography>
            <Typography level="body-md">Sign in to continue.</Typography>
          </div>
          <FormControl
            size = "lg">
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              // js
              onChange={handleChange} 
            />
          </FormControl>
          <FormControl
            size = "lg">
            <FormLabel>Password</FormLabel>
            <Input 
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              // js
              onChange={handleChange} 
            />
          </FormControl>
          <Button onClick={handleSubmit} sx={{ mt: 1, /* margin top */ }}>Log in</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>

          {errors && 
          <Typography
            fontSize="sm"
            sx={{ alignSelf: 'center',
                  color: 'red' }}
          >
              {errors}
          </Typography>}
        </Sheet>
      </main>
    );
}
  
  export default Login;