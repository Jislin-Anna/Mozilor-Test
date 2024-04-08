
import jwt from "jsonwebtoken";
import { getUser, createUser } from '../models/user.model.js';

const createToken = user => {
    return jwt.sign(
        {
            username: user?.username,
            email: user?.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );
};

const login = async (req, res, next) => {
    try {

        const { email = "", password = "" } = req.body;

        // 1) check if email and password exist
        if (!email || !password) {
            return res.status(404).json({
                "message": "Please provide email or password"
            })
        }

        // 2) check if user exist and password is correct
        const user = await getUser(email, password)

        if (!user || !user?.length) {
            return res.status(400).json({
                "message": "Invalid email or password!"
            })
        }

        // 3) All correct, send jwt to client
        const token = createToken(user[0]);

        // Remove the password from the output
        user.password = undefined;

        res.status(200).json({
            status: "success",
            token,
            data: {
                user: user[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

const signup = async (req, res, next) => {
    try {
        const { email = "", password = "", username = "" } = req.body;

        // 1) check if email and password exist
        if (!email || !password || !username) {
            return res.status(404).json({
                "message": "Please provide all details"
            })
        }
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        // Test if the input email matches the regex pattern
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                "message": "Please provide valid email id!"
            })
        }
        let user = {
            username,
            email,
            password
        };

        let result = await createUser(user)

        if (result?.length) {
            return res.status(400).json({
                "message": "email already exists!"
            })
        }
        const token = createToken(user);

        user.password = undefined;

        res.status(201).json({
            status: "success",
            token,
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

// exports.protect = async (req, res, next) => {
//   try {
//     // 1) check if the token is there
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }
//     if (!token) {
//       return next(
//         new AppError(
//           401,
//           "fail",
//           "You are not logged in! Please login in to continue",
//         ),
//         req,
//         res,
//         next,
//       );
//     }

//     // 2) Verify token
//     const decode = await jwt.verify(token, process.env.JWT_SECRET);

//     // 3) check if the user is exist (not deleted)
//     const user = await User.findById(decode.id);
//     if (!user) {
//       return next(
//         new AppError(401, "fail", "This user is no longer exist"),
//         req,
//         res,
//         next,
//       );
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

export { login, signup }