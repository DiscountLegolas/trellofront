import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {Paper} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import classes from '../styles/Home.module.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';

const styles={
  papercontainer:{
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    height: "100%",
    backgroundSize: 'cover',
    },
    imageIcon: {
      marginBottom:"10px",
      display: 'block',
      height: '43px',
    },
}
const theme = createTheme();
export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState('none');
  const [message, setMessage] = React.useState('false');

  const handleSubmit = (event) => {
    event.preventDefault();
    adduser();
  };
  document.title="Do The Deed|Sign Up"
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const adduser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: username,
        email: email,
        password: pass
      })
    };
    
    await fetch("https://localhost:7254/api/Account/User",requestOptions)
       .then((response) => {
        if (response.ok) {
          navigate("/");
        }
        else{
          response.text().then((a)=>{
            setMessage(a);
            setOpen('block');
          })
        }
      })
       .catch((err) => {

          console.log(err.message);
       });
  };
  return (
    <Box className="login"  sx={{height:"100%"}}>
    <div style={styles.papercontainer}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{padding:"50px"}}>
          <Paper
            sx={{
              color:"black",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor:"white",
              padding:"20px"
            }}
          >
            <img style={styles.imageIcon} src="/trello-logo-blue.svg"/>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                onChange={(e)=>setemail(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              autoComplete="email"
              autoFocus
              />
              <TextField
                margin="normal"
                onChange={(e)=>setusername(e.target.value)}
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
              autoComplete="username"
              autoFocus
              />
             <TextField
              margin="normal"
              required
              onChange={(e)=>setpass(e.target.value)}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
             />
             <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             >
              Sign Up
             </Button>
             <Alert sx={{ display: open }} severity="error" variant="filled">{message}</Alert>
             <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href='/login'>
                  <ListItemText primary="Allready have an account? Sign In"  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
    </div>
    </Box>
  );
}