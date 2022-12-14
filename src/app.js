import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/urls.routes.js";
import usersRoutes from "./routes/users.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";

app.use(authRoutes);
app.use(urlRoutes);
app.use(usersRoutes);
app.use(rankingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
