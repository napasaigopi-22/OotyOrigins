const models = require("../Models/Models");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { User } = require("../Models/Models");
const { createSecretToken } = require("../Middleware/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.UsersController = async (req, res, next) => {
    try {
        const listOfUsers = await models.User.find({username:req.body.username});
        console.log('username and list of users',req.body.username,listOfUsers)
        return res.json(listOfUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

exports.deleteUserProfile =  async (req, res) => {
    const { _id } = req.body;
    try {
      // Locate and delete the user based on _id
      const result = await UserModel.findByIdAndDelete(_id);
      if (result) {
        res.status(200).json({ message: 'User deleted successfully!' });
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user.' });
    }
  };
  
  
  // Controller to handle editing user profile
  exports.editUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedData = req.body;
  
      const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Error updating profile" });
    }
  };

  module.exports.ChangePassword = async(req,res)=>{
    try{
      const { username, password, userId } = req.body;
      console.log(req.body)
      existingUser = await User.findOne({ 'userId': userId });
      existingUser.password = await bcrypt.hash(password, 12);
      const updateduser = await models.User.updateOne({userId:existingUser.userId},{$set: {'password':existingUser.password}});
      console.log(existingUser.userId);
    }catch (err){
      console.log(err);
    }
  }