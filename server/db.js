import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  database: "fullstack",
  password: "amit351075",
  host: "localhost",
  port: 5432,
});