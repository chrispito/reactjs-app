/* global navigator */

export const guessLocale = () => {
  let lang
  if (navigator.languages && navigator.languages.length) {
    // latest versions of Chrome and Firefox set this correctly
    [lang] = navigator.languages
  } else if (navigator.userLanguage) {
    // IE only
    lang = navigator.userLanguage
  } else {
    // latest versions of Chrome, Firefox, and Safari set this correctly
    lang = navigator.language
  }

  return lang ? lang.toLowerCase() : lang
}
