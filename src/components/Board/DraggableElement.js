import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import {  useDispatch } from "react-redux";
import {createCard} from '../../redux/Slices/BoardSlice';
import {useOutsideAlerter} from "../Helpers"
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import {Typography, TextField,Button,Menu,MenuItem} from "@mui/material";
import React, { useRef } from "react";
const ColumnHeader=styled("div")(() => ({
  marginBottom:"10px",
  textAlign:"left"
}));
const DroppableStyles=styled("div")(() => ({
  padding:"10px",
  borderRadius:"6px",
  color:"rgb(182, 194, 207)"
}));
const DraggableElement = ({ dıd,prefix, elements }) => {
  const [title,setTitle]=React.useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch=useDispatch();
  const [open, setOpen] = React.useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef,setOpen);
  const addToCards=async ()=>{
    setOpen(false);
    dispatch(createCard({title:title,cardlistid:dıd}));
  }
  const clicked=(()=>{
    if (!open) {
      return (
        <div className="CreateCard" style={{cursor:"pointer"}} onClick={()=>{setOpen(true)}}>
          <Typography sx={{padding:"5px",paddingLeft:"15px",paddingRight:"15px"}}><AddIcon/>Create New Card</Typography>
        </div>
      )
    }
    else{
      return (
        <div ref={wrapperRef}>
          <TextField className="CreateText" onChange={(e)=>setTitle(e.target.value)} id="outlined-basic" variant="filled" placeholder="Enter Title" fullWidth sx={{input:{color:"rgb(182, 194, 207)"}}}  />
          <Button className="CreateButton" onClick={addToCards} variant="contained">Save</Button>
        </div>
      )
    }
  })
  return(
    <DroppableStyles>
    <ColumnHeader>{prefix} 
    <MoreVertIcon id="basic-button" aria-controls={menuopen ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={menuopen ? 'true' : undefined}
        onClick={handleClick} sx={{float:"right",cursor:"pointer"}} />
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuopen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
        </ColumnHeader>
    <Droppable droppableId={dıd}>

      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => {return(
            <ListItem key={item.id.toString()} item={item} index={index} dıd={dıd} />
          )})}
          {provided.placeholder}
          {clicked()}
        </div>
      )}
    </Droppable>
  </DroppableStyles>
  )
  
};

export default DraggableElement;