import React, { useEffect, useState } from "react";
import AuthService from '../services/authservice';
import NoAuth from '../components/LandingPage/NoAuth/noauthpage';
import Landing from '../components/LandingPage/Auth/LandingPage';


export default function Home() {
  const [user,setUser]=useState();
  useEffect(()=>{
    setUser(AuthService.getCurrentUser())
  },[])
  if (user==null) {
    return(
      <NoAuth />
    )
  } else {
    return(<Landing user={user} />)
  }
}
