// import jwt from 'jsonwebtoken';
// ;



// const authMiddleware = async(req, res, next) => {
//     const {token} = req.headers; // Extract token from request headers

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized access' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
//         req.body.userId = decoded.id; // Attach user ID to the request body
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error(error);
//         return res.status(403).json({ message: 'Invalid token' }); // Handle invalid token
//     }

// }
// export default authMiddleware;






import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };  // attach user info safely
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
