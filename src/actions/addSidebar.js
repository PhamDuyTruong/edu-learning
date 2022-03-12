import {OPEN_SIDEBAR, DRAW_SIDEBAR_OPEN, DRAW_SIDEBAR_CLOSE } from "../constants/addSidebarAction";

export const openSidebar = () =>{
    return {
        type: OPEN_SIDEBAR
    }
}

export const drawSidebarOpen = () =>{
    return {
        type: DRAW_SIDEBAR_OPEN
    }
}

export const drawSidebarClose = () =>{
    return {
        type: DRAW_SIDEBAR_CLOSE
    }
}