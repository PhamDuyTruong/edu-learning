import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import Hidden  from '@material-ui/core/Hidden';
import {makeStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, Tooltip } from "@material-ui/core";
import { Box, List, IconButton } from "@material-ui/core";
import {
    Menu,
    Info,
    Home,
    People,
    ViewList,
    InsertDriveFile,
  } from "@material-ui/icons";

import GmailSidebarItem from "@mui-treasury/components/sidebarItem/gmail";

import {drawSidebarClose} from "../../actions/addSidebar";
import Logo from "../../assets/Images/Logo.jpg";

const useStyles = makeStyles((theme) =>({
    root:{
        marginLeft: "25px",
    },
    container:{
        width:"200px",
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
    appbar: {
        background: "linear-gradient(45deg, #0099ff 50%, #0099ff 50%)",
    },
    navlink: {
        color: "inherit",
        textDecoration: "none",
    },
    navIcon: {
        marginRight: "1px !important",
        fontSize: "24px !important",
      },
    collapsed:{
        padding: "0px 4px !important",
      }
}))

const MenuList = (props) => {
    const classes = useStyles();
    let {history, close} = props
    const [index, setIndex] = useState(history.location.pathname);
    const {sideOpen, sideDraw} = useSelector((state) => state.addSidebar);
    let collapsed = !sideOpen;

    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch()
    
    const handleSidebarClose = () =>{
        dispatch(drawSidebarClose());
    }

    const commonProps = (i)=>({
      selected: index === i,
      onClick: () => setIndex(i),
      collapsed: sideDraw ? false : collapsed,
      dotOnCollapsed: true,
    });

   const DashBoard = React.forwardRef(function Component(props, ref){
     return(
        <div {...props} ref={ref}>
          <Link to="/" className={classes.navlink}>
            <GmailSidebarItem
            classes={{ collapsed: classes.collapsed, root: classes.root }}
            color={"#0099ff"}
            startIcon={<Home className={classes.navIcon} />}
            label={"Dashboard"}
            amount={""}
            {...commonProps("/")}
            dotOnCollapsed={false}
           />
          </Link>
        </div>
     )
   });

   const Courses = React.forwardRef(function Component(props, ref){
    return(
       <div {...props} ref={ref}>
         <Link to="/courses" className={classes.navlink}>
           <GmailSidebarItem
           classes={{ collapsed: classes.collapsed, root: classes.root }}
           color={"#0099ff"}
           startIcon={<ViewList className={classes.navIcon} />}
           label={"Courses"}
           amount={""}
           {...commonProps("/courses")}
           dotOnCollapsed={false}
          />
         </Link>
       </div>
    )
  });

   const About = React.forwardRef(function Component(props, ref){
    return(
       <div {...props} ref={ref}>
         <Link to="/about" className={classes.navlink}>
           <GmailSidebarItem
           classes={{ collapsed: classes.collapsed, root: classes.root }}
           color={"#0099ff"}
           startIcon={<Info className={classes.navIcon} />}
           label={"About"}
           amount={""}
           {...commonProps("/about")}
           dotOnCollapsed={false}
          />
         </Link>
       </div>
    )
  });

  const UsersManage = React.forwardRef(function MyComponent(props, ref) {
    return (
      <div {...props} ref={ref}>
        <Link to="/users-management" className={classes.navlink}>
          <GmailSidebarItem
            classes={{ collapsed: classes.collapsed, root: classes.root }}
            color={"#0099ff"}
            startIcon={<People className={classes.navIcon} />}
            label={"Users Manage"}
            amount={""}
            {...commonProps("/users-management")}
            dotOnCollapsed={true}
          />
        </Link>
      </div>
    );
  });

  const CoursesManage = React.forwardRef(function MyComponent(props, ref) {
    return (
      <div {...props} ref={ref}>
        <Link to="/courses-management" className={classes.navlink}>
          <GmailSidebarItem
            classes={{ collapsed: classes.collapsed, root: classes.root }}
            color={"#0099ff"}
            startIcon={<InsertDriveFile className={classes.navIcon} />}
            label={"Courses Manage"}
            amount={""}
            {...commonProps("/courses-management")}
            dotOnCollapsed={true}
          />
        </Link>
      </div>
    );
  });

  return (
    <Box 
    className={classes.container} 
    role="presentation"
    onClick={close}
    onKeyDown={close}
    >
      <Box className={classes.toolbar}>
       <Hidden smUp>
         <AppBar position="absolute">
            <Toolbar className={classes.appbar}>
              <IconButton color="inherit" edge="start" onClick={handleSidebarClose}>
                <Menu />
              </IconButton>
              <img src={Logo} alt="Logo"/>
            </Toolbar>
          </AppBar>
       </Hidden>
      </Box>
      <List style={{marginLeft: "-9px"}}>
          <Tooltip title="Dashboard">
              <DashBoard />
          </Tooltip>
          <Tooltip title="Courses">
              <Courses />
          </Tooltip>

          {user && user.maLoaiNguoiDung === "GV" ? (
            <>
             <Tooltip title="Users Manage">
              <UsersManage />
             </Tooltip>
             <Tooltip title="Courses Manage">
              <CoursesManage />
             </Tooltip>
            </>
          ): null}

          <Tooltip title="About">
              <About />
          </Tooltip>
          
      </List>
    </Box>
  )
}

export default withRouter(MenuList)