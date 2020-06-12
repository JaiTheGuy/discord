const fetch = require('node-fetch');
const BASE_URL = 'https://api.covid19api.com/';

async function getCorona(virus) {
  let response = await fetch(`${BASE_URL}/${countries}`);
  return await response.json();
}

module.exports = { getCorona };
