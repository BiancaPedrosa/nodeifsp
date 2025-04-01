express= require ("express");
const app = express();

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/html/index.html", function (err) {
      if (err) {
         console.error("Error sending file:", err);
         res.status(500).send("Internal Server Error");
      }
   });
}
);
app.get("/sobre", function (req, res) {
    res.send("Essa é a página sobre!");
}
);
app.get("/contato", function (req, res) {
    res.send("Essa é a página de contato!");
}
);
app.get('/ola/:nome/:cargo', function (req, res) {
    res.send("Olá " + req.params.nome + " seu cargo é " + req.params.cargo);
}
);
app.listen(3000, () => {
    console.log("Servidor rodando na url http://localhost:3000");
}
);