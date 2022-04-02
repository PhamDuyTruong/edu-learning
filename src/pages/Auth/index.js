import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Formik, Form, Field, useField} from 'formik';
import {Link, withRouter} from 'react-router-dom'


import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, CssBaseline, FormGroup } from "@material-ui/core";
import { NativeSelect } from "@material-ui/core";

import { useSnackbar } from "notistack";
import * as Yup from "yup";

import {auth, authStart} from '../../actions/authAction'

const useStyles = makeStyles((theme) =>({
    container:{
      minHeight: "100vh",
      background: "linear-gradient(45deg, #4D96FF 50%, white 50%)",
    },
    loginForm: {
      width: "20rem",
      background: "#f1f1f1",
      minHeight: "35rem",
      padding: "0 2rem",
      borderRadius: "1rem",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    formItem: {
      width: "100%",
      position: "relative",
      height: "3rem",
      margin: "0.2rem 0",
      overflow: "hidden",
  
      "& input": {
        width: "100%",
        height: "100%",
        color: "black",
        outline: "none",
        border: "none",
        background: "none",
        padding: "2rem 0",
  
        "&:focus+label span, &:valid+label span": {
          transform: "translateY(-90%)",
          color: "black",
          fontSize: "0.9rem",
        },
  
        "&:focus+label::after, &:valid+label::after": {
          transform: "translateX(0)",
        },
      },
  
      "& label": {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        borderBottom: "1px solid #black",
  
        "&:after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: "-0.15rem",
          width: "100%",
          height: "100%",
          borderBottom: "3px solid black",
          borderImage: "linear-gradient(90deg, gold 50%, black 50%) 1 round",
          transform: "translateX(-100%)",
          transition: "transform 0.6s ease",
        },
  
        "& span": {
          position: "absolute",
          bottom: "0.3rem",
          left: 0,
          color: "black",
          transition: "all 0.3s ease",
        },
      },
    },
  loginBtn: {
    marginTop: "2rem",
    display: "block",
    width: "100%",
    height: "3rem",
    border: "none",
    borderRadius: "5px",
    background: "linear-gradient(45deg, #4D96FF 50%, black 50%)",
    backgroundSize: "250%",
    color: "#f0f0f0",
    outline: "none",
    transition:"5s",
    cursor:"pointer",
    fontWeight: "bold",
    
    "&:hover": {
      backgroundPosition: "right",
    },
  },

  bottomText:{
    textAlign: "center",
    fontSize:"0.9rem"
  },
  link: {
    textDecoration: "none",
    fontWeight  : "bold",
    color: "gold",

    "&:hover":{
      color: "black",
      fontWeight: "bold",
    }
  },
}));

const InputCustom = ({label, ...props}) =>{
     const classes = useStyles();
     const [field, meta] = useField(props);
     const { enqueueSnackbar } = useSnackbar();

     useEffect(() =>{
      if (meta.touched && meta.error) {
        enqueueSnackbar(meta.error, {
          preventDuplicate: true,
          variant: "info",
        });
      }
     },[meta, enqueueSnackbar]);

     return (
       <>
          <Box className={classes.formItem}>
            <Typography component={Field} required {...field} {...props} />
             <Typography component="label" htmlFor={props.id || props.name}>
                <span>{label}</span>
             </Typography>
          </Box>
       </>
     )
}

const Auth = (props) => {
  const classes = useStyles();
  const {success, error} = useSelector((state) => state.auth)
  const {history, match} = props;
  const dispatch = useDispatch();
  const isSignUp = match && match.url === "/sign-up";
  //console.log("is sign up: ", isSignUp )
  const { enqueueSnackbar } = useSnackbar();

  const onAuth = (values, history, isSignUp) =>{
        dispatch(auth(values, history, isSignUp))
  }
  let initialValue ={
    username: "",
    password: ""
  }
  let validationSchema = Yup.object().shape({
     username: Yup.string().min(3, "Name must be at least 3 characters").max(15, "Name must be 15 characters or less")
     .required("Must enter name"),
     password: Yup.string().min(6, "Password must be at least 6 characters").required("Must enter password")
  });

  
  if (isSignUp) {
    initialValue = {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      group: "GP08",
      email: "",
    };
    validationSchema = Yup.object().shape({
      username: Yup.string().min(3, "Name must be at least 3 characters").max(15, "Name must be 15 characters or less")
      .required("Must enter name"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Must enter password"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
      name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be 15 characters or less")
      .required("Must enter a name"),
      group: Yup.string().required("Group is required"),
      phone: Yup.number()
      .min(10, "Phone number must be at least 10 characters")
      .required("Must enter a phone number"),
      email: Yup.string()
      .email("Must be a valid email address")
      .required("Must enter an email"),
    })
  };

  useEffect(() =>{
    if(error){
      enqueueSnackbar(error, { variant: "error" });
    } else if(success){
      enqueueSnackbar(success, { variant: "success" });
    };
    dispatch(authStart());
  }, [error, success,enqueueSnackbar]);

  const onSubmit = (values, { setSubmitting }) => {
    onAuth(values, history, isSignUp);
    setSubmitting(false);
  };

  return (
    <Box className={classes.container}>
        <CssBaseline />
        <Formik
           initialValues={initialValue}
           validationSchema={validationSchema}
           onSubmit={onSubmit}
        >
          {(props) =>(
            <Form className={classes.loginForm}>
              <Box mt={isSignUp ? 5 : 10} mb={isSignUp ? 3 : 5}>
                <Typography variant="h3" align="center">
                  {isSignUp ? "Sign Up" : "Login"}
                </Typography>
              </Box>
              <FormGroup>
                  <InputCustom label="Username" name="username" type="text"></InputCustom>
                  <InputCustom label="Password" name="password" type="password"></InputCustom>
              </FormGroup>
              {isSignUp ? (
                  <FormGroup>
                      <InputCustom label="Confirm Password" name="confirmPassword" type="password"></InputCustom>
                      <InputCustom label="Name" name="name" type="text"></InputCustom>
                      <InputCustom label="Phone" name="phone" type="text"></InputCustom>
                      <InputCustom label="Email" name= "email" type="email"></InputCustom>
                  </FormGroup>

              ): null}
              <Typography
                    component="button"
                    type="submit"
                    className={classes.loginBtn}
              >
              {props.isSubmitting
                ? "Loading..."
                : isSignUp
                ? "Sign Up"
                : "Login"}
              </Typography>

              <Box
                  mt={isSignUp ? 5 : 10}
                  mb={isSignUp ? 5 : 0}
                  className={classes.bottomText}
              >
                  <Typography>
                     {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                     {isSignUp ? (
                      <Link to="/sign-in" className={classes.link}>
                         Sign In
                       </Link>
                     ):(
                      <Link to="/sign-up" className={classes.link}>
                        Sign Up
                    </Link>
                     )}
                  </Typography>
              </Box>
            </Form>
          )}
        </Formik>
    </Box>
  )
}

export default withRouter(Auth)