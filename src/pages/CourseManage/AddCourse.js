import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux"
import { useSnackbar } from "notistack";
import { Formik, Form } from "formik";

import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { Box, Button, Typography, CardMedia, Grid } from "@material-ui/core";

import * as Yup from "yup";
import {addCourse} from "../../actions/CourseManageAction"
import { DropzoneArea } from "material-ui-dropzone";
import InputField from './InputField';
import InputSelect from "./InputSelect"
import DatePicker from './DatePicker';
import RatingCourse from './Rating';

const groupItems = [
    { label: "Group 01", value: "GP01" },
    { label: "Group 02", value: "GP02" },
    { label: "Group 03", value: "GP03" },
    { label: "Group 04", value: "GP04" },
    { label: "Group 05", value: "GP05" },
    { label: "Group 06", value: "GP06" },
    { label: "Group 07", value: "GP07" },
    { label: "Group 08", value: "GP08" },
    { label: "Group 09", value: "GP09" },
    { label: "Group 10", value: "GP10" },
    { label: "Group 11", value: "GP11" },
    { label: "Group 12", value: "GP12" },
    { label: "Group 13", value: "GP13" },
    { label: "Group 14", value: "GP14" },
    { label: "Group 15", value: "GP15" },
  ];

  const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: "2rem",
      display: "block",
      width: "100%",
      height: "3rem",
      border: "none",
      background: "linear-gradient(45deg, gold 50%, black 50%)",
      backgroundSize: "200%",
      color: "#fff",
      outline: "none",
      transition: "0.5s",
      cursor: "pointer",
  
      "&:hover": {
        backgroundPosition: "right",
      },
    },
    formItem: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    formControl: {
      margin: theme.spacing(1),
    },
    input: {
      display: "none",
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
  }));
  

const AddCourse = (props) => {
    const classes = useStyles();
    const {courseIndex} = useSelector((state) => state.coursesIndex);
    const {group} = useSelector((state) => state.auth)
    const {courseType, isEdit, selectedCourse, loading, success, error, tabIndex} = useSelector((state) => state.courseManage)
    const {preview}= props;
    const dispatch = useDispatch();
   
   const user = JSON.parse(localStorage.getItem("user"));
   const [selectedImage, setSelectedImage] = useState(null);
   const [selectedDate, setSelectedDate] = useState(new Date());
   const { enqueueSnackbar } = useSnackbar();
   const shadowStyles = useSoftRiseShadowStyles();

   useEffect(() => {
    if (selectedCourse && selectedCourse.ngayTao) {
      const arr = selectedCourse.ngayTao.split("/");
      const dd = arr[0];
      const mm = arr[1];
      const yyyy = arr[2];
      setSelectedDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } else if (success) {
      enqueueSnackbar(success, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [error, success, enqueueSnackbar]);

  let initialValues = {
    courseId: "",
    urlName: "",
    courseName: "",
    detail: "",
    views: 0,
    rate: 0,
    imageUrl: "",
    group: group,
    dateCreated: selectedDate,
    courseCode: "",
    creator: user ? user.taiKhoan : "",
  };

  if ((isEdit && selectedCourse) || (preview && selectedCourse)) {
    initialValues = {
      courseId: selectedCourse.maKhoaHoc,
      urlName: selectedCourse.biDanh,
      courseName: selectedCourse.tenKhoaHoc,
      detail: selectedCourse.moTa,
      views: selectedCourse.luotXem,
      rate: selectedCourse.danhGia,
      imageUrl: selectedCourse.hinhAnh,
      group: selectedCourse.maNhom,
      dateCreated: selectedDate,
      courseCode: selectedCourse.danhMucKhoaHoc.maDanhMucKhoahoc,
      creator: selectedCourse.nguoiTao.taiKhoan,
    };
  }

  let validationSchema = Yup.object().shape({
    courseId: Yup.string().required("Must input a course Id"),
    urlName: Yup.string(),
    courseName: Yup.string().required("Must input a course name"),
    detail: Yup.string().required("Detail is required"),
    views: Yup.number(),
    imageUrl: Yup.string(),
    group: Yup.string().required("Group is required"),
    dateCreated: Yup.date().required("Must input a created day"),
    creator: Yup.string().required("Must input creator"),
    courseCode: Yup.string().required("Must input course index"),
  });

  const onAddCourse = (values, selectedImage, isEdit, group, courseType, tabIndex, selectedDate) =>{
    dispatch(addCourse(values, selectedImage, isEdit, group, courseType, tabIndex, selectedDate));
}
const handleSubmit = (values, { setSubmitting, resetForm }) => {
    onAddCourse(
      values,
      selectedImage,
      isEdit,
      group,
      courseType,
      tabIndex,
      selectedDate
    );
    resetForm();
    setSubmitting(false);
  };

  return (
    <Card className={cx(classes.root, shadowStyles.root)}>
    <CardContent className={classes.content}>
      {preview ? null : (
        <Box mb={5}>
          <Typography variant="h4" align="center">
            {isEdit ? "EDIT COURSE" : "ADD COURSE"}
          </Typography>
        </Box>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, dirty, isValid, values, ...props }) => {
          // console.log(values);

          return (
            <Form style={{ overflow: "hidden" }}>
              <Box mb={2} display={"flex"} flexWrap="nowrap">
                <Box flexGrow={1} alignSelf="flex-end" mr={1}>
                  <Card style={{ height: "100% !important", padding: 0 }}>
                    <Box>
                      {values.imageUrl ? (
                        <CardMedia
                          className={classes.media}
                          image={values.imageUrl}
                        />
                      ) : (
                        <Box
                          m={1}
                          p={1}
                          border={1}
                          height={176}
                          display={"flex"}
                          alignItems="center"
                          justifyContent="center"
                          borderColor="grey.400"
                        >
                          <Typography align="center" color="textSecondary">
                            Please upload an image
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box m={1}>
                      <RatingCourse />
                    </Box>
                    <Box mb={1}>
                      <InputField
                        label="Course Name"
                        name="courseName"
                        disabled={isEdit || preview}
                      />
                    </Box>
                  </Card>
                </Box>

                <Box flexGrow={1} alignSelf="flex-end">
                  <Card style={{ height: "100%", padding: 0 }}>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="stretch"
                    >
                      <InputField
                        label="Course ID"
                        name="courseId"
                        disabled={isEdit || preview}
                      />
                      <InputField
                        label="Creator"
                        name="creator"
                        disabled={preview}
                      />
                      <InputField
                        label="Views"
                        name="views"
                        disabled={preview}
                      />
                      <Box mx={1}>
                        <DatePicker
                          disabled={preview}
                          value={selectedDate}
                          pickSelectedDate={(date) => setSelectedDate(date)}
                        />
                      </Box>
                    </Grid>
                  </Card>
                </Box>
              </Box>

              <Card style={{ padding: 0 }}>
                <InputField
                  label="Description"
                  name="detail"
                  disabled={preview}
                />
                <Box display={"flex"} flexWrap="wrap">
                  <Box flexGrow={1}>
                    <InputSelect
                      label="Course Type"
                      name="courseCode"
                      items={courseIndex}
                      disabled={preview}
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <InputSelect
                      label="Group"
                      name="group"
                      items={groupItems}
                      disabled={preview}
                    />
                  </Box>
                </Box>

                {preview ? null : (
                  <Box m={1}>
                    <DropzoneArea
                      filesLimit={1}
                      showAlerts={false}
                      acceptedFiles={["image/*"]}
                      dropzoneText={"Drag and drop an image here or click"}
                      onChange={(image) => setSelectedImage(image[0])}
                    />
                  </Box>
                )}
              </Card>

              {preview ? null : (
                <Box align="center" mx={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading || !isValid}
                    onClick={submitForm}
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Form>
          );
        }}
      </Formik>
    </CardContent>
  </Card>
  )
}

export default AddCourse