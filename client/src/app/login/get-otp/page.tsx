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
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import googleIcon from "../../asset/googleIcon.png";
import github from "../../asset/github.png";
import { getOtp, login, signUp } from "@/services/auth.service";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function GetOtp() {
  const {id} = useParams();
   const searchParams = useSearchParams();
  const router = useRouter()
  const emailfromParam = searchParams.get('email');
  const idfromParam = searchParams.get('id');
  const userId = Number(idfromParam)
  const email = String(emailfromParam)
  console.log(typeof userId)
  // const [email, setEmail] = useState("");
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

  const handleGetOtp = async () => {
    try {
      const res = await getOtp({ email, password });
      if (res) {
        toast.success("otp sent successfully");
       
      }
      setTimeout(()=>{
        router.push(`/login/get-otp/${userId}/otp-verify`)
      },700)
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Card
        sx={{
          width: "40%",
          height: "46%",
          top: "50%",
          left: "50%",
          position: "relative",
          transform: "translate(-50%,-50%)",
          borderRadius: 0,
          display: "flex",
          border: "2px solid black",
          boxShadow: "8px 6px 0px 0px black",
        }}
      >
        <Card sx={{ width: "100%", background: "rgb(255, 231, 182)" }}>
          <Box padding={2} display={"flex"} flexDirection={"column"}>
            <Typography textAlign={"center"} fontSize={20} fontWeight={700}>
              GET OTP 
            </Typography>

            <FormControl sx={{ padding: 1 }}>
              <Typography>Email</Typography>
              <TextField
                type="email"
                value={emailfromParam}
                size="small"
                placeholder="Your email here.."
                // onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  my: 1,
                  border: "1px solid black",
                  boxShadow: "4px 2px 0px 0px black",
                }}
              />
            </FormControl>

            {/* <Divider sx={{ backgroundColor: "lightgrey" }} /> */}
            <FormControl sx={{ padding: 1 }}>
              <Typography>Password</Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                value={password}
                size="small"
                placeholder="Your password here.."
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  my: 1,
                  border: "1px solid black",
                  boxShadow: "4px 2px 0px 0px black",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

          
          
              <Grid size={{ lg: 12, sm: 12, md: 6 }}>
                <Button
                  onClick={handleGetOtp}
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff",
                    p:1,
                    my: 1,
                    border: "1px solid black",
                    boxShadow: "3px 2px 0px 0px black",
                    color: "black",
                    width: "40%",
                  }}
                >
                  Get OTP
                </Button>
            </Grid>
          </Box>
        </Card>
      </Card>
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
