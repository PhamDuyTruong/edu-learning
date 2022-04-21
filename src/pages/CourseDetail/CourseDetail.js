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
import {fetchUserList} from "../../actions/UserAction"

import ShowcaseCard from "./ShowcaseCard";
import CourseTab from "./CourseTab";

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
  const {userList} = useSelector((state) => state.user);
  const { match } = props;
  const [onShow, setOnShow] = useState(false);
  const switchStyles = useN01SwitchStyles();

  let nguoiTao;
  if (courseDetail.nguoiTao) {
    nguoiTao = courseDetail.nguoiTao.hoTen;
  };
  const infoUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCourseDetail(match.params.id));
  }, [match.params.id]);

  useEffect(() =>{
      dispatch(fetchUserList(match.params.id))
  }, [match.params.id]);


  let nameList = [];
  let userListRender;
  if (userList && userList.lstHocVien) {
    userListRender = (
      <Box mx={3}>
        <AvatarGroup max={6}>
          {userList.lstHocVien.map((user, index) => {
            nameList.push(user.taiKhoan);
            return (
              <Tooltip key={user.taiKhoan} title={user.taiKhoan}>
                <Avatar
                  alt={user.hoTen}
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                />
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </Box>
    );
  };

  let showAllUserRender;
  if (onShow && nameList) {
    showAllUserRender = (
      <Box className={classes.chipBox}>
        {nameList.map((name, index) => (
          <Chip
            key={`${name}${index}`}
            avatar={
              <Avatar
                alt={name}
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
              />
            }
            label={name}
          />
        ))}
      </Box>
    );
  };

  let isMe = false;
  if(nameList && infoUser && nameList.langth > 0){
      isMe = nameList.includes(infoUser.taiKhoan)
  }

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
                    <Box mr={3}>Created by {nguoiTao} </Box>
                    <Box>Last updated {courseDetail.ngayTao}</Box>
                  </Grid>
                )}
              </Box>

              {infoUser ? (
                <Box my={2}>
                  {loading ? (
                    <Skeleton variant="text" width={"60%"} />
                  ) : (
                    <Grid container alignItems="center">
                      <Box display="flex" flexDirection="column" ml={1}>
                        <Box display="flex" alignItems="center">
                          <PersonAddIcon
                            fontSize="small"
                            style={{ margin: "0 10" }}
                          />
                          {userList && userList.lstHocVien
                            ? userList.lstHocVien.length
                            : "0"}
                        </Box>
                        <Typography>Enrolled</Typography>
                      </Box>
                      {userListRender}
                      <Tooltip title="Show All">
                        <Switch
                          classes={switchStyles}
                          checked={onShow}
                          onChange={(e) => setOnShow(e.target.checked)}
                        />
                      </Tooltip>
                    </Grid>
                  )}
                </Box>
              ) : null}
                {showAllUserRender}
            </Box>
          </Grid>
        </Box>
        <CourseTab />
      </Grid>
      <Grid item xs={matchMD ? 4 : 12}>
        <Box mx={2} className={classes.position}>
          <ShowcaseCard
            isMe={isMe}
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
