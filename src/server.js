import express from "express"
import cors from "cors"
import { prisma } from "../src/lib/prisma.ts"

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())

app.get("/equipes", async (req, res) => {
    try {
        const equipes = await prisma.equipe.findMany()
        return res.json(equipes)
    } catch(error) {
        res.status(500).json({error: "ERRO ao buscar alunos."})
    }
})

app.get("/equipes/:id/desenvolvedores", async (req, res) => {
    try {
        const { id } = req.params
        const desenvolvedores = await prisma.desenvolvedor.findMany({
            where: {
                equipeId: Number(id)
            }
        })
        return res.json(desenvolvedores)
    } catch(error) {
        res.status(500).json({error: "ERRO ao buscar desenvolvedores."})
    }
})


app.listen(PORT, () => {
    console.log("api rodando")
})