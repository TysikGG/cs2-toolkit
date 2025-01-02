const { getinventory } = require(".");

(async () => {
    const data = await getinventory("76561199009885328", {tradable: true, requestPrices: true, language: "ru"});
    console.log(data)
})()