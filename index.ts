
import express from 'express';
import { initialiseDatabase } from './dbconfig/db.config.js';
import { initAuthRouter } from './routes/auth.routes.js';
import { initOtpRouter } from './routes/otp.routes.js';
import session from 'express-session';
import passport from 'passport';
import './auth/google';
import './auth/github';
import thirdPartyAuth from './routes/external.login.routes.js'

const app = express();
const dataSource = await initialiseDatabase();

app.use(express.json());
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

const port = 3000

app.listen(port, async() => {
  console.log('Server running on',port);
});
