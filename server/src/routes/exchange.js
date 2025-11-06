const express = require('express');
const axios = require('axios');
const router = express.Router();

// Buscar taxa de câmbio atual
router.get('/rates', async (req, res) => {
  try {
    const response = await axios.get(process.env.EXCHANGE_RATE_API);
    const rates = response.data.rates;

    res.json({
      BRL_to_AOA: rates.AOA || 173.41,
      AOA_to_BRL: rates.AOA ? 1 / rates.AOA : 0.00577,
      lastUpdated: new Date(response.data.time_last_updated * 1000),
      source: 'ExchangeRate-API'
    });
  } catch (error) {
    console.error('Erro ao buscar taxas:', error.message);
    // Retornar valores padrão em caso de erro
    res.json({
      BRL_to_AOA: 173.41,
      AOA_to_BRL: 0.00577,
      lastUpdated: new Date(),
      source: 'Fallback'
    });
  }
});

module.exports = router;
