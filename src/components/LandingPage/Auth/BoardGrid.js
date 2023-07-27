import {Button, Card, CardActions,CardActionArea, CardContent, Grid, Paper, Typography,Menu,MenuItem} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { deleteBoard } from '../../../redux/Slices/Workplaceslice';
import { useDispatch } from "react-redux";
import AddBoardModal from "../../Modals/AddBoardModal"
import React from "react";

export default function BoardGrid(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch=useDispatch();
      
  const deleteboard=(id)=>{
    dispatch(deleteBoard({id:id}))
    handleClose()
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
    const redirecttoboard=(id)=>{
      navigate("/Board/"+id)
    }
      let workplace=props.wors;
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
          {workplace.boards.map(board=>(
            <Grid item key={board.id} sx={{backgroundImage:'url("../public/ocean.jpg")',marginRight:"10px"}} xs={12} md={2}>
            <Paper>
            <Card>
            <CardContent sx={{cursor:"pointer"}} onClick={()=>{redirecttoboard(board.id)}}>
              <Typography>{board.title}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" id="basic-button" aria-controls={menuopen ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={menuopen ? 'true' : undefined}
                  onClick={handleClick} sx={{cursor:"pointer"}} endIcon={<MoreVertIcon />}>
                  Options</Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={menuopen}
                  onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  >
                  <MenuItem onClick={()=>{deleteboard(board.id)}}>Delete</MenuItem>
                  <MenuItem>Add Member</MenuItem>
                  <MenuItem onClick={handleClose}>Remove Member</MenuItem>
                </Menu>
            </CardActions>
          </Card>
            </Paper>
          </Grid>
          ))}
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