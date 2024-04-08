import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    // 1) check if the token is there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Check if user is authenticated
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Failed to verify token:', err);
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            return next();
        }
    });



};

export default isAuthenticated;