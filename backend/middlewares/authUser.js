import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route (No token)' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    // Safely attach user info to req
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error("JWT verify failed:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authUser;
