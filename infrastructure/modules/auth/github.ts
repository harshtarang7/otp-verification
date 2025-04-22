import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import * as dotenv from "dotenv";

dotenv.config();

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        const user = {
          provider: 'github',
          id: profile.id,
          username: profile.username,
          email: profile.emails?.[0]?.value,
        };
        return done(null, user);
      }
)
)