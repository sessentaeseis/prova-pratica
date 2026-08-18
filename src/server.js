import express from "express"
import cors from "cors"
import { prisma } from "../src/lib/prisma.ts"

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.get("/equipes", async (req, res) => {
    
})