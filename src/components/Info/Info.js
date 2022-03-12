import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Grid, Typography, Button} from '@material-ui/core';
import onlCourse from "../../assets/Images/Course.png"

const useStyles = makeStyles((theme) => ({
    container: {
        position: "relative",
        background: "#d6edf6",
        minHeight: "50vh",
    },
    img:{
        margin: 'auto',
        display: 'block',
        maxWidth: '500px',
        maxHeight: '300px',
    },
    hide:{
        "@media (max-width: 1290px)":{
            display: "none"
        }
    },
    sectionChoose:{
        paddingTop: "65px"
    },
    buttonSign:{
      "&:hover":{
        color: "#F0A500",
        transition: "all 1s",
        fontWeight: "700",
      }
    }

}))

const Info = () => {
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.container} justifyContent="space-around" alignItems="center">
       <Grid container pl={8}>
           <Grid item>
            <Box mx={5} minWidth={315} className={classes.sectionChoose} justifyContent="center">
              <Box>
               <Typography variant="h4" color="inherit">
                Choose and Enroll your favor courses
               </Typography>
              </Box>
             <Box mt={3}>
              <Typography>
                Simply sign up as a verified user on Course Hub to start to
                access many good course resourses.
              </Typography>
             </Box>
            </Box>
            <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={"/"}
                  style={{ width: 150 }}
                  className={classes.buttonSign}
                >
                  Sign up
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={"/"}
                  style={{ width: 150, marginLeft: 8, color: "inherit" }}
                >
                  Log in
                </Button>
              </Box>
           </Grid>
           <Grid item className={classes.hide}>
               <Box minWidth={700}>
                  <img className={classes.img} src={onlCourse} alt="Online Course"/>
              </Box>
           </Grid>
       </Grid>
    </Box>
  )
}

export default Info