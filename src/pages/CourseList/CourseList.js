import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Grid, Box } from "@material-ui/core";
import { GmailTabs, GmailTabItem } from "@mui-treasury/components/tabs/gmail";
import { makeStyles } from "@material-ui/core/styles";

import CourseCarousel from "./CourseCarousel";
import SkeletonCard from './SkeletonCard';
import {getCoursesIndex} from '../../actions/CoursesIndexAction'
import {getCoursesByCategory} from '../../actions/CoursesAction'

const useStyles = makeStyles((theme) => ({
  gmailTabs: {
    backgroundColor: "inherit",
  },
  wrapper: {
    color: "darkgray !important",
  },
}));

function TabPanel({children, tabNum, index, ...other}){
      console.log("Tabnum: ", tabNum, index);
      return(
        <div 
          role="tabpanel"
          hidden={tabNum !== index}
          id={`scrollable-force-tabpanel-${index}`}
          aria-labelledby={`scrollable-force-tab-${index}`}
          {...other}
        >
            {tabNum === index && <Box p={3}>{children}</Box>}
        </div>
      )
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const CourseList = () => {
  const classes = useStyles();
  const [tabNum, setTabNum] = useState(0);
  const {courses, isLoading} = useSelector((state) => state.courses);
  const {coursesIndex, isLoadingCourses} = useSelector((state) => state.coursesIndex);
  console.log(courses);
  const dispatch = useDispatch();
  const onFetchCourse = (index) =>{
    dispatch(getCoursesByCategory(index));
  }
  
  useEffect(() =>{
    dispatch(getCoursesIndex());
  }, [getCoursesIndex]);

  const handleChange = (_, newValue) =>{
      setTabNum(newValue);
      onFetchCourse(coursesIndex[newValue].maDanhMuc);
  }

  let courseRender = <SkeletonCard />;
  if (!isLoadingCourses) {
    courseRender = coursesIndex.map((tab, index) => (
      <TabPanel tabNum={tabNum} index={index} key={tab.maDanhMuc}>
         <Grid container justifyContent='center' spacing={2}>
          <CourseCarousel courseList={courses} />
          </Grid>
      </TabPanel>
    ));
  };

  return (
    <>
      <Grid container justifyContent='center'>
         <GmailTabs
            value={tabNum}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable force tabs"
            className={classes.gmailTabs}
         >
            {coursesIndex.map((item, index) =>{
              return (
              <GmailTabItem
                key={index}
                label={item.tenDanhMuc}
                classes={{ wrapper: classes.wrapper }}
                {...a11yProps(index)}
              />
              )
            })}
         </GmailTabs>
         {courseRender}
      </Grid>
    </>
  )
}

export default CourseList