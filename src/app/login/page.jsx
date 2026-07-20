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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const allData = Object.fromEntries(form.entries());

    console.log(allData);

   const { data, error } = await authClient.signIn.email({
    image: allData.image,
    name:allData.name,
  email: allData.email,
  password: allData.password,
});

if (error) {
  toast.error(error.message || "Login failed");
  return;
}

toast.success("Login successful");
router.push("/")


  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 text-white">

      <Form
        className="flex w-96 flex-col gap-4 bg-gray-900 p-6 rounded-2xl border border-white/10"
        onSubmit={onSubmit}
      >
        <h2 className="text-center text-3xl font-bold text-violet-500">
          Login Account !
        </h2>

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
        <div className="flex gap-2">

          <Button type="submit" className="w-full">
            <Check />
            Submit
          </Button>

          <Button type="reset" variant="secondary" className="w-full">
            Reset
          </Button>

        </div>

      </Form>
    </div>
  );
};

export default Login;