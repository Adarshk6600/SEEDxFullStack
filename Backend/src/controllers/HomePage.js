export const HomePage = (req, res) => {
  const { username } = req.user;
  res.status(200).json({
    message: `Welcome to the home page, ${username}!`,
    home: [],
  });
};




