"use client";

import { useState } from "react";
import { Button, Input, TextArea, Label, Form, TextField } from "@heroui/react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    try {
      // এখানে চাইলে backend API add করতে পারো
      console.log(data);

      toast.success("Message sent successfully!");

      e.target.reset();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Contact Us
        </h1>

        <Form onSubmit={onSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <TextField name="name" isRequired>
            <Label>Name</Label>
            <Input placeholder="Your name" />
          </TextField>

          {/* Email */}
          <TextField name="email" isRequired>
            <Label>Email</Label>
            <Input type="email" placeholder="your@email.com" />
          </TextField>

          {/* Subject */}
          <TextField name="subject">
            <Label>Subject</Label>
            <Input placeholder="Subject" />
          </TextField>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <Label>Message</Label>
            <TextArea
              name="message"
              placeholder="Write your message..."
              className="min-h-[120px]"
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 text-white"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>

        </Form>
      </div>
    </div>
  );
};

export default ContactPage;