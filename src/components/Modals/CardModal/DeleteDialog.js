import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
  } from "@mui/material";
import { useDispatch } from "react-redux";
import {deletecomment} from "../../../redux/Slices/Commentsslice";
export default function DeleteDialog({open,close,id}){
    const dispatch=useDispatch()
    const DeleteComment=()=>{
      dispatch(deletecomment({id:id}))
      close()
    }
    return(
        <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Candel</Button>
          <Button onClick={DeleteComment} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
}