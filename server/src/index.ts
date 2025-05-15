import express from "express";
import { Server } from "socket.io";
import cors from 'cors'
import http from 'http'
import { createSocket } from "./socket";


const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors: {origin:'*'}
})
app.use(cors())
app.use(express.json())

createSocket(io)

server.listen(3001,()=>console.log('server running'))