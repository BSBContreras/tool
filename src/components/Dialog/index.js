import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" noWrap>{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DefaultDialog({ 
  handleClose,
  title,
  children,
  submit,
  submitText,
  maxWidth
}) {
  const useStyles = makeStyles(theme => ({
    content: {
      maxHeight: '80vh',
      overFlowY: 'auto',
    }
  }));

  const classes = useStyles();

  return (
    <Dialog
      open
      fullWidth
      onClose={handleClose}  
      maxWidth={maxWidth || 'lg'}
    >
      <DialogTitle onClose={handleClose}>{title}</DialogTitle>
      <DialogContent className={classes.content} dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {submit && (
          <Button 
            autoFocus 
            color="primary"
            onClick={submit}
          >
            {submitText || 'submit'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
