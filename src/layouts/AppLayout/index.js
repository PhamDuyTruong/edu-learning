import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import {useSelector, useDispatch} from 'react-redux';
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import { makeStyles, responsiveFontSizes } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import {openSidebar, drawSidebarClose, drawSidebarOpen} from '../../actions/addSidebar'
import Sidebar from "../../components/Sidebar/Sidebar";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  toolbar: {
    marginBottom: 48,
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    paddingTop: theme.spacing(1),
  },
}));

const theme = responsiveFontSizes(
  createTheme({
   // palette: {
     // type: isTheme ? "dark" : "light",
   // },
    mixins: {
      toolbar: {
        height: 60,
      },
    },
  })
);


export default function AppLayout({ children }) {
  const classes = useStyles();
  const {sideOpen, sideDraw} = useSelector((state) => state.addSidebar);
  const dispatch = useDispatch();
  //console.log(sideOpen);

  const onSideOpen = () =>{
    dispatch(openSidebar());
  }

  const onDrawOpen = () =>{
    dispatch(drawSidebarOpen());
  }

  const onDrawClose = () =>{
    dispatch(drawSidebarClose());
  }
  

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider  preventDuplicate maxSnack={3}>
        <div className={classes.container}>
           <CssBaseline />
           <Header openClicked={onSideOpen} drawerClicked={onDrawOpen}/>
           <Sidebar openSidebar={sideOpen} drawSidebar = {sideDraw} handleOpen={onDrawOpen} handleClose ={onDrawClose}/>
            <div className={classes.content}>
              <div className={classes.toolbar}>
                 {children}
              </div>
            </div> 
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}