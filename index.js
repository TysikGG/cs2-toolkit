const axios = require('axios');

exports.getMarketPrices = async () => {
    try {
        const response = await axios.get('https://market.csgo.com/api/v2/prices/USD.json');
        return response.data;
    } catch (error) {
        throw error;
    }
};

exports.findPrices = async (items) => {
    try {
        const response = await axios.get('https://market.csgo.com/api/v2/prices/USD.json');
        const pricesData = response.data;
        items.assets.forEach(info => {
            const marketInfo = pricesData.items.find(item => item.market_hash_name === info.data.market_hash_name);
            info.price = Number(marketInfo?.price).toFixed(2);
        });
        return items;
    } catch (error) {
        throw error;
    }
};

exports.deleteUntradable = (items) => {
    items.assets = items.assets.filter(asset => asset.data.tradable === 1);
    return items;
};

exports.getinventory = async (steamid, { requestPrices, enableTradeble, language }) => {
    const headers = language === "ru" ? { "Accept-Language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7,be;q=0.6" } : {};
    try {
        const response = await axios.get(`https://steamcommunity.com/inventory/${steamid}/730/2`, { headers });
        let body = response.data;
        body.assets.forEach(info => {
            const itemDescription = body.descriptions.find(data => data.classid === info.classid && data.instanceid === info.instanceid);
            info.data = itemDescription;
        });
        if (enableTradeble) body = this.deleteUntradable(body);
        if (requestPrices) {
            const updatedItems = await this.findPrices(body);
            return updatedItems.assets;
        }
        return body.assets;
    } catch (error) {
        throw error;
    }
};

exports.getSteamPrice = async (market_hash_name) => {
    try {
        const response = await axios.get(`https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${market_hash_name}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};