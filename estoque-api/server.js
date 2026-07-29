const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const estoqueRoutes = require('./src/routes/estoqueRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/usuarios', userRoutes);
app.use('/api/estoque', estoqueRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de estoque em execução' });
});

app.listen(port, () => console.log(`API rodando na porta ${port}`));
