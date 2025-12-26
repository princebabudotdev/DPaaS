import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import authDao from "../modules/auth/auth.dao.js";
import config from "./config.js";
import authService from "../modules/auth/auth.service.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await authDao.findByGoogleId(profile.id);

        if (!user && profile?.emails && profile?.emails?.length > 0) {
          // If not found by googleId, try to find by email
          user = await authDao.findByEmail(profile.emails[0].value);

          if (user) {
            user.googleId = profile.id;
            await user.save();
          }
        }

        if (!user) {
          user = await authService.registerUser({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullname: profile.displayName,
            avatar:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : undefined,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await authDao.findByGithubId(profile.id);

        if (!user && profile?.id && profile?.username) {
          user = await authDao.findByUsername(profile.username);

          if (user) {
            user.githubId = profile.id;
            await user.save();
          }
        }

        if (!user) {
          user = await authService.registerUser({
            githubId: profile.id,
            fullname: profile.displayName,
            username: profile.username,
            email: profile?.emails?.[0]?.value,
            avatar: profile?.photos[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        // throw new Error("Something went wrong" , error);
        console.log(error);
      }
    }
  )
);

export default passport;
