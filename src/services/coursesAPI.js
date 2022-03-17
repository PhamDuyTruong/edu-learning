import axiosClient from './axiosClient'

const coursesAPI ={
    getCourses: () =>{
        return axiosClient.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
    },
    getCoursesByCategory: (maDanhMuc, group) =>{
        if(group === undefined)
           group = "GP08";
        const params = {
            maDanhMuc: maDanhMuc,
            maNhom: group
        } 
        return axiosClient.get("/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", {params});      
    }
};

export default coursesAPI;