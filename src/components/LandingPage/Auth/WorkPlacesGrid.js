import { Box, Typography,Button, Modal,TextField } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createWorkplace } from '../../redux/Slices/Workplaceslice';
import {Card,CardContent,CardActionArea} from "@mui/material";
import {Grid} from "@mui/material";
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
export default function WorkPlacesGrid(props){
  const dispatch=useDispatch();
  const createworkplace=()=> {
    handleClose();
    dispatch(createWorkplace({title:title,desc:desc}))
  }
  const [title, settitle] = React.useState('');
  const [desc, setdesc] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return  (
  <div>
    <Box sx={{ flexGrow: 1,marginTop:"50px",border:0 }}>
      <Card sx={{ minWidth: 275}} >
        <CardContent>
          <Typography variant="h5" component="div" sx={{marginBottom:"25px"}}>
            Workplaces
          </Typography>
          <Grid container>
            {props.insid}
            <Grid item xs={12} md={2}>
              <Card>
                <CardActionArea onClick={()=>{handleOpen()}}>
                  <CardContent>
                    <Typography sx={{padding:"12.5px"}}>Click To Create Workplace</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Modal
                open={open}
                onClose={handleClose}
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
                onClick={createworkplace}
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              Create Workplace
            </Button>
          </Box>
              </Modal>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </div>)

}