import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import { useDispatch } from "react-redux";
import { setuser } from "../redux/Slices/UserSlice";
import AuthService from '../services/authservice'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const styles={
  papercontainer:{
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    height: "100%",
    backgroundSize: 'cover',
    },
    imageIcon: {
      display: 'block',
      height: '43px',
    },
}
const theme = createTheme();

export default function SignIn() {
  document.title="Do The Deed|Login"
  const navigate = useNavigate();
  const [open, setOpen] = React.useState('none');
  const [message, setMessage] = React.useState('false');

  const handleSubmit = (event) => {
    event.preventDefault();
    loguser();
  };
  const dispatch=useDispatch()
  const [email, setemail] = React.useState('');
  const [pass, setpass] = React.useState('');
  const loguser = async () => {
    await AuthService.login(email,pass)
       .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else{
          response.text().then((a)=>{
            setMessage(a);
            setOpen('block');
          })
        }
       }).then((data)=>{
        console.log(data.token);
        if (data.token) {
          localStorage.setItem("user", JSON.stringify({email:email,accessToken:data.token,experation:data.expiration}));
          dispatch(setuser(JSON.stringify({email:email,accessToken:data.token,experation:data.expiration})));
          navigate("/");
        }
       })
       .catch((err) => {

          console.log(err.message);
       });
  };

  return (
    <Box className="login" sx={{height:"100%"}}>
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                variant="filled"
                fullWidth
                onChange={(e)=>setemail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
              autoComplete="email"
              autoFocus
              />
            <TextField
              margin="normal"
              required
              variant="filled"
              fullWidth
              onChange={(e)=>setpass(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Alert sx={{ display: open }} severity="error" variant="filled">{message}</Alert>
            <List>
              <ListItem disablePadding>
                <ListItemButton href='/Forgot'>
                  <ListItemText primary="Forgot password?" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href='/signup'>
                  <ListItemText primary="Don't have an account? Sign Up"  />
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