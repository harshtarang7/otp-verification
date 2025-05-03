"use client";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
// import { verifyOtp } from "@/services/auth.service"; // Adjust path accordingly

export default function VerifyOTP() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const res = await verifyOtp({ email, otp });
      if (res) {
        toast.success("OTP Verified Successfully");
        setTimeout(() => {
          router.push("/dashboard"); // or desired route
        }, 1000);
      }
    } catch (error) {
      toast.error("OTP Verification Failed");
      console.error(error);
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
          width: "35%",
          height: "50%",
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
            <Typography textAlign={"center"} fontWeight={600}>
              OTP Verification
            </Typography>

            <FormControl sx={{ padding: 1 }}>
              <Typography>Email</Typography>
              <TextField
                type="email"
                value={email}
                size="small"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  my: 1,
                  border: "1px solid black",
                  boxShadow: "4px 2px 0px 0px black",
                }}
              />
            </FormControl>

            <FormControl sx={{ padding: 1 }}>
              <Typography>Enter OTP</Typography>
              <TextField
                type="text"
                value={otp}
                size="small"
                placeholder="Enter 6-digit OTP"
                onChange={(e) => setOtp(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  my: 1,
                  border: "1px solid black",
                  boxShadow: "4px 2px 0px 0px black",
                }}
              />
            </FormControl>

            <Button
              onClick={handleVerify}
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                my: 2,
                border: "1px solid black",
                boxShadow: "3px 2px 0px 0px black",
                color: "black",
              }}
            >
              Verify OTP
            </Button>
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
