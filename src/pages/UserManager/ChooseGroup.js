import React from 'react';
import {useDispatch, useSelector} from "react-redux"
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {fetchUser} from "../../actions/UserManageAction";
import {chooseGroup} from '../../actions/authAction';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

const groupItems = [
  { label: "Group 01", value: "GP01" },
  { label: "Group 02", value: "GP02" },
  { label: "Group 03", value: "GP03" },
  { label: "Group 04", value: "GP04" },
  { label: "Group 05", value: "GP05" },
  { label: "Group 06", value: "GP06" },
  { label: "Group 07", value: "GP07" },
  { label: "Group 08", value: "GP08" },
  { label: "Group 09", value: "GP09" },
  { label: "Group 10", value: "GP10" },
  { label: "Group 11", value: "GP11" },
  { label: "Group 12", value: "GP12" },
  { label: "Group 13", value: "GP13" },
  { label: "Group 14", value: "GP14" },
  { label: "Group 15", value: "GP15" },
];


const ChooseGroup = () => {
  const classes = useStyles();
  const {group} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onChooseGroup = (group) =>{
     dispatch(chooseGroup(group));
  }
  const onFetchUser = (group) =>{
    dispatch(fetchUser(group))
  }

  const handleChooseGroup = (event) => {
    onChooseGroup(event.target.value);
    onFetchUser(event.target.value);
  };

  return (
    <div>
    <FormControl className={classes.formControl}>
      <Select value={group} onChange={handleChooseGroup}>
        {groupItems.map((item) => (
          <MenuItem
            key={item.value || item.maDanhMuc}
            value={item.value || item.maDanhMuc}
          >
            {item.label || item.tenDanhMuc}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
  )
}

export default ChooseGroup