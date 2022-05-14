import axiosClient from './axiosClient';

const ManageUserAPI = {
    onFetchUser: (group) =>{
         return axiosClient.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom="+group)
    },
    onSearchUser: (keyword, group) =>{
        return axiosClient.get("/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom="+group+"&tuKhoa="+keyword)
    },

} 


export default  ManageUserAPI;