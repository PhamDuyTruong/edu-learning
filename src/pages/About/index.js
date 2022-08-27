import React from 'react';
import cx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {Box, Avatar, Chip} from '@material-ui/core';
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN03TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n03";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";

import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) =>({
    container:{
        maxWidth: 1000,
        borderRadius: 20
    },
    content:{
        padding: 24,
    },
    backgroundAbout: {
        background: "linear-gradient(135deg, blue 50%, white 50%)",
    },
    chip:{
        justifyContent: "center",
        flexWrap: "wrap",
    }
}));
// Fake data
const librariesItem = [
    {
      avatar: "R",
      name: "ReactJS",
      link: "https://reactjs.org/",
    },
    {
      avatar: "C",
      name: "Create React App",
      link: "https://github.com/facebook/create-react-app",
    },
    {
      avatar: "M",
      name: "MATERIAL-UI",
      link: "https://material-ui.com/",
    },
    {
        avatar:"B",
        name: "Bootstrap",
        link: "https://github.com/twbs"
    },
    {
      avatar: "T",
      name: "Mui-Treasury",
      link: "https://mui-treasury.com/",
    },
    {
      avatar: "N",
      name: "Notistack",
      link: "https://iamhosseindhv.com/notistack/demos",
    },
    {
      avatar: "F",
      name: "Formik",
      link: "https://jaredpalmer.com/formik",
    },
    {
        avatar: "H",
        name: "Hook-Form",
        link: "https://github.com/react-hook-form/react-hook-form"
    },
    {
      avatar: "C",
      name: "React Material UI Carousel",
      link: "https://github.com/Learus/react-material-ui-carousel",
    },
    {
      avatar: "S",
      name: "React Slick",
      link: "https://github.com/akiran/react-slick",
    },
    {
        avatar:"R",
        name: "React Reveal",
        link: "https://github.com/rnosov/react-reveal"
    },
    {
      avatar: "R",
      name: "Redux",
      link: "https://redux.js.org/",
    },
    {
      avatar: "R",
      name: "REACT ROUTER",
      link: "https://reacttraining.com/react-router/",
    },
  ];


const About = React.memo(function AboutInfo() {
  const classes = useStyles();
  const styles = useN03TextInfoContentStyles();
  const shadowStyles = useLightTopShadowStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="92vh" className ={classes.backgroundAbout}>
        <Box m={3}>
             <Card className={cx(classes.container, shadowStyles.root)}>
                <BrandCardHeader  
                image={
                    "https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png"
                 }
                 extra={"2 minutes"} />
                    <CardContent className={classes.content}>
                        <TextInfoContent classes={styles} overline={"E-learning"}
                         heading={"About"}
                         body={
                            "This is an E-learning Web App was constructed with React Library and other libraries. The UI build base on Material-UI along with the associated beautiful library."
                          }
                         />
                           <TextInfoContent
                             classes={styles}
                             body={
                                "This Website is using some data like image and description the courses from API that was create before."
                             }
                          />
                          <Box mt={3}>
                              <TextInfoContent 
                                 classes={styles}
                                 body={
                                     "Thanks to the author of following libraries."
                                 }
                              />
                              <Box className={classes.chip}>
                                {librariesItem.map((item) =>{
                                    return(
                                        <Chip key={item.avatar}
                                          avatar={<Avatar>{item.avatar}</Avatar>}
                                          label={item.name}
                                          clickable
                                          color="default"
                                          deleteIcon={<DoneIcon />}
                                          variant="outlined"
                                          component="a"
                                          href={item.link}
                                        >                                            
                                        </Chip>
                                    )
                                })}
                              </Box>
                          </Box>
                    </CardContent>
             </Card>
        </Box>
    </Box>
  )
})

export default About