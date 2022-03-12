import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Flip from "react-reveal/Flip";
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme)=>({
    container:{
        position: "relative",
        height: "115vh",
        background: `linear-gradient(45deg, #0099ff 50%, white 50%)`,
        outline: "black",
        animation: `5s ease 0s infinite normal none running Gradient`,
        color: "white",
    },
    title:{
        lineHeight: "85%",
        "@media (max-width: 1274px)": {
            lineHeight: "100%",
          },
          "@media (max-width: 600px)": {
            fontSize: "4rem",
          },
          [theme.breakpoints.down("md")]:{
            color: "#000"
        }
    },
   mediaText:{
    [theme.breakpoints.down("md")]:{
        color: "#000"
    }
   }
}));



const Description = () => {
  const classes = useStyles(); 

  return (
    <Box className={classes.container}>
        <Box  display="flex" flexDirection="column" flexWrap="nowrap" pt={5} pb={5}>
            <Flip left>
             <Box alignSelf="flex-start" maxWidth={500} m={5}>
            <Box display="flex">
              <Typography variant="h1" className={classes.title}>
                1
              </Typography>
              <Box ml={1} display="flex" flexDirection="column" className={classes.mediaText}>
                <Typography variant="h4">
                  Easy to search the topic you want to learn or teaching
                </Typography>
                <Typography style={{ marginTop: 16 }}>
                  Course Hub is collect on many resourses. People who study at
                  the Course Hub can archive knowledge by join suitable topic.
                </Typography>
              </Box>
            </Box>
             </Box>
           </Flip>
             <Box alignSelf="flex-end" maxWidth={500} m={3}>
            <Box display="flex" style={{color: "#000"}}>
              <Typography variant="h1" className={classes.title}>
                2
              </Typography>
              <Box ml={1} display="flex" flexDirection="column">
                <Typography variant="h4">
                  Join us to help share knowledge for the community
                </Typography>
                <Typography style={{ marginTop: 16 }}>
                  We have an enthusiastic and responsible team of teachers from
                  many companies and corporations with many years of experience.
                  Join us to grow together.
                </Typography>
              </Box>
            </Box>
             </Box>
            <Fade left>
              <Box alignSelf="flex-start" maxWidth={500} m={5}>
            <Box display="flex" style={{color: "#000"}}>
              <Typography variant="h1" className={classes.title}>
                3
              </Typography>
              <Box ml={1} display="flex" flexDirection="column">
                <Typography variant="h4">
                  Course Hub users easy to achieve the desired skills
                </Typography>
                <Typography style={{ marginTop: 16 }}>
                  Course Hub system is meticulously built to enhance the
                  interaction between students and teachers. It provides an
                  authentic and easy experience to gain knowledge as well as
                  help teachers easily access students
                </Typography>
              </Box>
            </Box>
              </Box>
            </Fade>
       </Box>
    </Box>
  )
} 

export default Description