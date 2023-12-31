import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


const ShowBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const url = `http://localhost:3001/books/${id}`;
  

  useEffect(() => {
    const findBook = async () => {
      try 
      {
        const res = await fetch(url);
        if (!res.ok) 
        {
          throw new Error('Error while finding book...');
        }
        const bookData = await res.json();
        setBook(bookData);
      } 
      catch (error) 
      {
        console.log('Error: ', error.message);
      } 
      finally 
      {
        setLoading(false); 
      }
    };
    findBook();
  }, [id, url]);

  if (loading) 
  {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6">Book Detail</h1> 
          <div className="max-w-md bg-white p-8 rounded shadow-md">
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              <p className="text-gray-600 mb-4">{book.author}</p>
              <p className="text-gray-600">Published Year: {book.publishedYear}</p>
          </div>
      </div>
    </>
  );
}

export default ShowBook;