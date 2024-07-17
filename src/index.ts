import express, { Request, Response } from "express";
import { createClient } from "@vercel/postgres";

const client = createClient(
{connectionString: "postgres://default:rtBNn8ipLK5A@ep-empty-river-a49l56da.us-east-1.aws.neon.tech:5432/verceldb"}
);
client.connect();
const app = express();
const server = express.json();
const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || "http://localhost";

app.use(server);

app.get("/posts", async function (request: Request, response: Response) {
  await client.connect();
  const res = await client.query("SELECT * FROM posts");
  return response.status(200).json(res.rows);
});

app.get("/posts/:idPost", async function (request: Request, response: Response) {
  await client.connect();
  const res = await client.query(`SELECT * FROM posts WHERE id=$1`, [request.params.idPost]);
  return response.status(200).json(res.rows);
});

app.delete("/posts/:idPost", async function (request: Request, response: Response) {
  await client.connect();
  const res = await client.query(`DELETE FROM posts WHERE id=$1`, [request.params.idPost]);
  return response.status(200).json(res.rows);
});

app.put("/posts/:idPost", async function (request: Request, response: Response) {
  await client.connect();
  const res = await client.query(`UPDATE posts SET title=$1, content=$2 WHERE id=$3`, [request.body.title, request.body.content, request.body.idPost]);
  return response.status(200).json(res.rows);
});

app.post("/posts", async function (request: Request, response: Response) {
  await client.connect();
  const res = await client.query(`UPDATE posts SET title=$1, content=$2 WHERE id=$3`, [request.body.title, request.body.content, request.body.idPost]);
  return response.status(200).json(res.rows);
});

app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    })