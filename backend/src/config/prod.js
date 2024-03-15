import dotenv from "dotenv";

dotenv.config();

 const obj = {
    PASSWORD: process.env.PASSWORD,
    EMAIL: process.env.EMAIL,
    MAIN_URL: process.env.MAIN_URL,
  };

  export default obj;