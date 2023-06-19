import { toTitleCase } from "./helpers";
import translations from "./lang";

export function parseColumnProps(props) {
    // extract the columns
    // if not set, columns are derived from columnKeys
    let columns = props.columns || props.columnKeys.map(key => ({ key }));

    // extract the default column
    const { defaultColumn } = props;

    // merge default column with the columns
    columns = columns.map(function(column, i) {
        // get explicit title or guess title from `key`
        let title = column.title || toTitleCase(column.key);

        return {
            ...defaultColumn,
            ...column,

            // options below are used internally,
            // and shall not be overwritten by the user
            sortingIndex: -1,
            sortingMode: "",
            title: title,
            id: i,
        }
    })

    /* order the columns by the index, so the user can
    set a custom order for the columns to be displayed */
    columns.sort(function(a, b) {
        if (a.index !== b.index) {
            return a.index - b.index
        }
        return a.id - b.id
    })

    // finally, return the parsed columns
    return columns;
}

export function parseTextProps(props) {
    const { lang, text } = props;
    return { ...translations[lang], ...text }
}
