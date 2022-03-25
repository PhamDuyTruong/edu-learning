import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import Skeleton from "@material-ui/lab/Skeleton";

import { Card, CardMedia } from "@material-ui/core";
import { Button, Box, Avatar, Typography } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import FindInPageIcon from "@material-ui/icons/FindInPage";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import BuildIcon from "@material-ui/icons/Build";

import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 310,
    minWidth: 270,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    border: "2px solid #fff",
    margin: "-48px 32px 0 auto",
    "& > img": {
      margin: 0,
    },
  },
  button: {
    display: "block",
    width: "100%",
    height: "3rem",
    border: "none",
    background: "linear-gradient(45deg, #4D96FF 50%, black 50%)",
    backgroundSize: "250%",
    color: "#fff",
    fontWeight: 700,
    outline: "none",
    transition: "0.5s",
    cursor: "pointer",

    "&:hover": {
      backgroundPosition: "right",
    },
  },
}));

const ShowcaseCard = ({ courseId, image, loading }) => {
  const classes = useStyles();
  const mediaStyles = useSlopeCardMediaStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  const { enqueueSnackbar } = useSnackbar();
  const infoList = [
    { icon: <FindInPageIcon fontSize="small" />, text: "1 article" },
    {
      icon: <AllInclusiveIcon fontSize="small" />,
      text: "Full lifetime accesso",
    },
    {
      icon: <PhoneIphoneIcon fontSize="small" />,
      text: "Access on mobile and TV",
    },
    {
      icon: <BuildIcon fontSize="small" />,
      text: "SkillsFuture Credit eligible",
    },
    {
      icon: <VerifiedUserIcon fontSize="small" />,
      text: "Certificate of Completion",
    },
  ];

  return (
    <Card className={(cx(classes.container, shadowStyles.root))}>
      {image ? (
        <CardMedia classes={mediaStyles} image={image} />
      ) : (
        <Skeleton variant="rect" width={"100%"} height={150} />
      )}
      <Avatar className={classes.avatar} src={"https://i.pravatar.cc/300"} />

      <Box mt={2}>
        <Typography align="center" variant="h5" gutterBottom>
          Free 50%
        </Typography>
      </Box>
      <Box mx={2}>
        <Box
          component={Link}
          to={"/sign-in"}
          style={{ textDecoration: "none" }}
        >
          <Button size="small" className={classes.button}>
            Login to Enroll
          </Button>
        </Box>
      </Box>

      <Box mt={2}>
        <Box ml={2}>
          <Typography variant="subtitle1">This course includes</Typography>
        </Box>
        <List disablePadding dense>
          {infoList.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon style={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
              <ListItemText secondary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
};

export default ShowcaseCard;
