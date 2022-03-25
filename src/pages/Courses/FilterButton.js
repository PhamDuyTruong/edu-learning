import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { getCoursesIndex } from "../../actions/CoursesIndexAction";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

const FilterButton = (props) => {
  const { courseType, onChangeIndex } = props;
  const { coursesIndex, isLoadingCourses } = useSelector(
    (state) => state.coursesIndex
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getCoursesIndex());
  }, [getCoursesIndex]);

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel>Filter by</InputLabel>
      <Select
        value={courseType}
        onChange={(e) => onChangeIndex(e.target.value)}
        label="Filter by"
      >
        <MenuItem value="all">All Topic</MenuItem>
        {coursesIndex.map((group) => (
          <MenuItem key={group.maDanhMuc} value={group.maDanhMuc}>
            {group.tenDanhMuc}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterButton;
