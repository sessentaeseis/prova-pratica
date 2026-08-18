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

app.post("/equipes", async(req, res) => {
    try {
        const { nome, especialidade } = req.body
        const novaEquipe = await prisma.equipe.create({
            data: {
                nome,
                especialidade
            }
        })
        return res.status(201).json(novaEquipe)
    } catch(error) {
        res.status(500).json({error: "ERRO ao buscar desenvolvedores."})
    }
})

app.post("/desenvolvedores", async(req, res) => {
    try {
        const { nome, nivel, equipeId } = req.body 
        const novoDev = await prisma.desenvolvedor.create({
            data: {
                nome,
                nivel,
                equipeId
            }
        })
        return res.status(201).json(novoDev)
    } catch(error) {
        res.status(500).json({error: "ERRO ao buscar desenvolvedores."})
    }
})

app.put("/desenvolvedores/:id", async(req, res) => {
    try {
        const { id } = req.params
        const { nome, nivel, equipeId } = req.body
        const devAtt = await prisma.desenvolvedor.update({
            where: {
                id: Number(id)
            },
            data: {
                nome,
                nivel,
                equipeId
            }
        })
        return res.json(devAtt)
    } catch(error) {
        res.status(500).json({error: "ERRO ao atualizar desenvolvedor."})
    }
})

app.put("/equipes/:id", async(req, res) => {
    try {
        const { id } = req.params
        const { nome, especialidade } = req.body
        const devAtt = await prisma.equipe.update({
            where: {
                id: Number(id)
            },
            data: {
                nome,
                especialidade
            }
        })
        return res.json(devAtt)
    } catch(error) {
        res.status(500).json({error: "ERRO ao atualizar equipe."})
    }
})


app.listen(PORT, () => {
    console.log("api rodando")
})