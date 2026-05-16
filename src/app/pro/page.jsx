"use client"

import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
  Form
} from "@heroui/react";

import { Check } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

const ProductsSign = () => {

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const allData = Object.fromEntries(form.entries());

    console.log(allData);
    toast.success("added products")

    const res= await fetch ("http://localhost:5000/pro",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(allData)
    });
    const data = await res.json();
    console.log(data)



    // redirect("/")

  };

  return (
    <div className="p-10">

      <Form
        className="mx-auto bg-gray-800 mt-5 flex w-full max-w-3xl flex-col gap-6 rounded-2xl border p-6"
        validationBehavior="native"
        onSubmit={onSubmit}
      >

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Product Name */}
          <div className="md:col-span-2">
            <TextField name="productName" isRequired>
              <Label>Product Name</Label>
              <Input className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Price */}
          <TextField name="price" type="number" isRequired>
            <Label>Price (USD)</Label>
            <Input type="number" placeholder="1299" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Duration */}
          <TextField name="duration" isRequired>
            <Label>Duration</Label>
            <Input placeholder="7 Days / 6 Nights" className="rounded-2xl" />
            <FieldError />
          </TextField>

          {/* Departure Date */}
          <div className="md:col-span-2">
            <TextField name="departureDate" type="date" isRequired>
              <Label>Departure Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
              <Label>Image URL</Label>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <Label>Description</Label>
            <TextArea
              name="description"
              placeholder="Describe the product..."
              className="rounded-2xl"
            />
          </div>

        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-cyan-500 text-white">
          <Check />
          Add Product
        </Button>

      </Form>
    </div>
  );
};

export default ProductsSign;