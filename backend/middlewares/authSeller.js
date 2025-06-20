import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  console.log("Received cookies:", req.cookies);

  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route (No token)' });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    console.log("Expected SELLER_EMAIL:", process.env.SELLER_EMAIL);

    if (decoded.id === process.env.SELLER_EMAIL) {
      req.seller = { id: decoded.id };
      return next();
    } else {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route (Invalid email)' });
    }
  } catch (error) {
    console.error("JWT verify failed:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authSeller;
