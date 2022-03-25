import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { InputLabel } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
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



const GroupButton = (props) => {
    const classes = useStyles();
  const { group, onChangeGroup } = props;

  return (
    <FormControl
    variant="outlined"
    size="small"
    className={classes.formControl}
  >
    <InputLabel>Choose Group</InputLabel>
    <Select
      value={group}
      onChange={(e) => onChangeGroup(e.target.value)}
      label="Choose Group"
    >
      {groupItems.map((group) => (
        <MenuItem key={group.value} value={group.value}>
          {group.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}

export default GroupButton