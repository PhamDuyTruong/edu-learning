import React from 'react';
import {makeStyles} from "@material-ui/core/styles" 
import {Box, Typography, Grid, Avatar} from "@material-ui/core";

import {VideoLibrary, AssignmentTurnedIn, Alarm} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    container:{
        position: "relative",
        minHeight: "25vh",

    },
    icon:{
        backgroundColor: "#4D77FF",
        border: "solid 2px #F0A500",
    },
    borderBox:{
        border: "2px solid rgba(20, 23, 28, 0.05)",
        background: "#fff",
        height: "80px"
    }
}));

// Fake data
const featureList = [
    {
        id: 1,
        icon: <VideoLibrary />,
        title: "Find video courses",
        subtitle: "Build your library for your career and personal growth",
    },
   {
       id: 2,
       icon: <AssignmentTurnedIn />,
       title: "Learn from industry experts",
       subtitle: "Select from top instructors around the world",
   },
   {
       id: 3,
       icon: <Alarm />,
       title: "Go at your own pace",
       subtitle: "Enjoy lifetime access to courses on website",
   }
]

const Feature = ({isTheme}) => {
  //console.log("theme in Feature: ", isTheme);
  const classes = useStyles();
  return (
    <Box pb={8} className={classes.container} style={{background: `linear-gradient(90deg, #B8FFF9 50%, ${isTheme ? "#303030 50%" : "white 50%"}`}}>
      <Grid container justifyContent="space-between" alignItems="center">
         {featureList.map((item) =>{
          return (
             <Box key={item.id} display="flex" m={2} alignItems="center" className={classes.borderBox}>
                 <Avatar className={classes.icon}>{item.icon}</Avatar>
                 <Box ml={1} display="flex" flexDirection="column">
                    <Box alignItems="center" display="flex">
                        <Typography variant="subtitle1">{item.title}</Typography>
                    </Box>
                    <Typography variant="subtitle2">{item.subtitle}</Typography>
                 </Box>
             </Box>
         )})}
      </Grid>
    </Box>
  )
}

export default Feature