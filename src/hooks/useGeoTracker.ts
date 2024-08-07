import { useRef, useState } from 'react'
import { Position } from '../components/Map/MapController'
import { getGeoData } from '../utils/api'

interface IUserGeotrackerReturnType {
    pollCurrentPosition: (handleUpdate: (position: Position) => void, poolInterval: number) => void
    stopPolling: () => void
    getCurrentPosition: () => Promise<Position | void>
    getGeoPermissions: (onSuccess: () => void, onFailure: () => void) => void
    isPolling: boolean
}

export const useGeoTracker = (): IUserGeotrackerReturnType => {
    const [isPolling, setIsPolling] = useState(false)
    let intervalId = useRef(null)

    const pollCurrentPosition = (handleUpdate, poolInterval) => {
        if (isPolling || intervalId.current !== null) {
            return
        }

        setIsPolling(true)

        intervalId.current = setInterval(() => {
            getCurrentPosition().then(handleUpdate)
        }, poolInterval)
    }

    const stopPolling = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current)
            intervalId.current = null
            setIsPolling(false)
        }
    }

    const getCurrentPosition = (): Promise<Position | void> => {
        return getGeoData().then(result => {
            if (result.available) {
                console.log(result.long, result.lat)
                return [result.long, result.lat]
            }

            return Promise.reject()
        })
    }

    const getGeoPermissions = (
        onSuccess,
        onFailure,
    ) => {
        // try {
        //     const handlePermissionStateChange = (result) => {
        //         if (result.state === 'granted') {
        //             onSuccess()
        //         } else if (result.state === 'denied') {
        //             onFailure()
        //         }
        //
        //         result.onchange = function () {
        //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //             handlePermissionStateChange(result.state);
        //         }
        //     }
        //
        //     navigator.permissions.query({name:'geolocation'}).then((result) => {
        //         handlePermissionStateChange(result)
        //     }).catch(() => {
        //         onFailure()
        //     });
        // } catch (e) {
        //     console.log(e.message, navigator.permissions)
        // }

        // К сожалению код выше не работает в вебьвью VkApp на IOS,
        // используем небольшой хак для того чтобы стриггерить системный запрос пермишненов
        getCurrentPosition().then(onSuccess).catch(onFailure)
    }

    return { getCurrentPosition, pollCurrentPosition, stopPolling, isPolling, getGeoPermissions }
}
