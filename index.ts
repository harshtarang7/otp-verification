
import express from 'express';
import { initialiseDatabase } from './dbconfig/db.config.js';
import { initAuthRouter } from './routes/auth.routes.js';
import { initOtpRouter } from './routes/otp.routes.js';
import session from 'express-session';
import passport from 'passport';
import './infrastructure/modules/auth/google.js';
import './infrastructure/modules/auth/github.js';
import thirdPartyAuth from './routes/external.login.routes.js'
import cors from 'cors'

const app = express();
const dataSource = await initialiseDatabase();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}))
app.use(
  session({
    secret:'my-secret',
    resave:false,
    saveUninitialized:true
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user as any));

app.use('/external-auth',thirdPartyAuth)

app.use('/auth',initAuthRouter(dataSource))
app.use('/otp',initOtpRouter(dataSource))

const port = 3001

app.listen(port, async() => {
  console.log('Server running on',port);
});
