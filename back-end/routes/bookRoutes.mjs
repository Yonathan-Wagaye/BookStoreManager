import { Router } from "express";
import Book from "../models/bookModel.mjs";

const router = Router();

// show all books 
router.get('/', async (req, res) => {
    const books = await Book.find({});
    res.json(books);
})

// add new book
router.post('/', async (req,res) => {
    const bookObj = req.body;

    const book = new Book({title: bookObj.title, author: bookObj.author, publishedYear: bookObj.publishedYear});
    
    const savedBook = await book.save();
    res.json(savedBook);
    
})


// a single book detail view 
router.get('/:id', async (req, res)=> {
    const id = req.params.id;
    const book = await Book.findById(id);

    res.json(book);
})

// a book update page 
router.put('/:id', async (req, res) => {
    const bookId = req.params.id;
    const updateObj = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateObj, {new: true});

    res.json({message: 'Book updated sucessfully'});
})

// delete book
router.delete('/:id', async (req, res) => {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(bookId);
    res.json({ message: 'Book deleted successfully' });
})

export default router;