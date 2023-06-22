/**
 * The following block of code is used to automatically register the
 * lang files. It will recursively scan the lang directory and
 * register them with their "basename".
 */
import en from './lang/en'
import es from './lang/es'
import pt from './lang/pt-br'

const translations = {
    "pt-br": pt,
    "en": en,
    "es": es,
}

/* utility for the user to change or add new translations */
const languageServiceProvider = {
    setLang(lang, translation) {
        translations[lang] = translation
    },
    removeLang(lang) {
        delete translations[lang]
    },
    setLangText(lang, key, text) {
        translations[lang][key] = text
    }
}

export default translations
export { languageServiceProvider, translations }
