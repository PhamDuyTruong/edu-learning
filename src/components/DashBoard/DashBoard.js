import React, {useState} from 'react';
import Mern from "../../assets/Images/Mern.png";
import { Link } from "react-router-dom";
import {useMediaQuery} from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box, Typography, Paper } from "@material-ui/core";

import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";


import course1 from "../../assets/Images/course_html_css.png";
import course2 from "../../assets/Images/Js.jpg";
import course3 from "../../assets/Images/what-is-ui.jpg";
import course4 from "../../assets/Images/Python.png";
import course5 from "../../assets/Images/MERN-Stack-Development.png";

import Feature from "../Feature/Feature";
import Info from "../Info/Info"
import CarouselItem from '../CarouselItem/Carousel';
import Description from '../Description/Description';
import Feedback from "../Feedback/Feedback"

import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
import Flip from 'react-reveal/Flip';


const useStyles = makeStyles((theme) => ({
  carouselHeader:{
    height: "70vh",
    backgroundPosition: "center center",
    backgroundSize:"cover",
    backgroundAttachment : "fixed",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Mern})`,
    width: "100%",
  },
   carouselContent:{
      position: "absolute",
      margin: "0 10%",
      color: "white",
      fontWeight: "500",
    },
    button:{
      fontWeight: "700",
      transition: "all 1s",
      "&:hover":{
        color: "yellow"
      }
    },
    text:{
      color: "#000",
    },
    
}));

const slideItems = [
   {
     id: 1,
     media: course1,
     title: "This is a very interesting course",
     sub: "Improve web development fudamental"
   },
   {
    id: 2,
    media: course2,
    title: "JS - a fun program language",
    sub: "Improve capable of logic yourself"
  },
  {
    id: 3,
    media: course3,
    title: "UI/UX - Maybe neccesary with you",
    sub: "Boost your creative skills"
  },
  {
    id: 4,
    media: course4,
    title: "Python - an interesting Anaconda",
    sub: "Just using this will blow your mind."
  },
  {
    id: 4,
    media: course5,
    title: "This is a very interesting course",
    sub: "Rehearse to become fullsnack dev"
  },
];

const CarouselModal = ({isResponsive, isOpen, setIsOpen}) =>{
   return (
     <div>
       <AutoRotatingCarousel  
        label="Get started"
        open={isOpen.open}
        onClose={() => setIsOpen({ open: false })}
        onStart={() => setIsOpen({ open: false })}
        autoplay={true}
        hideArrows={false}
        mobile={isResponsive}
        >
          {slideItems.map((item) =>(
            <Slide 
            key={item.id} 
            media={<img src={item.media} alt={item.title} />}
            title={item.title}
            subtitle={item.sub}
            mediaBackgroundStyle={{
              background: `linear-gradient(90deg, blue 50%, black 50%)`,
            }}
            style={{ background: `linear-gradient(90deg, blue 50%, black 50%)` }}
            />
          ))}
       </AutoRotatingCarousel>
     </div>
   )
}


const DashBoard = () => {
  const classes = useStyles();
  const matchSM = useMediaQuery("(min-width: 600px)")
  const [isOpen, setIsOpen] = useState({open : false});

  const handleClick = () =>{
    setIsOpen({open : true});
  }
  return (
    <>
      <Grid container alignItems='center' className={classes.carouselHeader}>
          <Grid item className={classes.carouselContent}>
           <Typography variant="h4" gutterBottom>
            Learn HTML5 , CSS3 , Web Apps & More
           </Typography>
           <Typography variant="subtitle1" gutterBottom>
            Learn How To Build Websites & Apps Write A Code Or Start A Business
           </Typography>
           <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>
            Make a tour
           </Button>
           <CarouselModal isResponsive={matchSM} setIsOpen={setIsOpen} isOpen={isOpen} />
          </Grid>
      </Grid>
      <Fade left>
         <Feature />
      </Fade>
      <Box style={{height:"100px"}}></Box>
      <Rotate top left>
        <Info />
      </Rotate>
      <CarouselItem />
      <Description />
      <Flip left>
        <Feedback />
      </Flip>
    </>
  )
}

export default DashBoard;