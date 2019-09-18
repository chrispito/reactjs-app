import { fromJS } from 'immutable'
// import { resetState } from 'actions/app'
import expect from 'expect'
import { takeEvery } from 'redux-saga/effects'

const defaultSetValueTestOptions = {
  describe: true,
  context: true
}

const buildContextLabel = (payload) => `when passing ${payload === null ? null : payload.toString().slice(0, 50)}`

export const setValueTest = (reducer, actionFun, key, beforeValue, afterValue, payload, options = defaultSetValueTestOptions) => {
  const test = () => {
    it(`should set ${key || 'state'} from ${beforeValue} to ${afterValue}`, () => {
      const action = actionFun(payload)

      if (key) {
        const stateBefore = fromJS({
          [key]: beforeValue
        })

        expect(reducer(stateBefore, action).get(key)).toEqual(afterValue)
      } else {
        expect(reducer(beforeValue, action)).toEqual(afterValue)
      }
    })
  }

  let runTest = () => {
    test()
  }

  if (payload !== undefined) {
    runTest = () => {
      if (options.context) {
        context(buildContextLabel(payload), () => {
          test()
        })
      } else {
        test()
      }
    }
  }

  if (options.describe) {
    describe(`${actionFun}`, () => {
      runTest()
    })
  } else {
    runTest()
  }
}

export const setValueTests = (reducer, configs) => {
  const grouped = configs.reduce((acc, config) => {
    const conf = config
    if (config.length < 5) {
      conf.push(undefined)
    }

    conf.push({
      describe: false,
      context: false
    })

    const groupKey = config[0]

    acc[groupKey] = (acc[groupKey] || []).concat([conf])

    return acc
  }, {})

  Object.keys(grouped).forEach((key) => {
    grouped[key] = grouped[key].reduce((acc, c) => {
      const groupKey = c[4]

      acc[groupKey] = (acc[groupKey] || []).concat([c])

      return acc
    }, {})
  })

  Object.keys(grouped).forEach((key) => {
    describe(`${key}`, () => {
      Object.keys(grouped[key]).forEach((innerKey) => {
        const payload = grouped[key][innerKey][0][4]

        if (payload !== undefined) {
          context(buildContextLabel(grouped[key][innerKey][0][4]), () => {
            grouped[key][innerKey].forEach((config) => setValueTest(reducer, ...config))
          })
        } else {
          grouped[key][innerKey].forEach((config) => setValueTest(reducer, ...config))
        }
      })
    })
  })
}

export const initialStateTest = (reducer, initialState) => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'foo' })).toEqual(initialState)
  })
}

// export const resetStateTest = (reducer, initialState) => {
//   describe(`${resetState}`, () => {
//     it('should reset data', () => {
//       expect(reducer(fromJS({}), resetState())).toEqual(initialState)
//     })
//   })
// }

export const defaultReducerTests = (reducer, initialState) => {
  initialStateTest(reducer, initialState)
  // resetStateTest(reducer, initialState)
}

export const watcherTest = (Sagas, watcherName, actionFun, sagaName) => {
  let saga = sagaName
  if (!sagaName) {
    saga = watcherName.replace('watch', '')
    saga = saga.charAt(0).toLowerCase() + saga.slice(1)
  }

  if (!Sagas[saga]) {
    throw new Error(`${saga} could not be found`)
  }

  if (!Sagas[watcherName]) {
    throw new Error(`Watcher ${watcherName} could not be found`)
  }

  describe(watcherName, () => {
    it(`should setup watcher ${watcherName} for ${saga}`, () => {
      const generator = Sagas[watcherName]()

      const test = (action) => {
        const actual = generator.next().value
        const expected = takeEvery(action, Sagas[saga])
        expect(actual.payload.args).toEqual(expected.payload.args)
        expect(actual.payload.fn.toString()).toEqual(expected.payload.fn.toString())
        expect(actual.payload.context).toEqual(expected.payload.context)
      }

      if (Array.isArray(actionFun)) {
        actionFun.forEach((action) => test(action))
      } else {
        test(actionFun)
      }
    })
  })
}

export const watcherTests = (Sagas, configs) => {
  context('watchers', () => {
    configs.forEach((config) => {
      watcherTest(Sagas, ...config)
    })
  })
}
