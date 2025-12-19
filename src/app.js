import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import roomsRoutes from "./routes/rooms.routes.js";
import panoramasRoutes from "./routes/panoramas.routes.js";
import hotspotsRoutes from "./routes/hotspots.routes.js";
import quizRoutes from './routes/quiz.routes.js';
import artifactsRoutes from "./routes/artifacts.routes.js";
import authRoutes from "./routes/auth.routes.js"
import usersRoutes from "./routes/users.routes.js";
import syncRoutes from "./routes/sync.routes.js";
import timelineRoutes from "./routes/timeline.routes.js";
import { sequelize } from "./models/index.js";
import { connectMongo } from "./config/db.mongo.js";
import "dotenv/config";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",                  // Localhost của bạn
  "https://datn-frontend-1.vercel.app",     // Link Vercel (bạn xem kỹ link vercel của bạn là gì điền vào đây)
  "https://datn-frontend.vercel.app"        // Link dự phòng
];
app.use(cors({
  origin: function (origin, callback) {
    // Cho phép request không có origin (như Postman, Server-to-Server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS Policy: Domain not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true, // Cho phép cookie
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());
app.use(morgan("dev"));
app.set("trust proxy", 1);
app.use(session({
  secret: process.env.SESSION_SECRET || "iuytrdsdfghjmnbvcxzytrewhgfdejhgfdytrenbvcwsdxiu",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    httpOnly: true,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = process.env.UPLOAD_DIR || "uploads";
app.use(`/${uploadDir}`, express.static(path.join(__dirname, "..", uploadDir)));

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/panoramas", panoramasRoutes);
app.use("/api/hotspots", hotspotsRoutes);
app.use('/api/quiz', quizRoutes);
app.use("/api/artifacts", artifactsRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/users", usersRoutes);


export const init = async () => {
  try {
  await sequelize.sync({ alter: true });
  console.log("Postgres Database Synced");
  await connectMongo();
  console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};

export default app;
