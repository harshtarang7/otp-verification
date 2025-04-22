import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: '/auth/google/callback',
        },
        async(accessToken, refreshToken,profile, done)=>{
            const user = {
                provider:'google',
                id: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
            }
            return done(null, user);
        }
    )
)