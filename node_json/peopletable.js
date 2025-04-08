const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

const readFromFile = (filename) => {
   if (!fs.existsSync(filename)) {
      console.log("File does not exist");
      return null;
   }
   return fs.readFileSync(filename, "utf8");
};

const readJson = (filename) => {
   const data = readFromFile(filename);
   if (data) {
      return JSON.parse(data);
   }
   return null;
};

app.get("/", (req, res) => {
   const data = readJson("people.json");

   if (data) {
      let tabela = `
         <html>
         <body>
            <table border="1">
               <tr>
                  <th>Nome</th>
                  <th>Idade</th>
               </tr>
      `;

      data.forEach((person) => {
         tabela += `
            <tr>
               <td>${person.name}</td>
               <td>${person.age}</td>
            </tr>
         `;
      });

      tabela += `
            </table>
         </body>
         </html>
      `;

      res.send(tabela);
   } else {
      res.send("<h1>Nenhum dado encontrado no arquivo JSON.</h1>");
   }
});

app.listen(PORT, () => {
   console.log(`Servidor rodando em http://localhost:${PORT}`);
});

 