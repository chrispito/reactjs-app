import Loadable from 'react-loadable'

const Loading = () => null
const defaultLoaderProps = {
  loading: Loading,
  delay: 0
}

export const createLoadable = (loader, propsOverrides = {}) => {
  const props = { ...defaultLoaderProps, ...propsOverrides }
  props.loader = loader
  return Loadable(props)
}
