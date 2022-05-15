import React from "react";
import SearchBar from "./SearchBar";
import {Link} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import DropdownMenu from "./DropdownMenu";
import Logo from "../../assets/Images/Logo.jpg";
import { AppBar, Toolbar } from "@material-ui/core";
import { Hidden, useScrollTrigger } from "@material-ui/core";
import { Button, IconButton, Typography } from "@material-ui/core";
import { Fab, Zoom } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(45deg, blue 50%, white 50%)",
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  toolbarGutters: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing(2),
    },
  },
  scrollTop: {
    zIndex: 2000,
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  buttonHome:{
     color: "yellow",
     fontWeight:"bold",
     paddingRight:"10px",
     transition: "all 1s",
     "&:hover":{
      color:"white",
   },
     [theme.breakpoints.down("md")]:{
      display: "none",
    }
  },
  buttonCou:{
    color: "yellow",
    fontWeight:"bold",
    transition: "all 1s",
    "&:hover":{
       color:"white",
    },
    [theme.breakpoints.down("md")]:{
      display: "none",
    }
  }

}));

const Header = (props) => {
  const classes = useStyles();
  let {openClicked, drawerClicked} = props;
  //console.log("open click: ", openClicked);
  return (
    <>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar} disableGutters>
            <Hidden xsDown>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openClicked}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <img  src={Logo} alt="Logo" style={{width:"100px", height:"60px"}}/>
            </Hidden>
            <Hidden smUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={drawerClicked}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography className={classes.title} variant="h6" noWrap>
                <div style={{display:"flex", alignItems:"space-between", justifyContent:"center" }}>
                    <Button className={classes.buttonHome} component={Link} to={"/"}>
                        Home
                    </Button>
                    <Button className={classes.buttonCou} component={Link} to={"/courses"}>
                        Courses
                    </Button>
                </div>
            </Typography>
            <SearchBar />
            <DropdownMenu />
          </Toolbar>
        </AppBar> 
    </>
  );
};

export default Header;
