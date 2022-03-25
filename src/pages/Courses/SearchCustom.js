import React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>({
    container:{
        "&.MuiTextField-root":{
            margin: theme.spacing(1),
            width: "25ch"
        }
    }
}));

const SearchCustom = ({onChangeKeyWord}) => {
  const classes = useStyles();
  return (
  <form className={classes.container} noValidate autoComplete="off">
    <TextField
      label="Search..."
      type="search"
      size="small"
      variant="outlined"
      className={classes.input}
      onChange={(e) => onChangeKeyWord(e.target.value)}
    />
  </form>
  )
}

export default SearchCustom