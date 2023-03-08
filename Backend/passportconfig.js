const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcryptjs");
const Config = require("../Backend/src/config/config")
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

passport.use(
    "jwtAdm",
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.jwt.secret,
    },
    async (payload,done)=>{
      try {
          // console.log(payload);
  
          if(!payload.sub){
              return done(null,{id:0})
          }
  
          if(!payload.name){
              return done(null,{id:0})
          }
  
          if(!payload.exp){
              return done(null,{id:0})
          }else{
              const current_time = Math.round(new Date().getTime() / 1000);
              if (current_time > payload.exp) {
                  return done(null, { id: 0 });
              }
          }
  
          const user = await User.findOne({email:cryptr.decrypt(payload.name)});
          // console.log("user", user);
          if(user){
              // console.log("user[0]",user[0]);
              done(null, user[0]);
  
          }else{
              return done(null, { id: 0 });
          }
  
      } catch (error) {
          console.log(error);
          return done(error,user[0]);
      }
    }
    
    )
  );
