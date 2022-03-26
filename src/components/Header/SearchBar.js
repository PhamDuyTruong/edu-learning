import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getCourseAll} from '../../actions/CourseAll';
import {Divider} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) =>({
  search:{
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.15),
      "&:hover": {
          backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]:{
        marginLeft: theme.spacing(1),
        width: "auto"
      }
  },
  searchIcon:{
      padding: theme.spacing(0,2),
      height: "100%",
      position:"absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor:"pointer",
      color:"#000",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputContent:{
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "28ch",
      },
    },
  },
  searchResult: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    maxHeight: "40vh",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: "none",
    textTransform: "none",
    color: "darkgray",
  },
}))

const SearchBar = () => {
  const {courseAll, loading} = useSelector((state) => state.courseAll);
  const [keyWord, setKeyWord] = useState(null);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() =>{
      dispatch(getCourseAll("all", "GP08", keyWord))
  },[getCourseAll, keyWord])

  const handleKeyWord = (key) =>{
     setTimeout(() =>{
        setKeyWord(key);
        setShow(true);
     }, 2000)
  }

  const classes = useStyles();
  return (
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />    
        </div> 
        <InputBase 
           type='search'
           placeholder='Search'
           classes={{
               root: classes.inputRoot,
               input: classes.inputContent
           }}
           inputProps={{ "aria-label": "search" }}
           onChange={(e) => handleKeyWord(e.target.value)}
        />
      {show && keyWord && courseAll && courseAll.length > 0 ? (
        <List className={classes.searchResult}>
          {courseAll.map((course) => (
            <Link
              key={course.maKhoaHoc}
              to={`/courses/${course.maKhoaHoc}`}
              className={classes.link}
              onClick={() => setShow(false)}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <img src={course.hinhAnh} alt={course.tenKhoaHoc} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={course.tenKhoaHoc} />
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
      ) : null}
           
    </div>
  )
}

export default SearchBar