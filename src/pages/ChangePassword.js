import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import authservice from '../services/authservice';
import { Avatar, Typography, Paper, TextField, Button } from '@mui/material';

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
  textField: {
    marginButtom: '8px',
  },
  submitButton: {
    marginTop: '16px',
  },
});

const sampleUserData = {
  username: 'john_doe',
  avatarUrl: 'https://via.placeholder.com/100', // Replace with your actual image URL
};
function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
const ChangePassword = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  let query = useQuery();
  const [pass, setpass] = React.useState('');
  const [confpasss, setconfpass] = React.useState('');
  const Reset=async ()=> {
    let a= await authservice.reset(query.get("email"),pass,confpasss,query.get("token").replaceAll(' ','+'))
    if (a.status==200) {
      console.log("done")
      navigate("/")
  } else {
    console.log("error")
  }
  }
  return (
    <Paper className={classes.root}>
      <Avatar className={classes.avatar} src={sampleUserData.avatarUrl} alt="User Avatar">
        {sampleUserData.username.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h6">Change Password</Typography>
      <form className={classes.form}>
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          onChange={(e)=>setpass(e.target.value)}
          className={classes.textField}
          // Add any necessary event handlers and state here
        />
        <TextField
          label="Confirm New Password"
          type="password"
          onChange={(e)=>setconfpass(e.target.value)}
          variant="outlined"
          className={classes.textField}
          // Add any necessary event handlers and state here
        />
        <Button onClick={Reset} variant="contained" color="primary" className={classes.submitButton} >
          Change Password
        </Button>
      </form>
    </Paper>
  );
};

export default ChangePassword;