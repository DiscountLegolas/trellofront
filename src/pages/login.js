import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import AuthService from '../services/authservice'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import classes from '../styles/Home.module.css'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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
  const navigate = useNavigate();
  const [open, setOpen] = React.useState('none');
  const [message, setMessage] = React.useState('false');

  const handleSubmit = (event) => {
    event.preventDefault();
    loguser();
  };

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
          navigate("/");
        }
       })
       .catch((err) => {

          console.log(err.message);
       });
  };

  return (
    <div className={classes.loginflex}>
    <div className={classes.loginflexsub1}>
    
    </div>
    <div style={styles.papercontainer} className={classes.loginflexsub2
    }>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor:"#8B0000",
              padding:"20px"
            }}
          >
              <Icon className={classes.spane}>
                <img style={styles.imageIcon} src="../static/trello-logo-blue.svg"/>
              </Icon>
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
                <ListItemButton>
                  <ListItemText primary="Forgot password?" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary="Don't have an account? Sign Up" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    <div className={classes.loginflexsub3}>
    
    </div>
    </div>
  );
}