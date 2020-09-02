const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {
    // Criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // Inserir dado na tabela
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?); 
    // `

    // const values = [
    //     "https://image.flaticon.com/icons/svg/1006/1006363.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sint provident mollitia eaque praesentium molestiae magni nesciunt.",
    //     "https://rocketseat.com.br"
    // ]
    // db.run(query, values, function(err) {
    //     if (err) return console.log(err)

    //     console.log(this)
    // })

    // Deletar um dado na tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`, [8], function(err) {
    //     if (err) return console.log(err)

    //     console.log("DELETADO COM SUCESSO!", this)
    // })

    // Consultar dados na tabela
    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })
    
})

module.exports = db