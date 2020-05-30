import { API } from "../../backend";


//category calls

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// get all categories

export const getAllCategories=()=>{
  return fetch(`${API}/categories`,{
    method:"GET"
  })
  .then(response=>response.json())
  .catch(err=>console.log(err))
}

//get a category

export const getCategory=(categoryId,userId,token)=>{
   return fetch(`${API}/category/${categoryId}/${userId}`,{
     method:"GET",
     headers:{
       Accept:"application/json",
       Authorization:`Bearer ${token}`
     }
   })
   .then(res=>res.json())
   .catch(err=>console.log(err))
}

//deleteCategory

export const deleteCategory=(categoryId,userId,token,category)=>{
  return fetch(`${API}/category/${categoryId}/${userId}`,{
    method:"DELETE",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    } 
  })
  .then(response=>response.json())
  .catch(err=>console.log(err))
}

//update category of specific id 

export const updateCategory=(categoryId,userId,token,category)=>{
  // console.log(category);
  return fetch(`${API}/category/${categoryId}/${userId}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(category)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}



//products calls

// create product

export const createProduct=(userId,token,product)=>{
  return fetch(`${API}/product/create/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:product
  })
  .then(response=>response.json())
  .catch(err=>console.log(err))
}

//get all product
export const getAllProducts=()=>{
    return fetch(`${API}/products`,{
      method:"GET"
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

//delete product

export const deleteProduct=(productId,userId,token)=>{
  return fetch(`${API}/product/${productId}/${userId}`,{
    method:"DELETE",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    }
  }).then(response=>response.json())
  .catch(err=>console.log(err))
}

// get a product by its id

export const getProduct=(productId,userId,token)=>{
  return fetch(`${API}/product/${productId}/${userId}`,{
    method:'GET',
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  .then(response=>{
    return response.json();
  })
  .catch(err=>console.log(err))
}

//update a product

export const updateProduct=(productId,userId,token,product)=>{
  return fetch(`${API}/product/${productId}/${userId}`,{
       method:"PUT",
       headers:{
         Accept:"application/json",
         Authorization:`Bearer ${token}`
       },
       body:product
  })
  .then(response=>response.json())
  .catch(err=>console.log(err))
}
