import React from 'react';
import Carousel from "react-material-ui-carousel";
import Image from "material-ui-image";
import {Box, Paper} from "@material-ui/core";

import Course1 from "../../assets/Images/angular.png";
import Course2 from "../../assets/Images/Flutter.jpg";
import Course3 from "../../assets/Images/Java.jpg";
import Course4 from "../../assets/Images/Javascript.jpg";
import Course5 from "../../assets/Images/Vuejs.jpg";

const carouselList = [
  {
    id: 1,
    image: Course1,
  },
  {
    id: 2,
    image: Course2,
  },
  {
    id: 3,
    image: Course3,
  },
  {
    id: 4,
    image: Course4,
  },
  {
    id: 5,
    image: Course5,
  },
]



const CarouselItem = () => {
  return (
    <Box  my={5} display="flex" alignContent="center" justifyContent="center">
        <Box width="100vh">
            <Carousel animation={"fade"}  timeout={500} indicators={false} >
                {carouselList.map((item) => (
                  <Paper key={item.id}>
                    <Image src={item.image} aspectRatio={16 / 9} />
                  </Paper>
                ))}
            </Carousel>
        </Box>
    </Box>
  )
}

export default CarouselItem