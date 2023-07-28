import {Button, Card, CardActions, CardContent, Grid, Paper, Typography,Menu,MenuItem,Chip} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import { deleteWorkplace } from '../../../redux/Slices/Workplaceslice';
import { useDispatch } from "react-redux";
import AddMemberModal from "../../Modals/AddMemberModal"
export default function WorkPlaceCard(props){
      const [anchorEl, setAnchorEl] = React.useState(null);
      const menuopen = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const [AddMemberopen,setaddmemberopen]=React.useState(false)
      const handleAddMemberOpen = () => {
        setaddmemberopen(true)
      };
      const dispatch=useDispatch();
      
      const redirecttoworkplace=(id)=>{
        alert(id);
      }
      const deleteworkplace=(id)=>{
        dispatch(deleteWorkplace({id:id}))
        handleClose()
      }
      let workplace=props.wors
      return <Grid item key={workplace.workplaceId} sx={{margin:"10px"}} xs={12} md={2}>
        <Paper>
          <Card>
            <CardContent sx={{cursor:"pointer"}} onClick={()=>{redirecttoworkplace(workplace.workplaceName)}}>
              <Typography sx={{color:"white"}}>
                <Chip label={workplace.workplaceName} style={{backgroundColor:"red",color:"black"}}  />
              </Typography>
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
                  <MenuItem onClick={()=>{deleteworkplace(workplace.workplaceId)}}>Delete</MenuItem>
                  <MenuItem onClick={handleAddMemberOpen}>Add Member</MenuItem>
                  <MenuItem onClick={handleClose}>Remove Member</MenuItem>
                </Menu>
            </CardActions>
          </Card>
          <AddMemberModal open={AddMemberopen} callback={()=>setaddmemberopen(false)} workplaceid={workplace.workplaceId} />
        </Paper>
      </Grid>
    }