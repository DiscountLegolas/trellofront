import {Button, Card, CardActions,CardActionArea, CardContent, Grid, Paper, Typography} from "@mui/material";
export default function BoardGrid(props){
  const redirecttoboard=(id)=>{
    alert(id);
  }
      let workplace=props.wors;
      return <Grid item key={workplace.workplaceId} sx={{backgroundImage:'url("../public/ocean.jpg")',marginBottom:"10px"}} md={12}>
        <Paper>
          <Card>
            <CardContent>
              <Typography>{workplace.workplaceName}</Typography>
            </CardContent>
            
          </Card>
          <Grid container sx={{marginTop:"10px"}}>
          {workplace.boards.map(board=>(
            <Grid item key={board.id} sx={{backgroundImage:'url("../public/ocean.jpg")',marginRight:"10px"}} xs={12} md={2}>
            <Paper>
            <Card>
            <CardContent>
              <Typography>{board.title}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>redirecttoboard(board.id)}>Go To The Board</Button>
            </CardActions>
          </Card>
            </Paper>
          </Grid>
          ))}
          <Grid item xs={12} md={2}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography sx={{padding:"12.5px"}}>Click To Create Board</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    }