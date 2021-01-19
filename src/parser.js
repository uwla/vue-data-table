import { toTitleCase } from "./helpers";
import translations from "./lang";

export function parseColumnProps(props) {
	let columns = props.columns || props.columnKeys.map(key => ({ key }));
	const { defaultColumn } = props;
	columns = columns.map(function(column, i) {
		let title = column.title || toTitleCase(column.key);
		return {
			...defaultColumn,
			index: 0,
			...column,
			sortingIndex: -1,
			sortingMode: "",
			id: i,
			title
		};
	});

	/* order the columns by the index, so the user can
	set a custom order for the columns to be displayed */
	columns.sort(function(a, b) {
		if (a.index !== b.index) {
			return a.index - b.index;
		}
		return a.id - b.id;
	});
	return columns;
}

export function parseTextProps(props) {
	const { lang, text } = props;
	return { ...translations[lang], ...text };
}
