import { NestFactory } from '@nestjs/core';
import { Global_Module } from './global.module';
import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
 import * as bodyParser from 'body-parser';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(Global_Module);

 app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit as needed
      app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))






  app.enableCors({
    origin: "*", // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Accept', // Allowed request headers
    // credentials: false, // Allow sending cookies/authorization headers
    // maxAge: 86400, // Preflight request cache duration (in seconds)
  })
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
  run().catch(console.dir);
}

bootstrap();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Romancista:rYnpFSgkFNBdw7wM@lt-database.vurhbsl.mongodb.net/?retryWrites=true&w=majority&appName=lt-database";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}