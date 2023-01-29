const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorHander = require("../utils/errorHander");

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        console.log(token);
        if (!token) {
            return next(new ErrorHander("Please Login first", 401));
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await userModel.findById(decodedData.id);
        next();
    } catch (error) {
        next(error);
    }
}