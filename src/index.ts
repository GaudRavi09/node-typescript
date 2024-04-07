import "dotenv/config";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT: string | number = process.env.PORT || 8000;

try {
    app.use(express.json());
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Route to check if server is working or not
    app.get('/', (req: Request, res: Response) => {
        res.send('Server Works! 🚀🚀 ');
    });
} catch (error) {
    console.error("Error occurs:", error);
}