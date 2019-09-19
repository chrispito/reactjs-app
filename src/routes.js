import { createLoadable } from 'utils/loadable'

const Home = createLoadable(() => import(/* webpackChunkName: "Home" */ 'containers/Home'))
const Fail = createLoadable(() => import(/* webpackChunkName: "Fail" */ 'containers/Fail'))
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
        path: '*',
        component: Fail
      }
    ]
  }
]
