import config from 'static/translations.json'

export default function getTranslation(language) {
  return Object.keys(config).reduce((acc, element) => ({ ...acc, [element]: config[element][language] }), {})
}
