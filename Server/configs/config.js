import "dotenv/config.js"
import {neon} from "@neondatabase/serverless"

//PORT
export const PORT = process.env.PORT || 3000

//DATABASE
export const connectDB = neon(process.env.DATABASE_URL)