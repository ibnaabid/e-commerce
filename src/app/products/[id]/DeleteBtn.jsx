"use client"
import { Button } from "@heroui/react";


const DeleteBtn = ({product}) => {

    const deleteHandler = async()=>{
        const res = await fetch (`http://localhost:5000/pro/${product._id}`,{
            method:"DELETE",
           
        })
        const data = res.json()
        console.log(data)
    }
    return (
        <div>
              <Button variant="danger"
        onClick={()=> deleteHandler(product?._id)}
        color="danger"
      >
        Delete
      </Button>
      
        </div>
    );
};

export default DeleteBtn;