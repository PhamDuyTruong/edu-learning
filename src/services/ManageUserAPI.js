import axiosClient from './axiosClient';

const ManageUserAPI = {
    onAddUser: (values) =>{
         return axiosClient.post("/QuanLyNguoiDung/ThemNguoiDung", values)
    },
    onDeleteUser: (selectedUser) =>{
        return axiosClient.delete("/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan="+selectedUser.taiKhoan)
    },
    onEditUser: (values) =>{
        return axiosClient.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values)
    },
    onFetchUser: (group) =>{
         return axiosClient.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom="+group)
    },
    onFetchCoursePending: (selectedUser) =>{
        return axiosClient.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", selectedUser)
    },
    onApproveCoursePending: (values) =>{
         return axiosClient.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", values)
    },
    onDisaprovedCourse: (values) =>{
        return axiosClient.post("/QuanLyKhoaHoc/HuyGhiDanh", values)
    },
    onFetchCourseApprove: (values) =>{
        return axiosClient.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", values)
    },
    onFetchCourseNoneEnroll: (selectedUser) =>{
        return axiosClient.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan="+selectedUser.taiKhoan)
     },
    onSearchUser: (keyword, group) =>{
        return axiosClient.get("/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom="+group+"&tuKhoa="+keyword)
    },

} 


export default  ManageUserAPI;