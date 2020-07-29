/**
 * The following block of code is used to automatically register the
 * lang files. It will recursively scan the lang directory and
 * register them with their "basename".
 *
 */

const files = require.context('./lang/', true, /\.js$/i)

const translations = {};

files.keys().forEach(key => {
	const translation = files(key).default;
	const lang = key.replace("./", "").split('.')[0];
	translations[lang] = translation;
})

export default translations;
