import axiosClient from './axiosClient';

const CourseManageAPI = {
     onFetchCourse: (keyWord, group, courseType) =>{
        let url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${group}`;
        if (courseType !== "all") {
          url = `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${courseType}&MaNhom=${group}`;
        }
        if (keyWord) {
          url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyWord}&MaNhom=${group}`;
        }
        return axiosClient.get(url);
     }
}

export default CourseManageAPI;