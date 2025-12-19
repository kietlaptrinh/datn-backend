import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("PostgreSQL connected successfully");
} catch (err) {
  console.error("PostgreSQL connection error:", err.message);
}