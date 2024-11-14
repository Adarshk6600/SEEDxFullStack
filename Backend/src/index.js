import dotenv from "dotenv";
import express from "express";  // Add this import
import connectDB from "./db/index.js"; 
import userRouter from './Routes/userSignUp.js'; 
import loginRouter from './Routes/signIn.js'; 
import tradingRouter from './Routes/Trading.js'; 
import cors from "cors"
import homeRouter from './Routes/home.js'

dotenv.config({
  path: './.env'
});

const app = express(); 
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/trading', tradingRouter); 
app.use('/home',homeRouter )

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database connection failed', err);
    process.exit(1);
  });
