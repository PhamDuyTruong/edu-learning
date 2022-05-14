import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useSnackbar } from "notistack";

import { Typography, Tooltip } from "@material-ui/core";

import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import BlockIcon from "@material-ui/icons/Block";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import { Accordion } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core'
import { AccordionSummary } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddCourse from './AddCourse';
import {approveUserPending, disapproveUser} from '../../actions/CourseManageAction';
const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
    card: {
      borderRadius: 12,
      minWidth: 256,
      textAlign: "center",
    },
    avatar: {
      width: 60,
      height: 60,
      margin: "auto",
    },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      letterSpacing: "0.5px",
      marginTop: 8,
      marginBottom: 0,
    },
    subheader: {
      fontSize: 14,
      color: palette.grey[500],
      marginBottom: "0.875em",
    },
    statLabel: {
      fontSize: 12,
      color: palette.grey[500],
      fontWeight: 500,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji"',
      margin: 0,
    },
    statValue: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
      letterSpacing: "1px",
    },
    expanseHeading: {
      fontSize: typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: typography.pxToRem(15),
      color: palette.text.secondary,
    },
  }));
  

const CourseDetail = () => {
    const styles = useStyles();
    const {error, success, loading, selectedCourse, userPendingList,  userApprovedList,  userDeniedList} = useSelector((state) => state.courseManage)
    const shadowStyles = useFadedShadowStyles();
    const borderedGridStyles = useGutterBorderedGridStyles({
      borderColor: "rgba(0, 0, 0, 0.08)",
      height: "50%",
    });
    const dispatch = useDispatch();
     const { enqueueSnackbar } = useSnackbar();

     const [expanded, setExpanded] = useState(false);

     const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
      const onApproveUserPending = (selectedCourse, user) =>{
          dispatch(approveUserPending(selectedCourse, user));
      }
      const onDisapproveUser = (selectedCourse, user) =>{
         dispatch(disapproveUser(selectedCourse, user));
      }
     useEffect(() => {
        if (error) {
          enqueueSnackbar(error, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else if (success) {
          enqueueSnackbar(success, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      }, [error, success, enqueueSnackbar]);

      let usersPendingRender;
      if (userPendingList && userPendingList.length > 0) {
        usersPendingRender = (
          <Box p={2} width={"100%"} className={borderedGridStyles.item}>
            <List dense>
              {userPendingList.map((user, index) => (
                <ListItem key={user.biDanh} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${index + 1}`}
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={user.biDanh}
                    primary={user.taiKhoan}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="allow"
                      onClick={() => onApproveUserPending(selectedCourse, user)}
                    >
                      <Tooltip title="Approve" placement="left">
                        <ThumbUpAltIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="disApprovel"
                      onClick={() => onDisapproveUser(selectedCourse, user)}
                    >
                      <Tooltip title="Ban" placement="right">
                        <BlockIcon />
                      </Tooltip>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      };

      let usersApprovedRender;
      if (userApprovedList && userApprovedList.length > 0) {
        usersApprovedRender = (
          <Box p={2} width={"100%"} className={borderedGridStyles.item}>
            <List dense>
              {userApprovedList.map((user, index) => (
                <ListItem key={user.biDanh} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${index + 1}`}
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={user.biDanh} primary={user.taiKhoan} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="disApprovel"
                      onClick={() => onDisapproveUser(selectedCourse, user)}
                    >
                      <Tooltip title="Ban" placement="right">
                        <BlockIcon />
                      </Tooltip>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      };

      let usersDeniedListRender;
      if (userDeniedList && userDeniedList.length > 0) {
        usersDeniedListRender = (
          <Box p={2} width={"100%"} className={borderedGridStyles.item}>
            <List dense>
              {userDeniedList.map((user, index) => (
                <ListItem key={user.biDanh} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${index + 1}`}
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={user.biDanh} primary={user.taiKhoan} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="allow"
                      onClick={() => onApproveUserPending(selectedCourse, user)}
                    >
                      <Tooltip title="Approve" placement="left">
                        <ThumbUpAltIcon />
                      </Tooltip>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      }
  return (
    <>
     <Box mb={1}>
        <AddCourse preview={true} />
      </Box>

      <Card className={cx(styles.card, shadowStyles.root)}>
        {loading ? <div>Loading...</div>: null}
        <Box>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            disabled={loading}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={styles.expanseHeading}>
                Pending Users
              </Typography>
              <Typography className={styles.secondaryHeading}>
                These users are waiting to access
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{usersPendingRender}</AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            disabled={loading}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={styles.expanseHeading}>
                Approved Users
              </Typography>
              <Typography className={styles.secondaryHeading}>
                These users had accessed exactly this course
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{usersApprovedRender}</AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            disabled={loading}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={styles.expanseHeading}>
                Refuse users
              </Typography>
              <Typography className={styles.secondaryHeading}>
                Enroll this course for users
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {usersDeniedListRender}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Card> 
    </>
  )
}

export default CourseDetail