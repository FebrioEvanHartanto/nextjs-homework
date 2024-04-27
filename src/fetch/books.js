import BASE_URL from "@/lib/baseUrl";

export const getBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const books = await response.json(); // Parse JSON response
    return books;
  } catch (error) {
    throw new Error("Internal Server Error!");
  }
};

export const createBook = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      body: JSON.stringify(params),
    })

    return response;
  } catch (error) {
      throw new Error({message: error.response.message})
  }
}

export const uploadImage = async (params) => {
  try {
    const response = await fetch(`${BASE_URL}/books/uploads`, {
      method: "POST",
      body: params
  })
  
    const data = await response.json();

    return data;

  } catch (error) {
    
    throw new Error({message: "Internal Server Error"})
  }
}

export const updateBook = async (id, params) => {
  try {
    
    const response = await fetch(`${BASE_URL}/books/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })

    const data = await response.json()

    console.log(data)
    console.log(params, "PARAMS <<<<<<< ")

    return data;

  } catch (error) {
      throw new Error ({message: error.response.message || "Internal Server Error"})
  }
}

export const deleteBook = async (id) => {
  try {

    const response = await fetch(`${BASE_URL}/books/${id}`, {
      
      method: "DELETE"
    })

    return response;

  } catch (error) {
    throw new Error({message: error.response.message})
  }
}