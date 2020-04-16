/**
 * The following block of code is used to automatically register our
 * lang files. It will recursively scan the lang directory for the
 * js file and automatically register them with their "basename".
 *
 */

const files = require.context('./lang/', true, /\.js$/i)

export default files.keys().reduce((languages, key) => {
    let translations = files(key).default;
    let lang = key.replace("./", "").split('.')[0];
    languages[lang] = translations;
    return languages;
}, {})
