import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

import AddUser from './AddUser';
import UserDetail from './UserDetail';
import UserList from './UserList';

const useStyles = makeStyles((theme) => ({
    userList: {
      flex: 2,
    },
    detail: {
      flex: 3,
      minWidth: 350,
      overflowY: "auto",
      background: "linear-gradient(45deg, #7FB5FF 50%, white 50%)",
      "@media (min-width: 756px)": {
        height: "92.4vh",
      },
    },
  }));

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

const UserManagement = () => {
  const classes = useStyles();
  const {tabIndex} = useSelector((state) => state.userManage);

  return (
    <Grid container>
      <Grid item sm={"auto"} className={classes.userList}>
        <Box>
          <UserList />
        </Box>
      </Grid>
      <Grid item className={classes.detail}>
        <TabPanel value={tabIndex} index={-1}>
          <AddUser />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <AddUser />
        </TabPanel>

        <TabPanel value={tabIndex} index={-2}>
          <UserDetail />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <UserDetail />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default UserManagement