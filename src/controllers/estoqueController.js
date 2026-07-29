const estoqueModel = require('../models/estoqueModel');
const fs = require('fs');
const path = require('path');

// Consumindo o submódulo de infraestrutura
const configPath = path.join(__dirname, '../../config/ambiente-dev.json');

module.exports = {
  verificarStatus: (req, res) => {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const estoque = estoqueModel.obterEstoque();
    let alertasEnviados = 0;

    if (config.features.usar_sqs) {
      estoque.forEach((item) => {
        if (estoqueModel.verificarAlerta(item.qtd)) {
          console.log(`Enviando para o LocalStack SQS: ${config.sqs_url}`);
          alertasEnviados += 1;
        }
      });
    }

    res.json({
      estoque,
      alertas_sqs_disparados: alertasEnviados,
      status_localstack: config.features.usar_sqs ? 'ATIVO' : 'INATIVO'
    });
  }
};
