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
import googleIcon from "../asset/googleIcon.png";
import github from "../asset/github.png";
import { login, signUp } from "@/services/auth.service";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSignUp = async () => {
    try {
      const res = await signUp({ name, email, password, dob });
      if (res) {
        toast.success("sign up successfull");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = ()=>{
    router.push('/login')
  }

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
          height: "85%",
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
            {/* <Typography
              py={1}
              textAlign={"center"}
              fontSize={21}
              fontWeight={700}
            >
              OTPEEEE
            </Typography> */}
            <Typography textAlign={"center"} fontWeight={500}>
              Create Your Account
            </Typography>

            <FormControl sx={{ padding: 1 }}>
              <Typography>Name</Typography>
              <TextField
                type="text"
                value={name}
                size="small"
                placeholder="Your email here.."
                onChange={(e) => setName(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  my: 1,
                  border: "1px solid black",
                  boxShadow: "4px 2px 0px 0px black",
                }}
              />
            </FormControl>

            <FormControl sx={{ padding: 1 }}>
              <Typography>Email</Typography>
              <TextField
                type="email"
                value={email}
                size="small"
                placeholder="Your email here.."
                onChange={(e) => setEmail(e.target.value)}
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

            <FormControl sx={{ padding: 1 }}>
              <Typography>Date of Birth</Typography>
              <TextField
                type="date"
                value={dob}
                size="small"
                placeholder="Your email here.."
                onChange={(e) => setDob(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  my: 1,
                  border: "1px solid black",
                  boxShadow: "4px 2px 0px 0px black",
                }}
              />
            </FormControl>
            <Grid
              container
              spacing={1}
              mt={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid size={{ lg: 6, sm: 12, md: 6 }}>
                <Button
                  onClick={handleSignUp}
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff",
                    my: 1,
                    border: "1px solid black",
                    boxShadow: "3px 2px 0px 0px black",
                    color: "black",
                    width: "100%",
                  }}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid size={{lg:6,sm:12,md:6}}>
                <Button  
                onClick={handleLogin}
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff",
                    my: 1,
                    border: "1px solid black",
                    boxShadow: "3px 2px 0px 0px black",
                    color: "black",
                    width: "100%",
                  }}>Have an Account?</Button>
              </Grid>
              <Grid size={{ lg: 10, sm: 12, md: 12 }}>
                <Grid container  mt={2} alignItems={'center'} justifyContent={'center'}>
                  <Grid size={{ lg: 2 }}>
                    <Typography>Or with?</Typography>
                  </Grid>
                  <Grid size={{ lg: 9 }}>
                    <Tooltip title=" google?">
                      <Button
                        variant="text"
                        sx={{

                          backgroundColor: "transparent",
                          //  my: 1,
                          //  border: "1px solid black",
                          //  boxShadow: "3px 2px 0px 0px black",
                          //  color:'black',
                          //  width:'20%'
                        }}
                      >
                        <Image
                          src={googleIcon}
                          alt="google"
                          width={40}
                          height={40}
                        />
                      </Button>
                    </Tooltip>

                    <Tooltip title="github?">
                      <Button
                        variant="text"
                        sx={{
                          backgroundColor: "transparent",
                          //  my: 1,
                          //  border: "1px solid black",
                          //  boxShadow: "3px 2px 0px 0px black",
                          //  color:'black',
                          //  width:'20%'
                        }}
                      >
                        <Image
                          src={github}
                          alt="github"
                          width={40}
                          height={40}
                        />
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
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

