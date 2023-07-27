import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { styled } from '@mui/material/styles';
import { Card, Modal,Box,Typography } from "@mui/material";
import CardModal from "../Modals/CardModal/CardModal"
const CardTitle=styled("div")(() => ({
  fontWeight:"500"
}));
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
const rot = (isDragging) => {
  let a=isDragging?"10deg":"0deg";
  return a;
};
const DragItem=styled("div")(({isDragging }) => ({
  padding:"10px",
  borderRadius:"6px",
  boxShadow:"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  background:"rgb(34, 39, 43)",
  rotate:rot(isDragging),
  margin:"0 0 8px 0",
  display:"grid",
  gridGap:"20px",
  flexDirection:"column",
}));


const ListItem = ({ item, index,dıd }) => {
  const title = item.title
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div>
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            onClick={()=>{handleOpen()}}
          >
            <CardTitle>{title}</CardTitle>
          </DragItem>
          <CardModal open={open} callback={()=>setOpen(false)} item={item} cardlistid={dıd} />
          </div>

          
        );
      }}
    </Draggable>
    </div>
    
    
  );
};

export default ListItem;