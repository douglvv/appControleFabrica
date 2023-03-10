const express = require("express");
const exphbs = require("express-handlebars");
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);
// const flash = require("express-flash");

//Instancia o express,handlebars e mid dos formulários
const app = express();

const conn = require("./db/conn");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static('public'))

// Importa os Models para a criação das tabelas
const Cliente = require("./models/Cliente");
const Produto = require("./models/Produto")


//Rota inicial da aplicação - antes do listen
app.get('/', function (req, res) {
    res.render('home')
   })

//Rotas dos models
const clienteRoutes = require("./routes/clienteRoutes");
app.use("/cliente", clienteRoutes);

const produtoRoutes = require("./routes/produtoRoutes");
app.use("/produto", produtoRoutes);


//Inicia (escuta) a aplicação somente depois de conectar ao BD
conn
  .sync()
  .then(() => {
    app.listen(8080);
    console.log("Servidor rodando!")
  })
  .catch((err) => console.log(err));