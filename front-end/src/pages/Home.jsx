import React, {useEffect, useState} from 'react'
import Spinner from '../components/Spinner';
import { FaInfo, FaEdit, FaTrash , FaPlusCircle} from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, SetLoading] = useState(false);
    const url = 'http://localhost:3001/books';

    useEffect(()=> {
        SetLoading(true);
        const fectchBooks = async () => {
            try
            {
                const res = await fetch(url);
                if(!res.ok)
                {
                    throw new Error(`Http respose error! Status: ${res.status}`)
                }
                const bookData = await res.json();
                setBooks((prevBooks) => [...prevBooks, ...bookData]);
            }
            catch(error)
            {
                console.log('Erorr fectching books: ', error);
            }
            finally
            {
                SetLoading(false);
            }
            

        }
        fectchBooks();
        
        
    }, [])
    const BookTable = 
                    <>
                        
                        <div className="container mx-auto mt-8">
                            <header className="header bg-gray-800 text-white py-4">
                                <h1 className="text-3xl font-bold text-center">Book Store Manager</h1>
                            </header>
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr> 
                                        <th className="py-2 px-4 border-b">No</th>
                                        <th className="py-2 px-4 border-b">Title</th>
                                        <th className="py-2 px-4 border-b">Author</th>
                                        <th className="py-2 px-4 border-b">Published Year</th>
                                        <th className="py-2 px-4 border-b">Operations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {books.map((book, index) => (
                                    <tr key={book._id} className="hover:bg-gray-100">
                                        <td className='py-2 px-4 border text-center'>{index + 1}</td>
                                        <td className="py-2 px-4 border text-center">{book.title}</td>
                                        <td className="py-2 px-4 border text-center">{book.author}</td>
                                        <td className="py-2 px-4 border text-center">{book.publishedYear}</td>
                                        <td className="py-2 px-4 border text-center">
                                            <span className="flex items-center justify-center">
                                                <Link to={`/books/details/${book._id}`}>
                                                    <FaInfo className="mr-2" /> 
                                                </Link>
                                                <Link to={`/books/edit/${book._id}`}>
                                                    <FaEdit className="mx-2" />
                                                </Link>
                                                <Link to={`/books/delete/${book._id}`}>
                                                    <FaTrash className="ml-2" />  
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Link to='books/create'>
                                <FaPlusCircle size={40} className="text-blue-500 cursor-pointer"/>
                            </Link>  
                        </div>
                    </>
    return (
        <div>
            {loading ? <Spinner /> : BookTable}
        </div>
    )
}

export default Home;