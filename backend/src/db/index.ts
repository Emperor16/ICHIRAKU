import {drizzle} from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";


if (!ENV.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

//log when connected to the database
pool.on("connect", () =>{
    console.log("Connected to the database");
})

//log error if connection to the database fails
pool.on("error", (err) =>{
    console.error("Error connecting to the database", err);
})

export const db = drizzle({client: pool,  schema });