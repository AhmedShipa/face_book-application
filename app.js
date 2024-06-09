import express from "express";
import sequelize from "./database/dbConnection.js";
import bootstrap from "./bootstrap.js";
const app = express();
const port = process.env.port || 3000;
import cors from "cors";

app.use(express.json());
app.use(cors());
bootstrap(app);
sequelize.sync({ alter: true });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
