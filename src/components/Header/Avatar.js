import React from 'react';
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {useDispatch} from 'react-redux';
import {openSidebar} from "../../actions/addSidebar"

const styledBadges = withStyles((theme) =>({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "$ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    container:{
        display: "flex"
    }
}))
const AvatarItem = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSideOpen =() =>{ 
    dispatch(openSidebar());
  }
  return (
    <div className={classes.container}>
        <styledBadges
          overlap="cỉcle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
          onClick={onSideOpen}
        >
          <Avatar alt="Avatar" src="https://i.pravatar.cc/150?img=56" />
        </styledBadges>
    </div>
  )
}

export default AvatarItem