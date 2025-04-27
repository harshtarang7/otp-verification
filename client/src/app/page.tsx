"use client"
import { Box, Card, Divider, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Home() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
          width: "60%",
          height: "70%",
          top: "50%",
          left: "50%",
          position: "relative",
          transform: "translate(-50%,-50%)",
          borderRadius: 0,
          display: "flex",
          border:'2px solid black',
          boxShadow:'8px 6px 0px 0px black'
        }}
      >
       
        <Card sx={{ width: "50%" , background: " linear-gradient(rgb(255, 229, 187),rgb(255, 218, 158))",}} >
          <Box padding={2} display={"flex"} flexDirection={"column"}>
            <Typography py={1} textAlign={"center"} fontSize={21} fontWeight={700}>
              OTPEEEE
            </Typography>
            <Typography textAlign={'center'}>Create an Account</Typography>

            <Card style={{
              border:'1px solid black'
            }}>
              <FormControl sx={{padding:2}}>
                <Typography>Name</Typography>
                <TextField 
                type="text"
                value={name}
                size="small"
                placeholder="Your name here..."
                onChange={(e)=>setName(e.target.value)}
                sx={{
                  backgroundColor:'#f0f0f0',
                  my:1,
                  border:'1px solid black',
                 boxShadow:'4px 2px 0px 0px black'
                }}
                
                />
              </FormControl>
              <Divider sx={{backgroundColor:'black'}}/>
              <FormControl sx={{padding:2}}>
                <Typography>Email</Typography>
                <TextField 
                type="email"
                value={email}
                size="small"
                placeholder="Your email here.."
                onChange={(e)=>setEmail(e.target.value)}
                sx={{
                  backgroundColor:'#f0f0f0',
                  my:1,
                  border:'1px solid black',
                 boxShadow:'4px 2px 0px 0px black'
                }}
                
                />
              </FormControl>

              <Divider sx={{backgroundColor:'black'}}/>
              <FormControl sx={{padding:2}}>
                <Typography>Password</Typography>
                <TextField 
                type={showPassword ? "text" : "password"} 
                value={password}
                size="small"
                placeholder="Your password here.."
                onChange={(e)=>setPassword(e.target.value)}
                sx={{
                  backgroundColor:'#f0f0f0',
                  my:1,
                  border:'1px solid black',
                 boxShadow:'4px 2px 0px 0px black'
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "hide the password" : "display the password"}
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
            </Card>
          </Box>
        </Card>
        <Card sx={{ width: "50%" }}>
          <img
            src={
              "https://media1.tenor.com/m/Y1ITRsobhQ4AAAAC/lets-go-penguin.gif"
            }
            alt="sign up please"
            width={"100%"}
            height={"100%"}
          />
        </Card>
      </Card>
    </Grid>
  );
}
