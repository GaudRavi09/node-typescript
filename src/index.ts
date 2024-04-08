import "dotenv/config";
import { Sequelize } from "sequelize";
import { Routes } from "./routes/index.route";
import { initializeModels } from "./models/index.model";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const routes: Routes = new Routes();
export let sequelize: Sequelize;
const PORT: string | number = process.env.PORT || 8000;
const MYSQL_USER: string = process.env.MYSQL_USER || "";
const DATABASE_NAME: string = process.env.DATABASE_NAME || "";
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || "";


try {
    (async() => {
        app.use(express.json());
    
        // connect database
        sequelize = new Sequelize(DATABASE_NAME, MYSQL_USER, MYSQL_PASSWORD, {
            host: "localhost",
            dialect: "mysql",
        });
        await sequelize.authenticate();

        // initialize tables
        initializeModels(sequelize);
    
        // update table if any column changed
        await sequelize.sync({ alter: false });
        console.log("Database connected successfully.");
    

        app.use("/api/v1", routes.router);
        // Route to check if server is working or not
        app.get('/', (req: Request, res: Response) => {
            res.send('Server Works! 🚀🚀 ');
        });
        
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })();
} catch (error) {
    console.error("Error occurs:", error);
}