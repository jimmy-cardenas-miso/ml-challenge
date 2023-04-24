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
        const urlDescription = `${url}/description`;

        axios.all([
            axios.get(url),
            axios.get(urlDescription)
        ])
            .then(axios.spread(({data}, {data: {plain_text}}) =>
                res.status(200).send(adapter.mapDetail(data, plain_text))))
            .catch(error => res.status(500).send(adapter.mapError(error)));
    },
};

module.exports = ItemService;

