import bridge from '@vkontakte/vk-bridge'

const APP_ID = Number(process.env.REACT_APP_ID)

export const getAuthToken = () => bridge.send(
    'VKWebAppGetAuthToken',
    {
        'app_id': APP_ID,
        'scope': 'friends'
    }
);

export const getUsersList = (accessToken) => bridge.send('VKWebAppCallAPIMethod', {
    'method': 'friends.get',
    'request_id': '32test',
    'params': {
        'fields': 'nickname,photo_200',
        'user_ids': '1',
        'v':'5.131',
        'access_token': accessToken
    }
});

export const getAccessToke = () => bridge.send(
    'VKWebAppGetAuthToken',
    {
        'app_id': APP_ID,
        'scope': 'friends,photo,wall'
    }
);

export const getUserInfo = () => bridge.send('VKWebAppGetUserInfo');

export const shareRunInfo = (blob) => bridge.send('VKWebAppShowStoryBox', {
    'background_type': 'image',
    'blob': blob,
});

export const getGeoData = () => bridge.send("VKWebAppGetGeodata");
