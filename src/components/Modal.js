import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import PriceIcon from "../images/Price.png";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <img src={PriceIcon} height="25px" width="25px" />
        View Pricing
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <table border="0">
              <tr>
                <td rowspan="2">
                  <img
                    src={props.data.image_url + props.data.id + ".png"}
                    height="50%"
                    width="50%"
                  />
                </td>
                <td>{props.data.name}</td>
              </tr>
              <tr>
                <td>{props.data.region}</td>
              </tr>
            </table>
            <Typography variant="h6">Pricing</Typography>
            <p>
              <Typography>
                1 Week - 1 Month &nbsp; &nbsp; &nbsp; {props.data.price[0]}
              </Typography>
            </p>
            <p>
              <Typography>
                6 Months &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; {props.data.price[1]}
              </Typography>
            </p>
            <p>
              <Typography>
                1 Year
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;{" "}
                {props.data.price[2]}
              </Typography>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
