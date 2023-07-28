import {Button, Card, CardActions,CardActionArea, CardContent, Grid, Paper, Typography,Menu,MenuItem,Chip} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { deleteBoard } from '../../../redux/Slices/Workplaceslice';
import { useDispatch } from "react-redux";
import AddBoardModal from "../../Modals/AddBoardModal"
import React from "react";

export default function BoardGrid(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setCurrentId] = React.useState('');
  const menuopen = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(id)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch=useDispatch();
  let workplace=props.wors;    

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
    const redirecttoboard=(id)=>{
      navigate("/Board/"+id)
    }
    const deleteboard=()=>{
      dispatch(deleteBoard({id:id}))
      handleClose()
    }
      return <Grid item key={workplace.workplaceId} sx={{backgroundImage:'url("../public/ocean.jpg")',marginBottom:"10px"}} md={12}>
        <Paper>
          <Card >
            <CardContent sx={{padding:"10px"}}>
              <div style={{marginRight:"50px"}}>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography sx={{marginTop:"5px"}}>{workplace.workplaceName}</Typography>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={4}>
                    <Grid container >
                      <Grid item xs={4}>
                        
                      </Grid>
                      <Grid item xs={4}>
                        
                      </Grid>
                      <Grid item xs={4}>
                        <Button sx={{alignContent:"normal"}} variant="outlined" size="small"  startIcon={<PeopleIcon />}>Members({workplace.members.length})</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
            
          </Card>
          <Grid container sx={{marginTop:"10px"}}>
          {workplace.boards.map(board=>{
             return(
            <Grid item key={board.id} sx={{marginRight:"10px"}} xs={12} md={2}>
            <Paper>
            <Card style={{backgroundImage:`url(${board.picUrl})` }}>
            <CardContent sx={{cursor:"pointer"}} onClick={()=>{redirecttoboard(board.id)}}>
              <Chip label={board.title} style={{backgroundColor:"darkred",color:"white"}}  />
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" id="basic-button" aria-controls={menuopen ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={menuopen ? 'true' : undefined}
                  onClick={(e)=>{handleClick(e);setCurrentId(board.id)}} sx={{cursor:"pointer"}} endIcon={<MoreVertIcon />}>
                  Options</Button>
                <Menu
                  anchorEl={anchorEl}
                  open={menuopen}
                  onClose={handleClose}
                  >
                  <MenuItem onClick={()=>{deleteboard()}}>Delete</MenuItem>
                  <MenuItem>Add Member</MenuItem>
                  <MenuItem onClick={handleClose}>Remove Member</MenuItem>
                </Menu>

            </CardActions>
          </Card>
            </Paper>
          </Grid>
          )})}
          <Grid item xs={12} md={2}>
              <Card>
                <CardActionArea onClick={()=>{handleOpen()}}>
                  <CardContent>
                    <Typography sx={{padding:"12.5px"}}>Click To Create Board</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <AddBoardModal open={open} callback={()=>setOpen(false)} workıd={workplace.workplaceId} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    }