const fs = require('fs');// Importa o módulo 'fs' para manipulação de arquivos
const path = require('path');// Importa o módulo 'path' para manipulação de caminhos de arquivos

// Função para ler o conteúdo de um arquivo
const getProdutos = (filename) => {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data;
    } catch (err) {
        console.error(`Erro ao ler o arquivo ${filename}:`, err);
        return null; // Retorna null em caso de erro
    }
}

module.exports = {
  getProdutos : getProdutos
}