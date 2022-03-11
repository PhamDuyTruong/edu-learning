import React from 'react';
import {Divider} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) =>({
  search:{
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.15),
      "&:hover": {
          backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]:{
        marginLeft: theme.spacing(1),
        width: "auto"
      }
  },
  searchIcon:{
      padding: theme.spacing(0,2),
      height: "100%",
      position:"absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor:"pointer",
      color:"#000",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputContent:{
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "28ch",
      },
    },
  }
}))

const SearchBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />    
        </div> 
        <InputBase 
           type='search'
           placeholder='Search'
           classes={{
               root: classes.inputRoot,
               input: classes.inputContent
           }}
           inputProps={{ "aria-label": "search" }}
        />   
    </div>
  )
}

export default SearchBar