import { uid } from 'uid';

export const formatNumber = (number) => {
    return number.toLocaleString('ru-RU', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}

export const formatDistance = (distance) => {
    return distance.toFixed(2)
}

export const formatDate = (date) => {
    // TODO: add locale based lib to format date from unix timestamp
    const months = ["Янв", "Фев", "Мар","Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек"];
    let datetime = new Date(date)

    return `${datetime.getDate()} ${months[datetime.getMonth()]}`
}

interface IDuration {
    hours: number
    minutes: number
    seconds: number
}

export const formatDuration = (duration: IDuration): string => {
    return `${formatNumber(duration.hours)}:${formatNumber(duration.minutes)}:${formatNumber(duration.seconds)}`
}

export const getRandomAvatarUrl = (sault: string) => {
    return `https://gravatar.com/avatar/${sault}?s=120&d=identicon&r=PG`
}

export const createMockRaceData = (raceData, userId) => {
    return {
        ...raceData,
        "id": uid(),
        "userId": userId,
        "date": Number(new Date())
    }
}

export const getPathLength = (path) => {
    let length = 0

    if (path.length <= 1) {
        return length
    }

    for (let i = 1; i < path.length; i++) {
        const prevPoint = path[i - 1]
        const nextPoint = path[i]

        const distanceBetweenPoints = getDistanceFromLatLonInKm(prevPoint[0], prevPoint[1], nextPoint[0], nextPoint[1])
        length += distanceBetweenPoints
    }

    return length
}

// refs to https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
export function getDistanceFromLatLonInKm(lon1,lat1,lon2,lat2,) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}
