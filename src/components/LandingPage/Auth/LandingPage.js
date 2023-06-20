import React from 'react';
import LandingPageAppBar from './LandingPageAppBar';
import WorkPlacesGrid from './WorkPlacesGrid';
import { Box, Typography,Button } from "@mui/material";
import {Card,CardContent,Grid} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {CircularProgress} from "@mui/material";
import { getWorkplaces } from '../../../../redux/Slices/Workplaceslice';
import WorkPlaceCard from "./WorkPlaceCard";
import BoardGrid from './BoardGrid';
export default function Landing(props){
  let user=props.user;
  
  const [message, setMessage] = React.useState();
  const dispatch = useDispatch();
  const { workplaces,loaded } = useSelector((state) => state.workplaces);
  React.useEffect(()=>{
    dispatch(getWorkplaces());
  },[])
  const boards=workplaces.length==0?(
    <Typography variant="h6">You aren't a member of any workspaces yet. Create a workspace</Typography>
):(
    workplaces.map(workplace => (
        <BoardGrid wors= {workplace} />
      ))


)
const insida=!loaded?(
    <CircularProgress />
):(
    boards
)
  const wc=workplaces.length==0?(
      <Typography variant="h6">You aren't a member of any workspaces yet. Create a workspace</Typography>
  ):(
      workplaces.map(workplace => (
          <WorkPlaceCard wors= {workplace} />
        ))


  )
  const insid=!loaded?(
      <CircularProgress />
  ):(
      wc
  )
  return  <div>
    <Box sx={{margin:'0px'}}>
      <LandingPageAppBar user={user} />
      <WorkPlacesGrid insid={insid} />
      <div>
        <Box sx={{ flexGrow: 1,marginTop:"50px",border:0 }}>
          <Card sx={{ minWidth: 275}} >
            <CardContent>
              <Typography variant="h5" component="div" sx={{marginBottom:"25px"}}>
                Boards
              </Typography>
            <Grid container>
              {insida}
            </Grid>
          </CardContent>
        </Card>
        </Box>
      </div>
    </Box> 
  </div>
    
}