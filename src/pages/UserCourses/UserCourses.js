import React, {useEffect, useState} from 'react';
import {withRouter, Link} from "react-router-dom";
import { useSnackbar } from "notistack";
import {Box, Grid, List, ListItemAvatar, Avatar, ListItemText, Tooltip, ListItem, Card, Typography, ListItemSecondaryAction} from "@material-ui/core"
import { useDispatch, useSelector } from 'react-redux';
import {enrollCourse} from "../../actions/UserAction";
import {fetchUserDetail} from "../../actions/UserDetailAction"
import {fetchUserFail} from '../../actions/UserAction';

import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import BlockIcon from "@material-ui/icons/Block";

import DataManage from './DataManage';

import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";

const useStyles = makeStyles(() => ({
   container:{
       maxWidth: 700,
       margin: "auto",
       padding: `20px 120px`
   },
   content:{
       padding: 24
   },
   avatar: {
       width: 50,
       height: 50,
       border: "2px solid #fff",
       margin: "-48px 32px 0 auto",
       "& > img": {
         margin: 0,
       },
   },
   background:{
       background: "linear-gradient(45deg, #4D77FF 50%, white 50%)"
   },
   link: {
    textDecoration: "none",
    textTransform: "none",
    color: "inherit",
  },
  title:{
      display: "inline",
      fontWeight: 700,
      background: "linear-gradient(45deg, #4D77FF 50%, white 50%)",
      backgroundClip: "text",
      color: "#EB5353",
      transition: "0.5s",
      "&:hover":{
        background: "linear-gradient(45deg, #4D77FF 50%, white 50%)",
        color: "#7FB5FF",
        backgroundClip:"text"
      }
  }
}))


const UserCourses = (props) => {
  const classes = useStyles();
  const {error, success} = useSelector((state) => state.user);
  //console.log("data: ", success);
  const {emplDetail, loading} = useSelector((state) => state.userDetail);
  //console.log(emplDetail)
  const [isMe, setIsMe] = useState(false);
  const {history} = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const shadowStyles = useSoftRiseShadowStyles();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleEnroll = (id, isMe) =>{
      dispatch(enrollCourse(id, isMe))
  }
 
  useEffect(() =>{
      if(error){
        enqueueSnackbar(error, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
      } else if(success){
        enqueueSnackbar(success, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
      }
     
      dispatch(fetchUserDetail());
  }, [error, success, enqueueSnackbar, fetchUserDetail]);

  useEffect(() =>{
      if(history.location.pathname === "/user-courses"){
          setIsMe(true);
      }else{
          setIsMe(false);
      }

  }, [history.location.pathname, user]);

  useEffect(() => {
    if (isMe) {
      dispatch(fetchUserDetail());
    }
  }, [fetchUserDetail, isMe]);

  let CourseRender = <div>Loading...</div>

  if(isMe && emplDetail && emplDetail.chiTietKhoaHocGhiDanh){
        CourseRender = (
            <Box my={5} mx={2}>
               <List dense>
                    {emplDetail.chiTietKhoaHocGhiDanh.map((course, index) =>(
                        <ListItem  key={`${course.maKhoaHoc}${index}`}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Link
                                   to={`/courses/${course.maKhoaHoc}`}
                                   className={classes.link}
                            >
                                  <ListItemText primary={course.tenKhoaHoc} />
                            </Link>
                            <ListItemSecondaryAction>
                                <IconButton
                                     edge = "end"
                                     onClick = {() =>handleEnroll(course.maKhoaHoc, isMe)}
                                >
                                    <Tooltip title="Leave This Course" placement="right">
                                        <BlockIcon />
                                     </Tooltip>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
               </List>
            </Box>
        )
  }


  return (
    <Box display="flex"   alignItems="center" minHeight={"92.2vh"} className={classes.background}>
       <Card className={cx(classes.container, shadowStyles.root)}>
           <Box display="flex" justifyContent="center" mt={3}>
             <Typography variant="h3" className={classes.title}>
                 My Courses
             </Typography>
           </Box>
           
           {isMe && emplDetail && emplDetail.chiTietKhoaHocGhiDanh ? (
            <Box display="flex" justifyContent="center" mt={3}>
             <DataManage
              items={emplDetail.chiTietKhoaHocGhiDanh.length}
              type={"courses"}
             />
          </Box>
         ) : null}

         <Grid container spacing={2} justifyContent="center">
           {CourseRender}
         </Grid>
       </Card>
    </Box>
  )
}

export default withRouter(UserCourses);