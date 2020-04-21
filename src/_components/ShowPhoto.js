import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: 0,
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  photoId: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    width: "25%",
  },
  bigPhoto: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
}));

export const ShowPhoto = (props) => {
  const { photoId } = props;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!photoId) {
    return <Typography color="error">-- No Photo --</Typography>;
  }

  return (
    <div>
      {photoId && (
        <img
          onClick={handleOpen}
          className={classes.photoId}
          src={photoId}
          alt={"patient"}
        />
      )}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <img className={classes.bigPhoto} src={photoId} alt={"patient"} />
        </div>
      </Modal>
    </div>
  );
};
