import axiosClient from './axiosClient';

const userAPI = {
   registerCourse: (values) =>{
       return axiosClient.post("/QuanLyKhoaHoc/DangKyKhoaHoc", values)
   },
   deleteRegister: (values) =>{
       return axiosClient.post("/QuanLyKhoaHoc/HuyGhiDanh", values)
   },
   fetchUser: (courseId) =>{
       const params ={
           maKhoaHoc: courseId
       }
       return axiosClient.get("/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc="+params.maKhoaHoc)
   },
   fetchUserDetail: (values) =>{
       return axiosClient.post("/QuanLyNguoiDung/ThongTinTaiKhoan", values)
   }
};

export default userAPI;