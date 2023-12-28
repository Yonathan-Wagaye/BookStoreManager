import express from "express";
import './config.mjs';
import Book from "./models/bookModel.mjs";
import bookRoutes from "./routes/bookRoutes.mjs";
import cors from 'cors';
import mongoose from "mongoose";




const PORT = process.env.PORT;

mongoose.connect(process.env.DNS);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/books', bookRoutes);



app.listen( PORT|| 3000);
