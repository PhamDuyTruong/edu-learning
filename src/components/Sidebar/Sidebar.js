import React from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Divider, Hidden, Menu } from "@material-ui/core";
import { Drawer, SwipeableDrawer } from "@material-ui/core";

import MenuList from "../MenuList/MenuList";

const useStyles = makeStyles((theme) => ({
    container:{
        whiteSpace: "nowrap"
    },
    openDrawer:{
        width: "220px",
        overflow: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
    closeDrawer:{
        width: "0px",
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(7) + 1,
        },
    }
}));



const Sidebar = ({openSidebar, drawSidebar, handleOpen, handleClose}) => {
  const classes = useStyles();
  const renderMenu = (
      <Box display="flex" flexDirection="column" height="100vh">
         <Box flexGrow={1}>
            <MenuList close={handleClose}/>
         </Box>
         {openSidebar || drawSidebar ? (
        <Box>
          <Divider />
        </Box>
      ) : null}
      </Box>
  )
  return (
    <>
       <Hidden xsDown>
            <Drawer 
              variant='permanent'
              className={clsx(classes.container, {
                [classes.openDrawer]: openSidebar,
                [classes.closeDrawer]: !openSidebar,
              })}
              classes={{
                paper: clsx({
                  [classes.openDrawer]: openSidebar,
                  [classes.closeDrawer]: !openSidebar,
                }),
              }}
            >
                {renderMenu}
            </Drawer>
       </Hidden>
       <SwipeableDrawer
        anchor="left"
        open={drawSidebar}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {renderMenu}
      </SwipeableDrawer>
    </>
  )
}

export default Sidebar