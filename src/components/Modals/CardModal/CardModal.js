import React, { useEffect } from "react";
import { Box, Typography,Button, Modal,TextField, Paper, Input} from "@mui/material";
import {  useDispatch,useSelector } from "react-redux";

import CommentIcon from '@mui/icons-material/Comment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Description from "./Descriptlon";
import Comment from "./Comment";
import {setlists} from "../../../redux/Slices/Commentsslice";

export function Header({text,icon}){
  return(
    <div style={{display:"flex"}}>
      {icon}
      <Typography sx={{marginLeft:"10px"}}>{text}</Typography>
    </div>
  )
}
export default function Card({open,callback,cardlistid,item}){
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "30%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    let dispatch=useDispatch()
    const  {list}  = useSelector((state) => state.comments);
    useEffect(()=>{
      dispatch(setlists(item.comments))
    },[])
    const [comment, setcomment] = React.useState('');
    const [title, settitle] = React.useState(item.title);
    const [border, setborder] = React.useState("");
    const close=()=>{
      console.log("sfs")
      callback();
      console.log("sfs")
      
    }
    const createcomment=()=> {
      callback();
      console.log(comment)
    }
    return(
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Paper sx={style}>
            <div style={{display:"flex",marginBottom:"150px"}}>
              <CreditCardIcon />
              <Input onChange={(e)=>{settitle(e.target.value)}} defaultValue={title} disableUnderline="true" onFocus={()=>{setborder("2px solid blue")}} onBlur={()=>{setborder("")}} style={{border:border,borderRadius: '10px',paddingLeft:"10px"}} />
            </div>
            <Description desc={item.desc} cardid={item.id} />
            <Box component="form" onSubmit={createcomment} sx={{width:"50%"}}>
              <Header icon={<CommentIcon />} text="Comment" />
              <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rows={4}
                onChange={(e)=>setcomment(e.target.value)}
                id="Comment"
                label="Comment"
                name="Comment"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Comment
              </Button>
            </Box>
            <div sx={{width:"75%"}}>
                {list.map((element)=>(
                  <Comment item={element} />
                  ))}
            </div>
          </Paper> 
        </Modal>
    )
}