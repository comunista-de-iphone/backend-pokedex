const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Dados de exemplo
let dados = [
  { id: uuidv4(), nome: "bulbasaur", descricao: 'Descrição 1', tipo: 'grass', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg` },
  { id: uuidv4(), nome: "charmeleon", descricao: 'Descrição 2', tipo: 'fire', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg` },
  { id: uuidv4(), nome: "caterpie", descricao: 'Descrição 3', tipo: 'bug', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg` },
  { id: uuidv4(), nome: "beedrill", descricao: 'Descrição 4', tipo: 'bug', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/15.svg` },
  { id: uuidv4(), nome: "raticate", descricao: 'Descrição 5', tipo: 'normal', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg` },
  { id: uuidv4(), nome: "pikachu", descricao: 'Descrição 6', tipo: 'electric', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg` },
  { id: uuidv4(), nome: "nidorina", descricao: 'Descrição 7', tipo: 'poison', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/30.svg` },
  { id: uuidv4(), nome: "clefairy", descricao: 'Descrição 8', tipo: 'fairy', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/35.svg` },
  { id: uuidv4(), nome: "wigglytuff", descricao: 'Descrição 2', tipo: 'normal', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/40.svg` },
  { id: uuidv4(), nome: "vileplume", descricao: 'Descrição 2', tipo: 'grass', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/45.svg` },
  { id: uuidv4(), nome: "diglett", descricao: 'Descrição 2', tipo: 'ground', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/50.svg` },
  { id: uuidv4(), nome: "golduck", descricao: 'Descrição 2', tipo: 'water', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/55.svg` },
  { id: uuidv4(), nome: "poliwag", descricao: 'Descrição 2', tipo: 'water', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/60.svg` },
  { id: uuidv4(), nome: "alakazam", descricao: 'Descrição 2', tipo: 'psychic', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/65.svg` },
  { id: uuidv4(), nome: "weepinbell", descricao: 'Descrição 2', tipo: 'grass', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/70.svg` },
  { id: uuidv4(), nome: "graveler", descricao: 'Descrição 2', tipo: 'rock', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/75.svg` },
  { id: uuidv4(), nome: "slowbro", descricao: 'Descrição 2', tipo: 'water', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/80.svg` },
  { id: uuidv4(), nome: "dodrio", descricao: 'Descrição 2', tipo: 'normal', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/85.svg` },
  { id: uuidv4(), nome: "shellder", descricao: 'Descrição 2', tipo: 'water', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/90.svg` },
  { id: uuidv4(), nome: "onix", descricao: 'Descrição 2', tipo: 'rock', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/95.svg` },
  { id: uuidv4(), nome: "voltorb", descricao: 'Descrição 2', tipo: 'electric', img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg` },
];

// Operação de leitura (GET)
app.get('/api/dados', (req, res) => {
  res.json({ dados });
});

// Operação de criação (POST)
app.post('/api/dados', (req, res) => {
  const { nome, descricao, tipo, img } = req.body;
  const novoDado = {
    id: uuidv4(),
    nome,
    descricao,
    tipo,
    img
  };
  dados.push(novoDado);
  res.json({ mensagem: 'Dado adicionado com sucesso!' });
});

// Operação de atualização (PUT)
app.put('/api/dados/:id', (req, res) => {
  const dadoId = req.params.id;
  const { nome, descricao, tipo, img } = req.body;
  const dado = dados.find((item) => item.id === dadoId);
  if (dado) {
    dado.nome = nome;
    dado.descricao = descricao;
    dado.tipo = tipo;
    dado.img = img;
    res.json({ mensagem: `Dado ${dadoId} atualizado com sucesso!` });
  } else {
    res.status(404).json({ erro: 'Dado não encontrado' });
  }
});

// Operação de remoção (DELETE)
app.delete('/api/dados/:id', (req, res) => {
  try {
    const dadoId = req.params.id;
    dados = dados.filter((item) => item.id !== dadoId);
    res.json({ mensagem: `Dado ${dadoId} removido com sucesso!` });
  } catch (erro) {
    console.error('Erro durante a remoção:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
