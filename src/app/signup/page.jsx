"use client";

import { Check } from "@gravity-ui/icons";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "../lib/auth-client";
// import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUp = () => {
      const router = useRouter()

  const onSubmit = async (e) => {
    
    e.preventDefault();

    const form = new FormData(e.target);

    const allData = Object.fromEntries(form.entries());

    console.log(allData);

    const { data, error } = await authClient.signUp.email({
    name: allData.name,
    email: allData.email,
    password: allData.password,
    image: allData.imageUrl
  
});

toast.success("signup submit")

  router.push("/")

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">

      <Form
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-white/10 bg-gray-900 p-6"
        onSubmit={onSubmit}
      >

        {/* TITLE */}
        <h2 className="text-center text-3xl font-bold text-cyan-400">
          Create Account
        </h2>

        {/* NAME */}
        <TextField isRequired name="name">
          <Label>Full Name</Label>

          <Input placeholder="Enter your full name" />

          <FieldError />
        </TextField>

        {/* IMAGE */}
        <TextField isRequired name="image">
          <Label>Profile Image URL</Label>

          <Input
            type="text"
            placeholder="Paste your image URL"
          />

          <FieldError />
        </TextField>

        {/* EMAIL */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>

          <Input placeholder="john@example.com" />

          <FieldError />
        </TextField>

        {/* PASSWORD */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {

            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>

          <Input placeholder="Enter your password" />

          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        {/* BUTTONS */}
        <div className="flex gap-3">

          <Button
            type="submit"
            className="w-full bg-cyan-500 text-white"
          >
            <Check />
            Sign Up
          </Button>

        

        </div>

      </Form>
    </div>
  );
};

export default SignUp;