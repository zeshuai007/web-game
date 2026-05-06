import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import LobbyPage from '../pages/LobbyPage.vue'
import CharacterPage from '../pages/CharacterPage.vue'
import CultivationPage from '../pages/CultivationPage.vue'
import ExplorePage from '../pages/ExplorePage.vue'
import QuestsPage from '../pages/QuestsPage.vue'
import InventoryPage from '../pages/InventoryPage.vue'
import ShopPage from '../pages/ShopPage.vue'
import RankingPage from '../pages/RankingPage.vue'
import SocialPage from '../pages/SocialPage.vue'
import SettingsPage from '../pages/SettingsPage.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/lobby',
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: LobbyPage,
  },
  {
    path: '/character',
    name: 'Character',
    component: CharacterPage,
  },
  {
    path: '/cultivation',
    name: 'Cultivation',
    component: CultivationPage,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: ExplorePage,
  },
  {
    path: '/quests',
    name: 'Quests',
    component: QuestsPage,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryPage,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage,
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: RankingPage,
  },
  {
    path: '/social',
    name: 'Social',
    component: SocialPage,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
