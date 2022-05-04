import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

import { List, ListItem, ListItemSecondaryAction } from "@material-ui/core";
import { ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";
import { Box, TextField, Button, Grid } from "@material-ui/core";
import { Badge, IconButton, Fab, Tooltip } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DataManage from '../UserCourses/DataManage';
import ChooseGroup from './ChooseGroup';
import {fetchInfoClick, searchUser, editUserClick, addUserClick, fetchUser, deleteUser, fetchCourseApprovalPending, fetchCourseApproved, fetchCourseNoneEnroll } from '../../actions/UserManageAction'

const useStyles = makeStyles((theme) => ({
    userItems: {
      width: "100%",
      minWidth: 350,
      backgroundColor: theme.palette.background.paper,
    },
    userList: {
      height: "74.5vh",
      overflowY: "auto",
      "@media (max-width: 756px)": {
        height: "25vh",
      },
    },
    childMargin: {
      "& > *": {
        margin: theme.spacing(0),
      },
    },
  }));
  

const UserList = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {group} = useSelector((state) => state.auth)
  const {error, userList, isEdit, tabIndex, success, coursesPendingList, loading} = useSelector((state) => state.userManage);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(group));
  }, [fetchUser, group]);

  
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

  const handleInfo = (selectedUser, avatarIndex) =>{
      dispatch(fetchInfoClick(selectedUser, tabIndex, avatarIndex));
      dispatch(fetchCourseApprovalPending(selectedUser));
      dispatch(fetchCourseApproved(selectedUser));
      dispatch(fetchCourseNoneEnroll(selectedUser));
  };

  const onEditUserClick = (selectedUser, tabIndex) =>{
     dispatch(editUserClick(selectedUser, tabIndex))
  }

  const onAddUserClick = () =>{
      dispatch(addUserClick())
  }
  const onSearchUser = (keyWord, group) =>{
     dispatch(searchUser(keyWord, group))
  }
  const onDelete = (selectedUser, group) =>{
      dispatch(deleteUser(selectedUser, group))
  }
  const handleDeleteConfirm = (user) => {
    enqueueSnackbar(`Are you sure to delete ${user.taiKhoan}?`, {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      action: (
        <Button
          size="small"
          variant="contained"
          onClick={() => onDelete(user, group)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    });
  };

  let  userListRender = <div>loading...</div>

  if (userList && userList.length > 0) {
    userListRender = userList.map((user, index) => {
      const isGV = user.maLoaiNguoiDung === "GV";
      const labelId = `checkbox-list-secondary-label-${index}`;
      return (
        <ListItem
          key={user.taiKhoan}
          button
          onClick={() => handleInfo(user, index)}
        >
          <ListItemAvatar>
            <Badge
              badgeContent={isGV ? user.maLoaiNguoiDung : null}
              color="error"
            >
              <Avatar
                alt={`Avatar n°${index + 1}`}
                src={
                  index > 69
                    ? null
                    : `https://i.pravatar.cc/150?img=${index + 1}`
                }
              />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            id={labelId}
            primary={user.taiKhoan}
            secondary={user.email}
          />
          <ListItemSecondaryAction>
            <Tooltip title="Edit" placement="left">
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEditUserClick(user, tabIndex)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete" placement="right">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteConfirm(user)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }


  return (
    <>
     <List dense className={classes.userItems}>
        <ListItem>
          <Grid container justifyContent="space-between" alignItems="center">
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={() => onAddUserClick()}
              disabled={loading}
            >
              <Tooltip title="Add" placement="right">
                <AddIcon />
              </Tooltip>
            </Fab>

            {userList && userList.length ? (
              <DataManage items={userList.length} type={"users"} />
            ) : null}

            <ChooseGroup />
          </Grid>
        </ListItem>

        <ListItem>
          <Box mb={1} mr={1} width={"100%"}>
            <TextField
              id="filled-search"
              label="Search User..."
              type="search"
              fullWidth
              onChange={(event) => onSearchUser(event.target.value, group)}
            />
          </Box>
        </ListItem>

        <Box className={classes.userList}>{userListRender}</Box>
      </List>
    </>
  )
}

export default UserList