import { useEffect } from 'react';
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material/styles';

export const useOutsideAlerter=(ref,callback)=> {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
const requireAuth = () => {
    if(!localStorage.getItem('token')) {
      // go to login route
    }
    // stay on this route since the user is authenticated
  }
const verifyAuth = () => {
    if(localStorage.getItem('token')) {
      // go to your dashboard or home route
    }
    // stay on this route since the user is not authenticated
  }
export const getcolors=()=>{
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      primary: {
        main: '#556B2F',
      },
      anger: createColor('#F40B27'),
    },
  });
  return theme;
}