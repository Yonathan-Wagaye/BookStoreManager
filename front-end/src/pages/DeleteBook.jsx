import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DeleteBook = () => {
    const {id} =  useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const deleteBook = async () => {
            try
            {
                const url = `http://localhost:3001/books/${id}`;
                const opts = {
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                   
                }
                const res = await fetch(url, opts);
                
                

                if(!res.ok)
                {
                    throw new Error('Error while deleting book...');
                }
                const data = await res.json();
                navigate('/');
            }
            catch(error)
            {
                console.log('Error: ', error.message);
            }
        }
        deleteBook();
    }, [id, navigate]);
    return (
        <div>
            <p> Deleting book with id {id}...</p>
        </div>
    )
}

export default DeleteBook;