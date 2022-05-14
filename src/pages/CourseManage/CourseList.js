import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import { List, ListItem, Tooltip } from "@material-ui/core";
import { Fab, Box, TextField, Grid } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import ChooseGroup from '../UserManager/ChooseGroup';
import DataManage from '../UserCourses/DataManage';
import CourseItem from './CourseItem'

import {getCoursesIndex} from '../../actions/CoursesIndexAction';
import {fetchCourseList, addCourseClick} from '../../actions/CourseManageAction';

const useStyles = makeStyles((theme) => ({
    courseItems: {
      zIndex: 10,
      width: "100%",
      minWidth: 350,
      backgroundColor: theme.palette.background.paper,
    },
    courseList: {
      flexGrow: 1,
      height: "75vh",
      overflowY: "auto",
      "@media (max-width: 836px)": {
        height: "250px",
      },
    },
    childMargin: {
      "& > *": {
        margin: theme.spacing(0),
      },
    },
  }));
  


const CourseList = () => {
    const classes = useStyles();
    const {group} = useSelector((state) => state.auth);
    const {courseList, courseType, error, success, loading} = useSelector((state) => state.courseManage);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoursesIndex());
      }, [getCoursesIndex]);
    
      useEffect(() => {
        dispatch(fetchCourseList(null, group, courseType))
      }, [fetchCourseList, group, courseType]);
    
    const onAddCourseList = () =>{
        dispatch(addCourseClick())
    }
    const onFetchCourseList =(keyWord, group, courseType) =>{
        dispatch(fetchCourseList(keyWord, group, courseType));
    }
    const handleCourseClick = () =>{
        onAddCourseList();
    }

    let courseListRender = <div>Loading...</div>
    if (courseList && courseList.length > 0) {
        courseListRender = courseList.map((course, index) => (
          <Grid item key={index}>
            <CourseItem course={course} />
          </Grid>
        ));
      }
    

  return (
    <>
       <List dense className={classes.courseItems}>
        <ListItem>
          <Grid container justify="space-between" alignItems="center">
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={() => handleCourseClick()}
              disabled={loading}
            >
              <Tooltip title="Add" placement="right">
                <AddIcon />
              </Tooltip>
            </Fab>

            {courseList && courseList.length ? (
              <DataManage items={courseList.length} type={"courses"} />
            ) : null}

            <ChooseGroup />
          </Grid>
        </ListItem>

        <ListItem>
          <Box mb={1} mr={1} width={"100%"}>
            <TextField
              id="filled-search"
              label="Search Course..."
              type="search"
              fullWidth
              onChange={(event) =>
                onFetchCourseList(event.target.value, group, courseType)
              }
            />
          </Box>
        </ListItem>
      </List>

      <Box mx={2}>
        <Grid
          container
          spacing={2}
          justify={"center"}
          className={classes.courseList}
        >
          {courseListRender}
        </Grid>
      </Box>
    </>
  )
}

export default CourseList