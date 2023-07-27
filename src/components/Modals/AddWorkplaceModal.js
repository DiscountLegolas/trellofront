import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { createWorkplace } from '../../redux/Slices/Workplaceslice';
import { Box, Typography,Button, Modal,TextField} from "@mui/material";
export default function AddWorkplaceModal({open,callback}){
    const item= {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
      }
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const dispatch=useDispatch();
    const [title, settitle] = React.useState('');
    const [desc, setdesc] = React.useState('');
    const createworkplace=()=> {
        dispatch(createWorkplace({title:title,desc:desc}))
        callback();
      }
    const close=()=>{
      callback();
      console.log(open)
    }
    return(
        <Modal
                open={open}
                onClose={close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create Workplace
                </Typography>
                <div>
                  <img 
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  sx
                    />
                </div>
                
                <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e)=>settitle(e.target.value)}
                id="title"
                label="Title"
                name="Title"
                autoFocus
                />
              <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e)=>setdesc(e.target.value)}
              name="description"
              label="description"
              type="text"
              id="description"
              />
              <Button
                onClick={()=>{createworkplace()}}
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              Create Workplace
            </Button>
          </Box>
              </Modal>
    )
}