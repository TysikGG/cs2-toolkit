import { Inventory } from "./Inventory.ts"

export class SteamClient {
    requestOptions : { JSON? : boolean, language? : string };
    readonly appID : string = "730";
    readonly contextID : string = "2";

    async getInventory(params : {steamID : string, getPrice : boolean, getCategory : boolean}) {
        const inventory = new Inventory(this, params);
        return await inventory.getData();
    };
};
