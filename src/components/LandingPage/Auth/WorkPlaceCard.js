import {Button, Card, CardActions, CardContent, Grid, Paper, Typography} from "@mui/material";
import { deleteWorkplace } from '../../redux/Slices/Workplaceslice';
import { useDispatch } from "react-redux";
export default function WorkPlaceCard(props){
      const dispatch=useDispatch();
      const redirecttoworkplace=(id)=>{
        alert(id);
      }
      const deleteworkplace=(id)=>{
        dispatch(deleteWorkplace({id:id}))
      }
      let color="";
      const a= Math.floor(Math.random() * 4);
      switch (a) {
        case 0:
          color="#8B0000";
          break;
        case 1:
          color="#00008B";
          break;
        case 2:
          color="#FF8C00";
          break;
        case 3:
          color="#663399"
          break;
        default:
          break;
      }
      let workplace=props.wors
      return <Grid item key={workplace.workplaceId} sx={{margin:"10px"}} xs={12} md={2}>
        <Paper>
          <Card sx={{backgroundColor:color}}>
            <CardContent>
              <Typography>{workplace.workplaceName}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" sx={{color:"white"}} onClick={()=>{redirecttoworkplace(workplace.workplaceId)}}>Go To The Workplace</Button>
              <Button variant="contained" size="small" sx={{color:"white"}} onClick={()=>{deleteworkplace(workplace.workplaceId)}}>Delete The Workplace</Button>
            </CardActions>
          </Card>
        </Paper>
      </Grid>
    }