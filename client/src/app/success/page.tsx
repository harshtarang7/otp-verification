"use client";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import googleIcon from "../asset/googleIcon.png";
import github from "../asset/github.png";
import { login } from "@/services/auth.service";
import {Bounce, toast, ToastContainer} from "react-toastify"
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      if(res){
        toast.success('login successfull')
        setTimeout(()=>{
          router.push('/get-otp')
        },700)
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpClick= ()=>{
    router.push('/sign-up')
  }
  return (
    <Grid
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor:'rgb(167, 144, 42)',
        textAlign:'center'
      }}
    >
      
        <Typography fontSize={24} > Registered Successfully</Typography>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </Grid>
  );
}
