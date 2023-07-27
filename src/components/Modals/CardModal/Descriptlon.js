import {  Typography, Input, TextField} from "@mui/material";
import React,{useRef} from "react";
import {useOutsideAlerter} from "../../Helpers";

import NotesIcon from '@mui/icons-material/Notes';
export default function Description({desc,cardid}){
  const [description, setdescription] = React.useState(desc);
  const [editing, setediting] = React.useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef,setediting);
  const desccontent=(()=>{
    if (editing===false) {
        if (description!=null) {
            return( <Typography>{description}</Typography>)
        }
        else{
            return (<Typography>CreateDesc</Typography>)
        }
    }
    else{
        return( <TextField InputProps={{ disableUnderline: true }} multiline rows={4} ref={wrapperRef} onChange={(e)=>{setdescription(e.target.value)}} value={description} />)
    }
  })
  const createcomment=()=> {
    console.log(description)
  }
  return(
      <div style={{marginBottom:"150px"}}>
        <div style={{display:"flex"}}>
            <NotesIcon />
            <Typography style={{marginLeft:"10px"}}>Description</Typography>
        </div>
        <div onClick={()=>{setediting(true)}}>
            {desccontent()}
        </div>
      </div>
  )
}