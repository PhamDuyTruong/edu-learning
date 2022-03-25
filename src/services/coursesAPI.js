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
    },
    getDetailCourse: (courseId) =>{
        const params = {
            maKhoaHoc: courseId
        }
        return axiosClient.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc="+params.maKhoaHoc)
    },
    getCourseAll: (courseType, group, keyword) =>{
        if (group === undefined) {
            group = "GP08";
          };
          let url = "/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=" + courseType + "&MaNhom=" +group;
          if (courseType === "all") {
            url = "/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=" +group;
          }
          if (keyword) {
            url = "/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc="+keyword+"&MaNhom="+group;
          }
        return axiosClient.get(url);
    }
};

export default coursesAPI;