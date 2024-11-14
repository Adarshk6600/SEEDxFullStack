export const tradeHandler = (req, res) => {
  const { username } = req.user;
  res.status(200).json({
    message: `Welcome to the trading page, ${username}!`,
    trades: [],
  });
};
