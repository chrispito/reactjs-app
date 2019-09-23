import { createLoadable } from 'utils/loadable'

const Home = createLoadable(() => import(/* webpackChunkName: "Home" */ 'containers/pages/Home'))
const KeyPage = createLoadable(() => import(/* webpackChunkName: "KeyPage" */ 'containers/pages/key_page/KeyPage'))
const Fail = createLoadable(() => import(/* webpackChunkName: "Fail" */ 'containers/pages/Fail'))
const Main = createLoadable(() => import(/* webpackChunkName: "Main" */ 'containers/Main'))

export default [
  {
    path: '/',
    component: Main,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/home',
        exact: true,
        component: Home
      },
      {
        path: '/keys',
        exact: true,
        component: KeyPage
      },
      {
        path: '*',
        component: Fail
      }
    ]
  }
]
