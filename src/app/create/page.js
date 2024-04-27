"use client"

import { useState } from 'react';
import { createBook, uploadImage } from '@/fetch/books';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const CreateBook = () => {

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleCreate = async (e) => {
    try {
      await createBook({title, author, publisher, year: +year, pages: +pages, imageUrl});
      Swal.fire({
        icon: "success",
        title: "Book Created!",
        text: "Book created successfully!",
      });
      router.refresh();
      router.push('/books');

    } catch (error) {
      console.error('Error creating book:', error);
      Swal.fire({
        icon: "error",
        title: "Failed To Create Book!",
        text: "Failed to create book.",
      });
    }
  }

  const handleImageUrl = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();

    formData.append("image", image);

    const response = await uploadImage(formData);

    if(response.image_url) {
      setImageUrl(response.image_url)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="bg-gray-400 px-10 py-20 my-10 rounded-lg">
          <h1 className="text-center mb-10 text-2xl font-bold ">Create a New Book</h1>
            <div className="flex flex-col space-y-4">

              <input type="text" placeholder="Enter Title..." className="ml-4 rounded-lg py-1 px-2" onChange={(e) => setTitle(e.target.value)}/>

              <input type="text" placeholder="Enter Author..." className="ml-4 rounded-lg py-1 px-2" onChange={(e) => setAuthor(e.target.value)}/>

              <input type="text" placeholder="Enter Publisher..." className="ml-4 rounded-lg py-1 px-2"onChange={(e) => setPublisher(e.target.value)}/>

              <input type="text" placeholder="Enter Year..." className="ml-4 rounded-lg py-1 px-2"onChange={(e) => setYear(e.target.value)}/>

              <input type="text" placeholder="Enter Pages..." className="ml-4 rounded-lg py-1 px-2"onChange={(e) => setPages(e.target.value)}/>

              <input type="file" placeholder="Upload Image..." className="ml-4 rounded-lg py-1 px-2" onChange={(e) => handleImageUrl(e)}/>
              
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded-lg" onClick={handleCreate}>Create Book</button>
            </div>
          </div>
       </div>
    </div>
  );
};

export default CreateBook;
