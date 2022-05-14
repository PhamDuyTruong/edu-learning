import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";

import { Edit, Delete } from "@material-ui/icons";
import {getCoursesIndex} from '../../actions/CoursesIndexAction';
import {editCourseClick,fetchUsersClick, fetchUserListOfCourse, fetchUserPendingListOfCourse, fetchUserDeniedListOfCourse, deleteCourse } from '../../actions/CourseManageAction'


const useStyles = makeStyles((theme) => ({
    root: {
      width: 155,
    },
    title: {
      height: 42,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    edit: {
      marginLeft: "auto",
    },
  }));
  

const CourseItem = (props) => {
  const classes = useStyles();
  const {group} = useSelector((state) => state.auth);
  const {courseType, courseList, tabIndex, error, success} = useSelector((state) => state.courseManage);
  const {course} = props;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const onFetchUsersClick = (selectedCourse, tabIndex) =>{
      dispatch(fetchUsersClick(selectedCourse, tabIndex));
  }

  const onEditCourseClick = (selectedCourse, tabIndex) =>{
        dispatch(editCourseClick(selectedCourse, tabIndex));
  }

  const onFetchUserListOfCourse = (selectedCourse) =>{
        dispatch(fetchUserListOfCourse(selectedCourse));
  }
  const onFetchUserPendingListOfCourse = (selectedCourse) =>{
     dispatch(fetchUserPendingListOfCourse(selectedCourse))
  }

  const onFetchUserDeniedListOfCourse = (selectedCourse) =>{
      dispatch(fetchUserDeniedListOfCourse(selectedCourse));
  }

  const onDeleteCourse = (selectedCourse, keyWord, group, courseType) =>{
      dispatch(deleteCourse(selectedCourse, keyWord, group, courseType))
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (success) {
      enqueueSnackbar(success, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [enqueueSnackbar, error, success]);
   
  const handleCourseInfo = (course) =>{
    onFetchUsersClick(course, tabIndex);
    onFetchUserListOfCourse(course);
    onFetchUserPendingListOfCourse(course);
    onFetchUserDeniedListOfCourse(course);
  }

  const handleCourseEdit = (course)=>{
    dispatch(getCoursesIndex());
    onFetchUsersClick(course);
    onEditCourseClick(course, tabIndex);
  };

  const handleDeleteConfirm = (course) => {
    enqueueSnackbar(`Are you sure to delete ${course.tenKhoaHoc}?`, {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      action: (
        <Button
          size="small"
          variant="contained"
          onClick={() => onDeleteCourse(course, null, group, courseType)}
          startIcon={<Delete />}
        >
          Delete
        </Button>
      ),
    });
  };

  return (
    <Card className={classes.root}>
    <CardActionArea onClick={() => handleCourseInfo(course)}>
      <CardMedia
        className={classes.media}
        image={course.hinhAnh}
        title={course.tenKhoaHoc}
      />
      <CardContent>
        <Typography
          className={classes.title}
          variant="subtitle2"
          component="h5"
        >
          {course.tenKhoaHoc}
        </Typography>
      </CardContent>
    </CardActionArea>

    <CardActions disableSpacing>
      <IconButton
        aria-label="delete"
        onClick={() => handleDeleteConfirm(course)}
      >
        <Tooltip title="Delete" placement="right">
          <Delete />
        </Tooltip>
      </IconButton>

      <IconButton
        aria-label="edit"
        className={classes.edit}
        onClick={() => handleCourseEdit(course)}
      >
        <Tooltip title="Edit" placement="left">
          <Edit />
        </Tooltip>
      </IconButton>
    </CardActions>
  </Card>
  )
}

export default CourseItem