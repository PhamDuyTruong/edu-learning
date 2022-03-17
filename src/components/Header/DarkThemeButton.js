import React from 'react';
import Switch from "@material-ui/core/Switch";
import { Tooltip } from "@material-ui/core";
import { useLovelySwitchStyles } from "@mui-treasury/styles/switch/lovely";
import { getDarkTheme } from "../../actions/darkThemeAction";
import {useSelector, useDispatch} from 'react-redux';

const DarkThemeButton = () => {
    
  const {darkTheme} = useSelector((state) => state.darktheme);
  console.log(darkTheme);
  const switchStyles = useLovelySwitchStyles();
  const ThemeInLocal = JSON.parse(localStorage.getItem("darkTheme"));
  const dispatch = useDispatch();

  const handleDarkTheme = (event)=>{
     dispatch(getDarkTheme(event))
  }
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }

  return (
    <div>
        <Tooltip title="Dark Theme">
            <Switch classes={switchStyles} checked={isTheme} onChange={(e) => handleDarkTheme(e.target.checked)}>
            </Switch>
        </Tooltip>
    </div>
  )
}

export default DarkThemeButton