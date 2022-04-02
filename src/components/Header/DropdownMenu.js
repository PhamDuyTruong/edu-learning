import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Box, useMediaQuery } from "@material-ui/core";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import DarkThemeButton from "./DarkThemeButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArchiveIcon from "@material-ui/icons/Archive";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AvatarItem from './Avatar';

const useStyles = makeStyles((theme) =>({
    moreIcon:{
       color:"#000"
    },
    button:{
        color: "#000",
        fontWeight:"700",
        "&:hover":{
            color: "#F05454",
        }
    },

    buttonLogIn:{
        textTransform: "none",
        fontWeight: "700",
        "&:hover":{
            color:"yellow",
        }
    },
    buttonSignUp:{
        textTransform: "none",
        color: "FEFBF3",
        width: "90px",
        border: "1px solid #C65D7B",
        fontWeight:"700",
        transition:"all 1s",
        "&:hover":{
            color:"#FFF",
            backgroundColor: "#2FA4FF",
            border: "none",
        }
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
      },
    Hide:{
        [theme.breakpoints.up("md")]: {
            display: "none",
          },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
          display: "flex",
        },
      },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
          display: "none",
        },
      },
}))



const DropdownMenu = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const {darkTheme} = useSelector((state) => state.darktheme)
  const {token} = useSelector((state) => state.auth);
  console.log("Token: ", token);
  let isAuth = token !== null;
  //console.log("isAuth: ", isAuth);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const match = useMediaQuery("(min-width: 960px)")
  const classes = useStyles();

  const ThemeInLocal = JSON.parse(localStorage.getItem("darkTheme"))

  let isTheme = darkTheme;
  if(!darkTheme){
    isTheme = ThemeInLocal;
  }
  const renderMenu = isAuth ? (
     <Box display="flex" flexDirection={match ? "row": "column"} alignItems="center" m={match ? 0 : 1} minWidth={match ? 0 : 180}>
        <Box m={match ? 0 : 1}>
            <Button
               disableElevation
               variant="contained"
               size="small"
               startIcon={<ExitToAppIcon />}
               className={classes.button}
               component={Link}
               to={"/logout"}
               style={{color: "#F56D91"}}
            >
              Log out
            </Button>
        </Box>
        <Box my={match? 0 : 1} ml={match ? 1 : 0}>
          <Button
           disableElevation
            color="default"
           variant={isTheme ? "outlined" : "contained"}
           size="small"
           startIcon={<ArchiveIcon />}
           className={classes.button}
           component={Link}
           to={"/"}
         >
          My Courses
         </Button>
        </Box>
        <Box m={match ? 0 : 1}>
            <DarkThemeButton />
        </Box>
       <Box m={match ? 0 : 1}>
        <IconButton disableRipple style={{ padding: 0 }}>
          <AvatarItem />
         </IconButton>
       </Box>
     </Box>
  ) : (<Box display="flex" flexDirection={match ? "row": "column"} alignItems="center" m={match ? 0 : 1} minWidth={match ? 0 : 180}>
        <Box flexDirection="column" className={classes.Hide}>
            <ul style={{listStyleType:"none"}}>
                <li>
                    <a href="#" className={classes.button} style={{textDecoration:"none"}}>Home</a>
                </li>
                <li>
                    <a href="#" className={classes.button} style={{textDecoration:"none"}}>Course</a>
                </li>
            </ul>
        </Box>
        <Box m={match ? 0 : 1}>
            <DarkThemeButton />
         </Box>
        <ButtonGroup disableElevation variant="contained" size="small">
         <Button
          color ="primary"
          component={Link}
          to={"/sign-in"}
          className={classes.buttonLogIn}
         >
          Login
         </Button>
         <Button
         variant='outlined'
          component={Link}
          to={"/sign-up"}
          className={classes.buttonSignUp}
         >
          Sign Up
         </Button>
       </ButtonGroup>
  </Box>)
  return (
    <>
      <div className={classes.sectionDesktop}>{renderMenu}</div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls="menu-mobile"
          aria-haspopup="true"
          onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <MoreIcon className={classes.moreIcon}/>
        </IconButton>
      </div>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        id="menu-mobile"
        keepMounted
        open={isMobileMenuOpen}
        onClose={() => setMobileMoreAnchorEl(false)}
      >
        {renderMenu}
      </Menu>
    </>
  )
}

export default DropdownMenu