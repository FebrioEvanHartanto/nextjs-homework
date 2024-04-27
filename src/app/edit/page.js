"use client"

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const EditPage = () => {
  const router = useRouter();
  const params = useParams();

  const {id} = params;

  // This useEffect hook is used to redirect the user to the specific edit page for a book
  useEffect(() => {
    // Redirect the user to the edit page for the book with ID specified in the URL query parameter
    router.push(`/edit/${id}`);
  }, [id]);

  // Render null or loading indicator while redirecting
  return null;
};

export default EditPage;
