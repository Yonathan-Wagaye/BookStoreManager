import React, {useRef} from 'react'
import { useNavigate, redirect } from 'react-router-dom';

const CreateBook = () => {
    const titleRef = useRef(null);
    const authorRef  = useRef(null);
    const publishedYearRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = titleRef.current.value;
        const author = authorRef.current.value;
        const publishedYear = publishedYearRef.current.value;
        

        const url = 'http://localhost:3001/books';

        const book = {title, author, publishedYear};

        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(book),
        }

        try 
        {
            const res = await fetch(url, opts);
            if(!res.ok)
            {
                throw new Error('Failed to add book');
            }
            navigate('/');

        }
        catch(error)
        {
            console.log('Error: ', error.message);
        }
        
    }
    

    
  return (
    <div className="p-20">
        <div className="mb-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Book</h1>
        </div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <label className="block mb-2">
                Book Title
                <input type='text' className="w-full border p-2" ref={titleRef} />
            </label>
            
            <label className="block mb-2">
                Author
                <input type='text' className="w-full border p-2" ref={authorRef}/>
            </label>
            
            <label className="block mb-2">
                Publication Year
                <input type='text' className="w-full border p-2" ref={publishedYearRef}/>
            </label>
            <button type='submit' className="bg-blue-500 text-white p-3 rounded w-full">Create</button>
        </form>
    </div>
  )
}

export default CreateBook;