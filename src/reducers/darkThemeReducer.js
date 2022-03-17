import {DARK_THEME} from "../constants/darkThemeConstant"

const initialState = {
    darkTheme: null
}

function addDarkTheme(state = initialState, action){
   switch(action.type){
       case DARK_THEME:
           localStorage.setItem("darkTheme", JSON.stringify(action.payload));
           return{...state, darkTheme: action.payload}
       default: 
         return state;

   }
}

export default addDarkTheme;