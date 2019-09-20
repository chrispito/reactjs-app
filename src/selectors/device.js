export const getDevice = (state) => state.device // eslint-disable-line import/prefer-default-export
export const getBreakpoint = (state) => {
  const device = getDevice(state)

  if (device.get('gt-md')) {
    return 'lg'
  }

  if (device.get('md')) {
    return 'md'
  }

  if (device.get('sm')) {
    return 'sm'
  }

  return 'xs'
}
