import { createLoadable } from 'utils/loadable'

const Home = createLoadable(() => import(/* webpackChunkName: "Home" */ 'containers/pages/Home'))
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
        path: '*',
        component: Fail
      }
    ]
  }
]
