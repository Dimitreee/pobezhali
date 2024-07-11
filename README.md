## Run Tracker

A simple unfinished tracker for your runs,
You can try it out [here](https://vk.com/app7959189). For test access, contact the information in the profile description.

### Features:

1. Real-time tracking and mapping of your route.
2. Saving and viewing completed routes.
3. Viewing routes completed by your friends. (Doesn't work without backend)
4. Sharing your completed route in VKontakte Stories.

### Limitations:
1. Cannot pull friends' routes
2. Cannot enable geo-location on Android

#### Technologies used:
1) https://vk.com/dev/vkbridge
2) https://vkcom.github.io/VKUI/
3) React
4) TypeScript
5) Router: https://github.com/HappySanta/router
6) https://vk.com/dev/vk_tunnel
7) https://vk.com/dev/vk_apps_hosting

### Screenshots:

[<img src="/screenshots/1.jpeg" width="240"/>](./screenshots/1.jpeg)
[<img src="/screenshots/2.jpeg" width="240"/>](./screenshots/2.jpeg)
[<img src="/screenshots/3.jpeg" width="240"/>](./screenshots/3.jpeg)
[<img src="/screenshots/4.jpeg" width="240"/>](./screenshots/4.jpeg)
[<img src="/screenshots/5.jpeg" width="240"/>](./screenshots/5.jpeg)
[<img src="/screenshots/6.jpeg" width="240"/>](./screenshots/6.jpeg)

### How to run?
```
1) yarn
2) yarn add vk-tunnel
3) Register your app on VK, get APP_ID
4) Create a .env file and add the necessary environment variables (see .env.example)
5) yarn dev
6) In the same directory, run vk-tunnel --insecure=1 --http-protocol=https --ws-protocol=wss --host=localhost --port=10888
7) Specify the URL from vk-tunnel in the app settings
8) Open the app in the browser/phone
```
