import React from 'react';
import Button from '@mui/material/Button';
import styles from '../../../styles/Home.module.css';
import MainPageAppBar from './navbar';
import { Box,Typography,Stack,Container, TextField } from '@mui/material';
export default function NoAuth(){
    return <div>
      <MainPageAppBar>
      </MainPageAppBar>

      <main>
      <Box
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <div className="landing-back" maxWidth="sm" style={{display:"flex",paddingLeft:"25px",paddingRight:"25px"}}>
          <div>
          <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Trello brings all your tasks, teammates, and tools together.
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Keep everything in the same place—even if your team <br></br>isn’t.
          </Typography>
          <Container sx={{width:"fit-content",display:"flex",justifyContent:"center"}} >
            <TextField id="outlined-basic" label="E-mail" variant="outlined" />
            <Button style={{marginLeft:"15px",textTransform:"none"}} variant="contained">Sign up - it’s free!</Button>
          </Container>
          </div>
          <div>
            <img width="100%" src='/TrelloUICollage_4x.png' />
          </div>
          </div>
        </Box>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
}