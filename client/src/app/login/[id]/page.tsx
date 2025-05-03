"use client";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { verifyOtp } from "@/services/auth.service";

export default function VerifyOTP() {
  const { id } = useParams();
  const userId = Number(id);
  console.log(id)
  const router = useRouter();
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = Number(otpDigits.join(""));
    if (otp.toString().length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({ userId, otp });
      if (res) {
        toast.success("OTP Verified Successfully");
        setTimeout(() => {
          router.push("/success");
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
          backgroundColor: "rgb(255, 231, 182)",
        }}
      >
        <Box padding={4} width={"100%"}>
          <Typography
            textAlign="center"
            fontWeight={700}
            fontSize="1.5rem"
            fontFamily="Courier New, monospace"
          >
            OTP Verification
          </Typography>

          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            gap={2}
            flexWrap="wrap"
          >
            {otpDigits.map((digit, idx) => (
              <TextField
                key={idx}
                inputRef={(el) => (inputRefs.current[idx] = el)}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontFamily: "Courier New, monospace",
                  },
                }}
                sx={{
                  width: 50,
                  height: 60,
                  backgroundColor: "#fff",
                  border: "2px solid black",
                  boxShadow: "3px 2px 0px 0px black",
                }}
              />
            ))}
          </Box>

          <Box textAlign="center" mt={4}>
            <Button
              onClick={handleVerify}
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                border: "2px solid black",
                boxShadow: "3px 2px 0px 0px black",
                color: "black",
                fontFamily: "Courier New, monospace",
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </Box>
      </Card>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        theme="dark"
        transition={Bounce}
      />
    </Grid>
  );
}

