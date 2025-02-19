import express from "express";
import cors from 'cors'
const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods:'GET, POST, PATCH, DELETE, PUT'
}))

//common middlewares

app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({extended:true, limit:'20kb'}))
app.use(express.static('public'))
export { app }