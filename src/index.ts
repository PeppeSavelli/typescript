import express, { Request, Response } from "express";
import { createClient } from "@vercel/postgres";

const client = createClient(
{connectionString: "postgres://default:rtBNn8ipLK5A@ep-empty-river-a49l56da.us-east-1.aws.neon.tech:5432"}
);
client.connect();
const app = express();
const server = express.json();
const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || "http://localhost";

app.use(server);

app.get("/posts", function (req: Request, res: Response) {
  return res.status(200).json([]);
});

app.get("/posts/:idPost", async function (request: Request, response: Response) {
  await client.connect();
  const res = await client.query("SELECT * FROM posts");
  return response.status(200).json(res.rows);
});

app.delete("/posts/:idPost", function (req: Request, res: Response) {
    return res.status(200).json({
      message: `Post ${req.params.idPost} deleted`
    });
  });
  
app.put("/posts/:idPost", function (req: Request, res: Response) {
    return res.status(200).json({
      id : req.body.id,
      title: req.body.title,
      content: req.body.content
    });
  });
  
app.post("/posts", function (req: Request, res: Response) {
    return res.status(201).json({
      id: Math.random(),
      title: req.body.title,
      content: req.body.content
    });
  });

app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    })