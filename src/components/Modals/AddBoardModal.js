import {  useDispatch } from "react-redux";
import React,{useState} from "react";
import { makeStyles } from '@mui/styles';
import { createBoard } from '../../redux/Slices/Workplaceslice';
import { getWorkplaces } from '../../redux/Slices/Workplaceslice';
import { Box, Typography,Button, Modal,TextField,FormControl, InputLabel, Select, MenuItem} from "@mui/material";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "20px",
  },
  lbl:{
    width:"25%"
  },
  photoGallery: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  photoItem: {
    width: 200,
    margin: 10,
  },
  photo: {
    width: "400px",
    height: "320px",
    border: '1px solid #ddd',
    borderRadius: 5,
  },
  selectedphoto: {
    width: "400px",
    height: "320px"
  }
}));
const photos=["/pexels-andrei-tanase-1271620.jpg","/pexels-artem-saranin-1496372.jpg","/pexels-pixabay-235986.jpg","/pexels-todd-trapani-1420440.jpg"]
export default function AddBoardModal({open,callback,workıd}){
  const classes = useStyles();
  const [selectedPhoto, setSelectedPhoto] = useState('');

  const handleChange = (event) => {
    setSelectedPhoto(event.target.value);
  };
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
    const createboard=()=> {
        callback();
        dispatch(createBoard({title:title,workplaceıd:workıd,picurl:selectedPhoto}))
        dispatch(getWorkplaces())
      }
    return(
        <Modal
                open={open}
                component="form"
                onSubmit={createboard}
                onClose={callback}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Create Board
                </Typography>
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
        <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="photo-select-label">Select A Photo</InputLabel>
        <Select
          labelId="photo-select-label"
          id="photo-select"
          displayEmpty
          onChange={handleChange}
        >
          {photos.map((st)=>(
            <MenuItem value={st} key={st}>
              <img
                src={st}
                alt="Photo"
                className={classes.selectedphoto}
              />
            </MenuItem>
                  ))}

        </Select>
        </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
              Create Board
            </Button>
          </Box>
              </Modal>
    )
}