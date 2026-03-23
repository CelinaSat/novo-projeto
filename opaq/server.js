const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

class HardwareEngine {
    gerarDados() {
        return {
            cpu: Math.floor(Math.random() * 101), 
            ram: (Math.random() * 16).toFixed(1), 
            temp: Math.floor(Math.random() * (90 - 30 + 1)) + 30 
        };
    }
}

app.get('/api/status', (req, res) => {
    const engine = new HardwareEngine();
    const dados = engine.gerarDados();
    res.json(dados);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
