import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js"

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
    },
        async (accessToken, refreshToken, profile, done) => {
            try {

                const email = profile.emails[0].value;
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    const existingUser = await User.findOne({ email: profile.emails[0].value });

                    if (existingUser) {
                        if (existingUser.provider === "local" && !existingUser.googleId) {
                            existingUser.googleId = profile.id;
                            existingUser.provider = "google";
                            user = await existingUser.save();
                        } else {
                            user = existingUser;
                        }
                    }
                    else {
                        user = await User.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            avatar: profile.photos[0].value,
                            authProvider: "google",
                        });
                    }
                }
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
)