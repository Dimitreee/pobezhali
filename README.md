## Побежали

Простой недоделаный трекер твоих пробежек,
потрогать можно [тут](https://vk.com/app7959189)

### Что умеет:

1. Отслеживание и построение пройденного маршрута на карте в реальном времени.
2. Сохранение и возможность посмотреть пройденные маршруты.
3. Просмотр пройденных маршрутов своих друзей. (Без бекэнда не умеет)
4. Шаринг пройденного маршрута в Истории ВКонтакте.

### Что не умеет:
1. Подтягивать маршруты друзей
2. Включать гео на андроиде

#### Что использовал:
1) https://vk.com/dev/vkbridge
2) https://vkcom.github.io/VKUI/
3) React
4) TypeScript
5) Роутер: https://github.com/HappySanta/router
6) https://vk.com/dev/vk_tunnel
7) https://vk.com/dev/vk_apps_hosting


### Скриншоты:

[<img src="/screenshots/1.jpeg" width="240"/>](./screenshots/1.jpeg)
[<img src="/screenshots/2.jpeg" width="240"/>](./screenshots/2.jpeg)
[<img src="/screenshots/3.jpeg" width="240"/>](./screenshots/3.jpeg)
[<img src="/screenshots/4.jpeg" width="240"/>](./screenshots/4.jpeg)
[<img src="/screenshots/5.jpeg" width="240"/>](./screenshots/5.jpeg)
[<img src="/screenshots/6.jpeg" width="240"/>](./screenshots/6.jpeg)

### Как запустить ?
```
1) yarn
3) yarn add vk-tunnel
4) Зарегать свое приложение в вк
5) Заменить APP_ID в /src/utils/api.ts 
6) yarn dev
7) в этой же директории  vk-tunnel --insecure=1 --http-protocol=https --ws-protocol=wss --host=localhost --port=10888
8) Урл от vk-tunnel указать в настройках аппа
9) Открыть апп в бразуере/телефоне
```
