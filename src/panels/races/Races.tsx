import { useParams, useRouter } from '@happysanta/router'
import React, { useEffect } from 'react'

import { Div, Avatar, Group, List, Panel, PanelHeader, PanelHeaderBack, RichCell, Headline } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../features/store'
import { PAGE_RACE } from '../../routes'
import { formatDate, formatDistance, formatDuration, getRandomAvatarUrl } from '../../utils/common'
import { createMockUserRaces } from '../../utils/mock'
import { addRaces } from '../../features/races/racesSlice'

interface IRunsProps {
    id: string
}

export const Races: React.FC<IRunsProps> = (props) =>  {
    const router = useRouter()
    const { userId } = useParams()
    const dispatch = useDispatch()

    // TODO: это нужно загружать в саге или напрямую с бэка
    const races = useAppSelector((state) => state.races.races)

    const racesById = races
        .filter((race) => {
            return Number(race.userId) === Number(userId)
        })
        .sort((leftRace, rightRace) => leftRace.date < rightRace.date ? 1 : -1)

    // TODO: Мокаем данные, после -- можно удалить
    useEffect(() => {
        if (!racesById.length) {
            const mockData = createMockUserRaces(userId)
            dispatch(addRaces(mockData))
        }
    }, [racesById, dispatch, userId])

    const getSearchParams = (activity) => {
        const params = {
            id: activity.id,
            action: null
        }

        if (activity.userId === String(userId)) {
            params.action = 'canShare'
        }

        return params
    }

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label='Назад' onClick={() => router.popPage()}/>}>
                История активности {userId}
            </PanelHeader>
            <Group>
                <List>
                    {
                        racesById.length > 0
                            ? racesById.map((activity) => {
                                return (
                                    <RichCell
                                        key={activity.id}
                                        before={<Avatar size={72} src={getRandomAvatarUrl(activity.id)} />}
                                        caption={formatDate(activity.date)}
                                        onClick={() => router.pushPage(PAGE_RACE, getSearchParams(activity))}
                                        after={`${formatDistance(activity.distance)} км`}
                                    >
                                        Время: {formatDuration(activity.duration)},
                                    </RichCell>
                                )
                            })
                            : (
                                <Div>
                                    <Headline weight="medium">Нет данных</Headline>
                                </Div>
                            )
                    }
                </List>
            </Group>
        </Panel>
    )
}
