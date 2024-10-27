const { User } = require("../Models/Models");
const { createSecretToken } = require("../Middleware/SecretToken");
const bcrypt = require("bcryptjs");
const models = require("../Models/Models");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password || password.length < 6) {
      return res.status(400).json({ message: "Invalid email or password", success: false });
    }

    console.log("password var value is ", password, User);
    const existingUser = await User.findOne({ 'username': username });

    if (existingUser) {
      console.log("Existing user:", req.body.email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const userobj = new User(req.body.isUser=req.body.isUser==1?true:false);
    userobj.password = await bcrypt.hash(password, 12);

    

    //--------------------generating userid--------------------------
    const listOfUsers = await models.User.find({});
    userobj.userId="user "+(listOfUsers.length+1);
    
    
    console.log("hashed pass is --- ", userobj.password)
    console.log("lalalala--", userobj);


    await userobj.save();
    const token = createSecretToken(userobj._id);
    console.log("kakakaka---", userobj);

    const savedUser = await User.findOne({ email: userobj.email });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    const jwtToken = jwt.sign(
      { username: userobj.username, _id: userobj._id, isUser:userobj.IsUser },
      'Ooty Origins',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      username: userobj.username,
      name: userobj.name,
    });
  } catch (err) {
    console.error("Error during login process:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ username });

    // Generic error message to prevent user enumeration
    const errorMsg = "Authentication failed, email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Trim the password
    const trimmedPassword = password.trim();

    // Compare the password using bcrypt
    const isPassEqual = await bcrypt.compare(trimmedPassword, user.password);
    console.log(isPassEqual)

    if (!isPassEqual) {
      console.log("Password comparison failed");
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { username: user.username, _id: user._id },
      'Ooty Origins',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      username: user.username,
      name: user.name,
      userId:user.userId
    });
  } catch (err) {
    console.error("Error during login process:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
