import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCourseAll} from '../../actions/CourseAll';

import { Box, Grid } from "@material-ui/core";
import GroupButton from './GroupButton';
import SearchCustom from './SearchCustom';
import FilterButton from './FilterButton';
import CourseCardItem from '../CourseList/CourseCard';

const Courses = () => {
  const [courseType, setCourseType] = useState("all");
  const [group, setGroup] = useState("GP08");
  const [keyword, setKeyWord] = useState(null);
  const {courseAll, loading} = useSelector((state) => state.courseAll);
  //console.log("course All: ", courseAll)
  const dispatch = useDispatch();
  
  useEffect(() =>{
    dispatch(getCourseAll(courseType, group, keyword));
  },[getCourseAll, courseType, group, keyword]);

  const handleChangeKeyWord = (key) =>{
    setCourseType("all");
    setTimeout(() => {
      setKeyWord(key);
    }, 1500);
  }



  let courseListRender = <></>;
  if (!loading && courseAll.length > 0) {
    courseListRender = courseAll.map((course, index) => (
      <Grid item key={index}>
        <CourseCardItem course={course} />
      </Grid>
    ));
  }

  return (
    <Box>
    <Box
      style={{paddingTop:"70px"}}
      mb={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
    >
      <Box m={1}>
        <FilterButton
          courseType={courseType}
          onChangeIndex={(code) => setCourseType(code)}
        />
      </Box>
      <Box m={1}>
        <GroupButton
          group={group}
          onChangeGroup={(choosen) => setGroup(choosen)}
        />
      </Box>
      <Box m={1}>
        <SearchCustom onChangeKeyWord={handleChangeKeyWord} />
      </Box>
    </Box>

    <Grid container spacing={2} justifyContent="center">
      {courseListRender}
    </Grid>
  </Box>
  )
}

export default Courses