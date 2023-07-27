import { Box, Typography,Button, Modal,TextField,Card,CardContent,CardActionArea } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddWorkplaceModal from "../../Modals/AddWorkplaceModal"
import {Grid} from "@mui/material";
export default function WorkPlacesGrid(props){


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return  (
  <div>
    <Box sx={{ flexGrow: 1,marginTop:"50px",border:0 }}>
      <Card sx={{ minWidth: 275}} >
        <CardContent>
          <Typography variant="h5" component="div" sx={{marginBottom:"25px"}}>
            Workplaces
          </Typography>
          <Grid container>
            {props.insid}
            <Grid item xs={12} md={2}>
              <Card>
                <CardActionArea onClick={()=>{handleOpen()}}>
                  <CardContent>
                    <Typography sx={{padding:"12.5px"}}>Click To Create Workplace</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <AddWorkplaceModal open={open} callback={()=>setOpen(false)} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  </div>)

}