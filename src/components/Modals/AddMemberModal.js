import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Member from "../../services/memberservice"
import { Box, Typography,Button, Modal,TextField,List,ListItem,ListItemText,Snackbar,Alert} from "@mui/material";
export default function AddMemberModal({open,callback,workplaceid}){
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const [opensnack, setOpen] = React.useState(false);
      const [color, setColor] = React.useState('');
      const [message, setMessage] = React.useState('');

    const [filteredList, setFilteredList] = React.useState([]);
    const [selected,setSelected]=React.useState(null)
    const AddMember=async ()=> {
        let a= await Member.addmember(selected,workplaceid)
        setOpen(true)
        if (a.status==200) {
          setColor("success");
          setMessage("Added the Member")
        } else {
          setColor("error")
          setMessage("Error In Adding Member")
        }
        callback();
      }
      const filterBySearch =async (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        var updatedList = await Member.filter(query);
        if (updatedList.status==200) {
          let f=await updatedList.json()
          setFilteredList(f);
        } else {
          setFilteredList([])
        }

      };
    return(
      <div>
      <Modal
        open={open}
        onClose={callback}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Member
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={filterBySearch}
            id="email"
            label="email"
            name="Email"
            autoFocus
            />
            <Button
              onClick={AddMember}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Workplace Member
            </Button>
            <List>
            {filteredList.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText sx={{cursor:"pointer"}} onClick={()=>setSelected(item.id)}>{item.email}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
    </Modal>
    <Snackbar open={opensnack} autoHideDuration={6000}>
        <Alert severity={color} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
    )
}