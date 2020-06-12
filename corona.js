const fetch = require('node-fetch');
const BASE_URL = 'https://api.covid19api.com/summary';

async function getCorona(Countries) {
  let response = await fetch(`${BASE_URL}/${Countries}`);
  return await response.json();
}

module.exports = { getCorona };
