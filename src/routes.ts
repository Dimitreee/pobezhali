import { Page, PAGE_MAIN, PANEL_MAIN, Router, VIEW_MAIN } from '@happysanta/router'

export const PAGE_RACES = '/page_races/:userId([a-fA-F0-9]+)'
export const PAGE_RACE = '/page_race/:id([a-fA-F0-9]+):action?'
export const PAGE_ACTIVE_RACE = '/page_active_race'
export const PAGE_FRIENDS = '/page_friends'

export const PANEL_RACES = 'panel_races'
export const PANEL_RACE = 'panel_race'
export const PANEL_ACTIVE_RACE = 'panel_active_race'
export const PANEL_FRIENDS = 'panel_friends'

const routes = {
    [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN),
    [PAGE_RACES]: new Page(PANEL_RACES, VIEW_MAIN),
    [PAGE_RACE]: new Page(PANEL_RACE, VIEW_MAIN),
    [PAGE_FRIENDS]: new Page(PANEL_FRIENDS, VIEW_MAIN),
    [PAGE_ACTIVE_RACE]: new Page(PANEL_ACTIVE_RACE, VIEW_MAIN),
}

export const router = new Router(routes)
