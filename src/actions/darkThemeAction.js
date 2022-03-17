import {DARK_THEME} from "../constants/darkThemeConstant"

export function getDarkTheme(open){
    return {
        type: DARK_THEME,
        payload: open
    }
}