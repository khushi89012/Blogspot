const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcryptjs");

const User = require("./src/Models/registerModel");


// compare bcrypt password
isValidPassword = async function (newPassword, existiongPassword) {
    try {
      return await bcrypt.compare(newPassword, existiongPassword);
    } catch (error) {
      throw new Error(error);
    }
  };
// module.exports =(passport)=>{
passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                // check if user exists
                const userExists = await User.findOne({ "email": email });
                console.log(userExists)
                if (userExists) {
                    console.log("user already eixist")
                    return done(null, false)
                }
                // Create a new user with the user data provided
                const user = await User.create({ email, password })
                return done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)
// }

passport.use(
    "local-login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                if (!user) return done(null, false);
                console.log("user-login",user)
                const isMatch = await isValidPassword(password, user.password);
                console.log("user-ismatch",isMatch);

                
                if (!isMatch)
                    return done(null, false);
                // if passwords match return user
                return done(null, user);
            } catch (error) {
                console.log(error)
                return done(error, false);
            }
        }
    )
);
