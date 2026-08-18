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
        return res.status(200).json(equipes)
    } catch(error) {
        res.status(404).json({error: "ERRO ao buscar equipes."})
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
        return res.status(200).json(desenvolvedores)
    } catch(error) {
        res.status(404).json({error: "ERRO ao buscar desenvolvedores."})
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
        res.status(501).json({error: "ERRO ao criar equipes."})
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
        res.status(501).json({error: "ERRO ao criar desenvolvedores."})
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
        return res.status(200).json(devAtt)
    } catch(error) {
        res.status(501).json({error: "ERRO ao atualizar desenvolvedor."})
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
        return res.status(200).json(devAtt)
    } catch(error) {
        res.status(501).json({error: "ERRO ao atualizar equipe."})
    }
})

app.delete("/equipes/:id", async(req, res) => {
    try {
        const { id } = req.params
        const deletarEquipe = await prisma.equipe.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(deletarEquipe)
    } catch(error) {
        res.status(500).json({error: "ERRO ao deletar equipe."})
    }
})

app.delete("/desenvolvedores/:id", async(req, res) => {
    try {
        const { id } = req.params
        const deletarDev = await prisma.desenvolvedor.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(deletarDev)
    } catch(error) {
        res.status(500).json({error: "ERRO ao deletar desenvolvedor."})
    }
})

app.listen(PORT, () => {
    console.log("api rodando")
})