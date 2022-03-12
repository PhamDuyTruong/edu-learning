import React from 'react';
import "../../Styles/feedback.css";
import Slider from "react-slick";

import Ava1 from "../../assets/Images/Ava1.jpg";
import Ava2 from "../../assets/Images/Ava2.jpg";
import Ava3 from "../../assets/Images/Ava3.jpg";
import Ava4 from "../../assets/Images/Ava4.jpg";

const feedbackItem = [
  {
    id: 1,
    image: Ava1,
    title: "Borivoje",
    text: "E-learning is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close"
  },
  {
    id: 2,
    image: Ava2,
    title: "Dipesh",
    text: "E-learning is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close"
  },
  {
    id: 3,
    image: Ava3,
    title: "Marco",
    text: "E-learning is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close"
  },
  {
    id: 4,
    image: Ava4,
    title: "David",
    text: "E-learning is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close"
  },
  {
    id: 5,
    image: Ava2,
    title: "Zulaika",
    text: "E-learning is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close"
  },
  {
    id: 6,
    image: Ava3,
    title: "Putin",
    text: "E-learning is a life saver. I don't have the time or money for a college education. My goal is to become a freelance web developer, and thanks to Udemy, I'm really close"
  }
]


const Feedback = () => {
  let settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
    
  return (
 <div className="feedback">
  <div className="feedback_container container-fluid" style={{height: "330px"}}>
    <h2 style={{paddingBottom:"5px"}}>What our students have to say</h2>
    <div className="feedback_item">
     <Slider {...settings}>
       {feedbackItem.map((item) => (
         <div className='card' key={item.id}>
              <div className='card-body'>
                 <img src={item.image} alt="avatar"/>
                 <span className='card-title'>
                    {item.title}
                 </span>
                 <p className='card-text'>
                  {item.text}
                 </p>
              </div>
         </div>
       ))}
     </Slider>
    </div>
  </div>
</div>

  )
}

export default Feedback