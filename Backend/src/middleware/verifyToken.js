import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    console.log('Authorization header not found');
    return res.status(401).json({ message: 'Access Denied. No Authorization Header.' });
  }

  const token = authHeader.split(' ')[1];
  

  if (!token) {
    console.log('Token not found');
    return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    console.log('authrization approved');
    
    next();
  } catch (error) {
    console.log('Invalid token',error);
    return res.status(403).json({ message: 'Invalid Token' });
  }
};
