import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material/styles';
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
      anger: createColor('#F40B27'),
      blackish:createColor('#606060'),
      apple: createColor('#5DBA40'),
      steelBlue: createColor('#5C76B7'),
      violet: createColor('#BC00A3'),
    },
  });
  return theme;
}