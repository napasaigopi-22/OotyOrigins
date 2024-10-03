const User = require("../Models/UserModel");
const { createSecretToken } = require("../Middleware/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("existing user- ",email)
      return res.json({ message: "User already exists" });
    }
    console.log(req.body,"+==============+","address")
    const user = await User.create(req.body);
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const errorMsg = 'Auth failed email or password is wrong';
      if (!user) {
          return res.status(403)
              .json({ message: errorMsg, success: false });
      }
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
          return res.status(403)
              .json({ message: errorMsg, success: false });
      }
      const jwtToken = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      )

      res.status(200)
          .json({
              message: "Login Success",
              success: true,
              jwtToken,
              email,
              name: user.name
          })
  } catch (err) {
      res.status(500)
          .json({
              message: "Internal server errror",
              success: false
          })
  }
}