import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { Avatar, Tooltip, Chip } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

import Switch from "@material-ui/core/Switch";
import { useN01SwitchStyles } from "@mui-treasury/styles/switch/n01";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Skeleton from "@material-ui/lab/Skeleton";

import { getCourseDetail } from "../../actions/CourseDetailAction";

import ShowcaseCard from "./ShowcaseCard";

const useStyles = makeStyles((theme) => ({
  position: {
    marginTop: "5%",
    [theme.breakpoints.up("md")]: {
      position: "fixed",
      marginTop: "8%",
      marginLeft: "5%",
    },
  },
  chipBox: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const CourseDetail = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchMD = useMediaQuery(theme.breakpoints.up("md"));
  const { courseDetail, loading, error } = useSelector(
    (state) => state.courseDetail
  );
  console.log("course Detail: ", courseDetail)
  const { match } = props;
  const [onShow, setOnShow] = useState(false);

  const onCourseDetail = (courseId) => {
    getCourseDetail(courseId);
  };

  useEffect(() => {
    onCourseDetail(match.params.id);
  }, [match.params.id]);

  return (
    <Grid container direction={matchMD ? "row" : "column-reverse"}>
      <Grid item xs={matchMD ? 8 : 12}>
        <Box py={onShow ? 5 : 0}>
          <Grid container alignItems="center" style={{ minHeight: 350 }}>
            <Box mx={7} width={"100%"}>
              <Typography variant="h4" gutterBottom>
                {loading ? (
                  <Skeleton variant="text" width={"100%"} />
                ) : (
                  courseDetail.tenKhoaHoc
                )}
              </Typography>
              <Typography gutterBottom>
                {loading ? (
                  <Skeleton variant="text" width={"100%"} />
                ) : (
                  courseDetail.moTa
                )}
              </Typography>
              <Box>
                {loading ? (
                  <Skeleton variant="text" width={"50%"} />
                ) : (
                  <Grid container alignItems="center">
                    <Box mr={3}>Created by </Box>
                    <Box>Last updated {courseDetail.ngayTao}</Box>
                  </Grid>
                )}
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={matchMD ? 4 : 12}>
        <Box mx={2} className={classes.position}>
          <ShowcaseCard
            //isMe={isMe}
            loading={loading}
            image={courseDetail.hinhAnh}
            courseId={match.params.id}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default withRouter(CourseDetail);
