import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link, Redirect } from 'react-router-dom';
import { updateCategory, getCategory } from './helper/adminapicall';


const UpdateCategory = (props) => {

    const [values, setName] = useState({
          name:'',
          success:false,
          error:'',
          createdName:''
    });

    const { user, token } = isAutheticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = (event) => {
        setName({...values,name:event.target.value})
    }

    const preload = () => {
        getCategory(props.match.params.categoryId, user._id, token)
            .then(data => {
                if (data.error) {
                    setName({...values,error:data.error});
                    console.log('there is some error in to load the data')
                } else {
                    // console.log(data.name);
                    setName({...values,name:data.name})
                }
            })
    }

    useEffect(() => {
        preload()
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        updateCategory(props.match.params.categoryId,user._id,token,values)
          .then(data=>{
              if(data.error){
                  setName({...values,error:data.error});
                  console.log(data.error)
              }else{
                  setName({...values,name:'',success:true,createdName:data.name})
                  setTimeout(()=>{
                      props.history.push('/admin/dashboard');
                  },3000)
              }
          })

    }

    const successMessage=()=>{
        if(values.success){
            return (
            <h3 className="text-warning">{values.createdName} created successfully</h3>
            )
        }
    }

    const warningMessage=()=>{
        if(values.error){
            return(
                <h3 className="text-danger">{values.error}</h3>
            )
        }
    }


    const myUpdateCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" className="form-control my-3"
                    autoFocus
                    required
                    onChange={handleChange}
                    value={values.name}
                />

                <button
                    onClick={onSubmit}
                    className="btn btn-outline-info"
                >Update Category</button>
            </div>
        </form>
    )

    return (
        <Base title="Create a category here"
            description="Add a new category for new tshirt"
            className="container bg-info p-4">

            <div className="row bg-white rounded">
                <div className="col-sm-8 offset-sm-2">
                    {warningMessage()}
                    {successMessage()}
                    {myUpdateCategoryForm()}
                    {goBack()}
                </div>
            </div>

        </Base>
    )
}


export default UpdateCategory;