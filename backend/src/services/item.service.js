const axios = require('axios');
const adapter = require('../adapters/item.adapter');

const ItemService = {
    getByQuery(req, res) {
        const {q: query} = req.query;
        const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
        axios.get(url)
            .then(response => res.status(200).send(adapter.mapResults(response.data)))
            .catch(error => res.status(500).send(error));
    },

    getById(req, res) {
        const {id} = req.params;
        const url = `https://api.mercadolibre.com/items/${id}`;
        axios.get(url)
            .then(response => res.status(200).send(response.data))
            .catch(error => res.status(500).send(error));
    }
};

module.exports = ItemService;

