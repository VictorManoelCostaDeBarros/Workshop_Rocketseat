// Express para criar e configura meu servidor
const express = require('express')
const server = express()

const db = require('./db')

// configura arquivos estaticos (css, scripts, imagens)
server.use(express.static('public'))

// Habilitar uso do req.boyd
server.use(express.urlencoded({ extended: true }))

// configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache: true, 
})

// Criei um rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })

    
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideia.html", { ideas: reversedIdeas })
    })   
})

server.post("/", function(req,res) {
    // Inserir dado na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?); 
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        return res.redirect("/ideias")
    })
})

// liguei o servidor na porta 3000
server.listen(3000)