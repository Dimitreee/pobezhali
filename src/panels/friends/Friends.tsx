import { useRouter } from '@happysanta/router'
import bridge from '@vkontakte/vk-bridge'
import React, { useEffect, useState } from 'react'
import { Avatar, Cell, Group, List, Panel, PanelHeader, PanelHeaderBack, ScreenSpinner } from '@vkontakte/vkui'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../../features/user/userSlice'

import { useAppSelector } from '../../features/store'
import { PAGE_RACES } from '../../routes'

interface IRunsProps {
    id: string
}

export const Friends: React.FC<IRunsProps> = (props) =>  {
    const router = useRouter()
    const dispatch = useDispatch()
    const accessToken = useAppSelector((state) => state.userSlice.accessToken)
    const isUserLoading = useAppSelector((state) => state.userSlice.isLoading)
    // TODO: move to redux
    const [fetchedUsers, setFetchedUsers] = useState([]);

    useEffect(() => {
        dispatch(setIsLoading(true))

        async function fetchData() {
            const { response } = await bridge.send("VKWebAppCallAPIMethod", {
                "method": "friends.get",
                "request_id": "32test",
                "params": {
                    "fields": "nickname,photo_200",
                    "user_ids": "1",
                    "v":"5.131",
                    "access_token": accessToken
                }
            });

            setFetchedUsers(response.items);
            dispatch(setIsLoading(false))
        }

        fetchData();
    }, []);

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderBack label="Назад" onClick={() => router.popPage()}/>}>
                Список друзей
            </PanelHeader>
            <Group>
                <List>
                    {
                        isUserLoading
                            ? <ScreenSpinner size='large' />
                            : fetchedUsers.map((fetchedUser) => {
                                return (
                                    <Cell
                                        key={fetchedUser.id}
                                        expandable
                                        before={<Avatar src={fetchedUser.photo_200}/>}
                                        onClick={() => router.pushPage(PAGE_RACES, { userId: fetchedUser.id })}
                                    >
                                        {fetchedUser.first_name} {fetchedUser.last_name}
                                    </Cell>
                                )
                            })
                    }
                </List>
            </Group>
        </Panel>
    )
}
