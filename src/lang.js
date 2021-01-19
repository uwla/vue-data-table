/**
 * The following block of code is used to automatically register the
 * lang files. It will recursively scan the lang directory and
 * register them with their "basename".
 */
const files = require.context("./lang/", true, /\.js$/ui);
const translations = {};
files.keys().forEach(function(key) {
	const translation = files(key).default;
	const lang = key.replace("./", "").split(".")[0];
	translations[lang] = translation;
});

/* utility for the user to change or add new translations */
const languageServiceProvider = {
	setLang(lang, translation) {
		translations[lang] = translation;
	},
	removeLang(lang) {
		delete translations[lang];
	},
	setLangText(lang, key, text) {
		translations[lang][key] = text;
	}
};

export default translations;
export { languageServiceProvider, translations };
