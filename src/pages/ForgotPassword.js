import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import authservice from '../services/authservice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Avatar, Typography, Paper, TextField, Button } from '@mui/material';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: '16px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    backgroundColor: '#3f51b5',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap:"10px"
  },
  header:{
    marginBottom:"16px"
  },
  textField: {
    marginButtom: '8px',
  },
  submitButton: {
    marginTop: '16px',
  },
});

const sampleUserData = {
  username: 'john_doe',
  avatarUrl: 'https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=740&t=st=1690007071~exp=1690007671~hmac=d8877bf36e279483440cab6956e4d5586bb7f862b3598f9839864d3c82199eee', // Replace with your actual image URL
};
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("success");
    const [message, setMessage] = React.useState(false);

  const classes = useStyles();
  const [email, setemail] = React.useState('');
  const Forgot=async ()=> {
    let a= await authservice.forgot(email)
    if (a.status==200) {
        setType("success")
        setMessage("E-Mail Sent")
        navigate("/")
    } else {
        setType("error")
        setMessage("E-Mail Not Found")
    }
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Paper className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
      <Avatar className={classes.avatar} src={sampleUserData.avatarUrl} alt="User Avatar">
        {sampleUserData.username.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h6">Forgot Password</Typography>
      <form className={classes.form}>
        <TextField
          label="E-Mail"
          type='email'
          variant="outlined"
          onChange={(e)=>setemail(e.target.value)}
          className={classes.textField}
          // Add any necessary event handlers and state here
        />
        <Button onClick={Forgot} variant="contained" color="primary" className={classes.submitButton} >
          Send Mail
        </Button>
      </form>
    </Paper>
  );
};

export default ForgotPassword;