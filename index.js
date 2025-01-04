const request = require('request');

exports.getMarketPrices = async () => {
    return new Promise((resolve, reject) => {
        request('https://market.csgo.com/api/v2/prices/USD.json', function (error, response, body) {
            if (error) return reject(error);
            return resolve(JSON.parse(body));
        });
    });
};

exports.findPrices = (items) => {
    return new Promise((resolve, reject) => {
        request('https://market.csgo.com/api/v2/prices/USD.json', function (error, response, body) {
            if (error) return reject(error);
            const pricesData = JSON.parse(body);
            for (const info of items.assets) {
                console.log(info.data.market_hash_name)
                const marketInfo = pricesData.items.find((item) => item.market_hash_name === info.data.market_hash_name);
                info.price = Number(marketInfo?.price).toFixed(2);
            };
            return resolve(items);
        });
    });
};

exports.deleteUntradable = (items) => {
    for (const i in items.assets) {
        console.log(i)
        if (items.assets[i].data.tradable !== 1) items.assets.splice(i, 1);
    };
    return items;
};

exports.getinventory = async (steamid, {requestPrices, enableTradeble, language}) => {
    const headers = language == "ru" ? { "Accept-Language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7,be;q=0.6" } : {};
    return new Promise((resolve, reject) => {
        request({
            uri: `/inventory/${steamid}/730/2`,
            baseUrl: 'https://steamcommunity.com/',
            json: true,
            headers: headers
        }, (err, res, body) => {
            if (err) return reject(err);
            for (const info of body.assets) {
                const classid = info.classid;
                const instanceid = info.instanceid;
                const assetid = info.assetid;

                const itemDescription = body.descriptions.find((data) => data.classid == classid && data.instanceid == instanceid);
                info.data = itemDescription;
            };
            if (enableTradeble) body = this.deleteUntradable(body);
            if (requestPrices) {
                this.findPrices(body).then((res) => {
                    return resolve(res.assets);;
                })
            } else return resolve(body.assets);
        });
    });
};