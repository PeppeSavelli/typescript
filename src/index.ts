import express, {Request, Response} from "express";

    const app = express();
    const port = process.env.PORT || 3000;
    const server = express.json();

    app.use(server);

    

    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    })