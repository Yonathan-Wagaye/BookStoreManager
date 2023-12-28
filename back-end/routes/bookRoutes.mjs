import { Router } from "express";
import Book from "../models/bookModel.mjs";

const router = Router();

// show all books 
router.get('/', async (req, res) => {
    const books = await Book.find({});
    res.json(books);
})

// add new book
router.post('/', (req,res) => {
    res.send('adding books');
})


// a single book detail view 
router.get('/:id', (req, res)=> {
    res.send('Book detail page');
})

// a book update page 
router.put(':/id', (req, res) => {
    res.send('book update page');
})

// delete book
router.delete(':/id', (req, res) => {
    res.send('delete a single book');
})

export default router;