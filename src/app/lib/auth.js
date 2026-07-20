

import { betterAuth } from "better-auth";

import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client =new MongoClient(process.env.MONGDB_URI);

const db = client.db("E-Commerce");
await client.connect()

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, 
  }, 
  database: mongodbAdapter(db, {
    client
  })
});