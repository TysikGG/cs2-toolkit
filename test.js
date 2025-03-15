const { getSteamPrice } = require(".");

(async () => {
    const data = await getSteamPrice("Rio 2022 Legends Autograph Capsule");
    console.log(data)
})()