import React, { useState,useRef, useEffect } from "react";
import {useOutsideAlerter} from "../Helpers";
import { useSelector, useDispatch } from "react-redux";
import CardListService from '../../services/cardlist';
import { styled } from '@mui/material/styles';
import cardservice from '../../services/cardservice';
import {createCardList,getBoard} from '../../redux/Slices/BoardSlice';

import DraggableElement from "./DraggableElement";
import { DragDropContext } from "react-beautiful-dnd";
import {Grid,TextField,CardContent,CardActionArea,Typography, Button} from "@mui/material";
import Paper from '@mui/material/Paper';
const DragDropContextContainer = styled("div")(({ theme }) => ({
  padding:"20px",
  borderRadius:"6px",
  height:"100%"
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  backgroundColor:"black",
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const removeFromList = (list, index) => {
  const cards = Array.from(list.cards);
  const [removed] = cards.splice(index, 1);
  list={
    ...list,
    cards:cards
  }
  return [removed, list];
};

const addToList = (list, index, element) => {
  const cards = Array.from(list.cards);
  cards.splice(index, 0, element);
  list={
    ...list,
    cards:cards
  }
  return list;
};
const Board = ({
  initial,
}) => {
  const [open, setOpen] = useState(false);
  const [title,setTitle]=useState("")
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef,setOpen);
  const clicked=(()=>{
    if (!open) {
      return (
        <div className="CreateCardList" style={{cursor:"pointer"}} onClick={()=>{setOpen(true)}}>
        <Typography>Create New Card</Typography>
      </div>
      )
    }
    else{
      return (
        <div ref={wrapperRef}>
          <TextField className="CreateText" onChange={(e)=>setTitle(e.target.value)} id="outlined-basic" placeholder="Enter Title" fullWidth sx={{input:{color:"rgb(182, 194, 207)"}}}  />
          <Button className="CreateButton" onClick={addToL}>Save</Button>
        </div>
      )
    }
  })
  
  const dispatch=useDispatch();
  const board = initial;
  const [cardlists, setCardLists] = useState(board.lists);
  const addToL=async ()=>{
    setOpen(false);
    dispatch(createCardList({title:title,boardid:board.id}));
  }
  useEffect(()=>{
    setCardLists(board.lists)
  },[board])
  const onDragEnd =async (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = [ ...cardlists];
    let sourceListindex = listCopy.findIndex(x=>x.id==result.source.droppableId);
    let sourceList = listCopy[sourceListindex];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[sourceListindex] = newSourceList;
    let destinationListindex = listCopy.findIndex(x=>x.id==result.destination.droppableId);
    let destinationList = listCopy[destinationListindex];
    listCopy[destinationListindex] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    listCopy.forEach((element,i) => {
      let elementcopy={...element}
      let cardscopy=[...element.cards]
      cardscopy.forEach(async (card,j)=>{
        if(card.index!=j||result.destination.droppableId!=result.source.droppableId){
          console.log(cardscopy[j])
          cardscopy[j]={
            ...card,
            index:j,
          }
          await cardservice.updateindex(element.id,j,card.id)
        }
      })
      elementcopy={
        ...elementcopy,
        cards:cardscopy
      }
      listCopy[i]=elementcopy
    });
    setCardLists(listCopy);
  };
  return (
    <>
      <DragDropContextContainer className="board-back">
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2} wrap="nowrap">
          {cardlists.map((cardlist,index) => (
            <Grid item>
              <Item>
                <DraggableElement
                  elements={cardlist.cards}
                  key={cardlist.cards.id}
                  prefix={cardlist.title}
                  dıd={cardlist.id.toString()}
                />
              </Item>
            </Grid>
          ))}
          <Grid item xs={2}>
            {clicked()} 
          </Grid>
        </Grid>
      </DragDropContext>
    </DragDropContextContainer>
    </>
  );
};


export default Board;