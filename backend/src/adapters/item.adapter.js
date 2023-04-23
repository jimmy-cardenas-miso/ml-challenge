function mapItemList(item) {
    const {
        id, title, price, thumbnail,
        condition, shipping: {free_shipping}, currency_id, address, pictures
    } = item;

    return {
        id,
        title,
        price: {
            currency: currency_id,
            amount: price,
            decimals: null
        },
        picture: (!!pictures) ? pictures[0].secure_url : thumbnail,
        condition: condition === 'new' ? 'Nuevo' : 'Usado',
        free_shipping,
        city_name: (!!address) ? address.city_name : null
    };
}

function mapResults(data) {
    const { results, filters } = data;

    return {
        author: {
            name: 'Jimmy',
            lastname: 'Cardenas'
        },
        categories:
            (filters.length > 0)
                ? filters.find((cat) => cat.id === 'category')
                    .values
                    .reduce(
                        (prev, {path_from_root}) => [
                            ...prev,
                            ...path_from_root.map(({name}) => name)],
                        []
                    )
                : [],
        items: results.map((item) => mapItemList(item)),
    };
}

module.exports = { mapResults }
