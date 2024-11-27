import { SteamClient } from "./src/modules/SteamClient.ts";

const steamClient = new SteamClient();

steamClient.requestOptions = {
    JSON: true,
    language: "ru"
};



