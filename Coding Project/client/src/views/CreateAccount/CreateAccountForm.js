import React, { useState } from "react";
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { Email, Key, Person, AccountCircleRounded } from "@mui/icons-material";
import styles from './CreateAccount.module.css'


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
      const response = await fetch('http://localhost:5005/auth/register', {
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
    <main>
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
            <b>Sign Up</b>
          </Typography>
          <Typography level="body-md">Enter the following fields to continue.</Typography>
        </div>
        <div className={styles['form-name']}>
          <FormControl
            size="lg"
            sx={{
              width: "49%"
            }}>
            <Input
              // html input attribute
              name="first_name"
              type="first_name"
              placeholder="first name"
              startDecorator={<Person />}
              // js attributes
              onChange={handleChange}

            />
          </FormControl>
          <FormControl
            size="lg"
            sx={{
              width: "49%"
            }}>
            <Input
              // html input attribute
              name="last_name"
              type="last_name"
              placeholder="last name"
              startDecorator={<Person />}
              // js attributes
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <FormControl
          size="lg">
          <Input
            // html input attribute
            name="username"
            type="username"
            placeholder="username"
            startDecorator={<AccountCircleRounded />}
            // js attributes
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          size="lg">
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="email"
            startDecorator={<Email />}
            // js attributes
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          size="lg">
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
            startDecorator={<Key />}
            // js atributes
            onChange={handleChange}
          />
        </FormControl>
        <Button onClick={handleSubmit} sx={{ mt: 1, /* margin top */ }}>Sign Up</Button>
        <Typography
          endDecorator={<Link href="/log-in">Log in</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Already have an account?
        </Typography>

        {errors &&
          <Typography
            fontSize="sm"
            sx={{
              alignSelf: 'center',
              color: 'red'
            }}
          >
            {errors}
          </Typography>}
      </Sheet>
    </main>
  );
};

export default RegistrationForm;