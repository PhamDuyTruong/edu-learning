import React from 'react';
import {useSelector} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

import AddCourse from './AddCourse';
import CourseDetail from './CourseDetail';
import CourseList from './CourseList'

const useStyles = makeStyles((theme) => ({
    list: {
      flex: 1,
      minWidth: 390,
    },
    detail: {
      flex: 1,
      zIndex: 1000,
      minWidth: 390,
      overflowY: "auto",
      background: "linear-gradient(45deg, #7FB5FF 50%, white 50%)",
      "@media (min-width: 836px)": {
        height: "92.4vh",
      },
    },
  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  


const CourseManagement = () => {
  const classes = useStyles();
  const {tabIndex} = useSelector((state)=> state.courseManage);

  return (
       <Grid container>
      <Grid item className={classes.list}>
        <Box>
          <CourseList />
        </Box>
      </Grid>

      <Grid item className={classes.detail}>
        <TabPanel value={tabIndex} index={-1}>
          <AddCourse />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <AddCourse />
        </TabPanel>

        <TabPanel value={tabIndex} index={-2}>
          <CourseDetail />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <CourseDetail />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default CourseManagement