import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const publishedYearRef = useRef(null);
  const navigate = useNavigate();
  const url = `http://localhost:3001/books/${id}`;

  useEffect(() => {
    const findBook = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Error while finding book...');
        }
        const bookData = await res.json();
        setBook(bookData);
      } catch (error) {
        console.log('Error: ', error.message);
      } finally {
        setLoading(false); // Set loading to false when the fetch operation is done
      }
    };
    findBook();
  }, [id, url]);

  const handleSubmit = async () => {
    // ... rest of the code
  };

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while fetching data
  }

  return (
    <div className="p-20">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Book</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-2">
          Book Title
          <input type="text" className="w-full border p-2" ref={titleRef} defaultValue={book.title} />
        </label>

        <label className="block mb-2">
          Author
          <input type="text" className="w-full border p-2" ref={authorRef} defaultValue={book.author} />
        </label>

        <label className="block mb-2">
          Publication Year
          <input type="text" className="w-full border p-2" ref={publishedYearRef} defaultValue={book.publishedYear} />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBook;
