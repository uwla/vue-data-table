/**
 * The following block of code is used to automatically register the
 * lang files. It will recursively scan the lang directory and
 * register them with their "basename".
 */
import en from './lang/en'
import es from './lang/es'
import ptBr from './lang/pt-br'

const translations = {
    "pt-br": ptBr,
    "en": en,
    "es": es,
} as Translation

/* utility for the user to change or add new translations */
const languageServiceProvider = {
    setLang(lang : LanguageName, translation : LanguageDict) {
        translations[lang] = translation
    },
    removeLang(lang : LanguageName) {
        delete translations[lang]
    },
    setLangText(lang : LanguageName, key: LanguageDictKey, text: LanguageDictVal) {
        translations[lang][key] = text
    }
}

export default translations
export { languageServiceProvider, translations }
