import { User } from '../models/user.models.js';

const handleUserSignUp = async (req, res) => {
  let { username, email, password, jobTitle } = req.body;
  if (!username || !email || !password || !jobTitle) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    const newUser = await User.create({
      username,
      email,
      password,
      jobTitle
    });

    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  } catch (error) {
    console.error('Error during user sign up:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  return res.json(User)
};

export default handleUserSignUp;