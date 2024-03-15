import Production from "./prod.js";
import Development from "./dev.js";
import dotenv from "dotenv";

dotenv.config();

const config = process.env.NODE_ENV === 'PRODUCTION' ? Production : Development;
export default config;
