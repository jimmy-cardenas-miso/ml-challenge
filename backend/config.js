module.exports = {
    port: process.env.PORT || 5040,
    configCors: {
        'Access-Control-Allow-Headers': 'Content-Type,Stone',
        'Access-Control-Expose-Headers': 'Stone'
    }
}
