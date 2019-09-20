import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import getTranslation from 'i18n/translation'
import * as ConfigActions from 'actions/config'
import { guessLocale } from 'utils/locale'

const lang = guessLocale()

let locale = 'en'
/* istanbul ignore next */
if (lang && lang.match(/de/)) {
  locale = 'de'
/* istanbul ignore next */
} else if (lang && lang.match(/fr/)) {
  locale = 'fr'
}

const englishTranslations = fromJS(getTranslation('fr'))

const buildState = (loc) => {
  const translations = fromJS(getTranslation(loc))
  /* istanbul ignore next */
  return {
    get: (value, replacements = {}) => Object.keys(replacements)
      .reduce(
        (acc, key) => acc.replace(`{${key}}`, replacements[key]),
        translations.get(value) || englishTranslations.get(value) || value || ''
      )
      .replace(/\{.*?\}/g, '')
  }
}

export const initialState = buildState(locale)

export default handleActions({
  [ConfigActions.setLanguage]: (state, { payload: { languageShort } }) => buildState(languageShort)
}, initialState)
