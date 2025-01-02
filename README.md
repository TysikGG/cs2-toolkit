# Получение инвентарей Steam на Node.js
Простая библиотека для получения Steam-инвентарей.
Без необходимости использования API-ключа.

**Установка**
```js
npm i cs2-toolkit
```

**Импорт**
```js
const steaminventory = require('cs2-toolkit');
```

## Методы
```js
steaminventory.getinventory(steamid, {requestPrices, enableTradeble, language});
```
- steamid: Это [steam64](https://steamid.io/lookup/) ID пользователя, чей инвентарь вы запрашиваете.
- requestPrices: Добавлять ли в свойство price цену для каждого предмета.
- enableTradeble: Если true - возвращает только те предметы, которые можно обменять
- language: Поддерживает 2 языка: ru, en. Стандартное значение: en

## Примеры

### Получение списка вещей
```js
const steaminventory = require('cs2-toolkit');
const steamid = '76561199009885328' // Ваш SteamID;

(async () => {
    const data = await getinventory(steamid, {tradable: true, requestPrices: true, language: "ru"});
    console.log(data)
})()
```
