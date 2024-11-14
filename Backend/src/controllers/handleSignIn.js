import dotenv from 'dotenv';
import { User } from '../models/user.models.js';

dotenv.config();

const handleSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received sign-in request for email:', email);

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = await user.genAuthToken();
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        username: user.username,
        jobTitle: user.jobTitle,
        age: user.age
      }
    });
  } catch (error) {
    console.error('Error during sign-in:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handleSignIn;
