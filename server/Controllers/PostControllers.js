const models = require("../Models/Models");

module.exports.CartPost = async (req, res, next) => {
    try {
        const listOfUsers = await models.User.find({});
        return res.json(listOfUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

