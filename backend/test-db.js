import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_A4BwhNPyG0vY@ep-holy-resonance-ah4zd3xb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

client.connect()
  .then(() => {
    console.log("Connected!");
    return client.end();
  })
  .catch(err => console.error("Connection error", err));