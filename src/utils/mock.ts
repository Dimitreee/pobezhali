import faker from 'faker';
import { uid } from 'uid'


const generateRandomPath = (length) => {
    const path = []

    for (let i = 0; i < length; i++) {
        path.push([
            faker.datatype.float({
                precision: 7,
                min: 37,
                max: 36,
            }),
            faker.datatype.float({
                precision: 7,
                min: 37.0000001,
                max: 36.0000002,
            })
        ])
    }

    return path
}

const generateRandomItem = (userId) => {
    return {
        "date": Number(faker.date.past()),
        "duration": {
            "hours": faker.datatype.number(24),
            "minutes": faker.datatype.number(60),
            "seconds": faker.datatype.number(60)
        },
        "distance": faker.datatype.float({
            precision: 4,
            max: 20
        }),
        "path": generateRandomPath(faker.datatype.number(40)),
        "id": uid(),
        "userId": userId
    }
}

export const createMockUserRaces = (userId) => {
    const races = []

    for (let i = 0; i < faker.datatype.number(8); i++ ) {
        races.push(generateRandomItem(userId))
    }

    return races
}