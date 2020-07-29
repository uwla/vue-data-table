import { toTitleCase } from './helpers'
import translations from './lang'

export function parseColumnProps(props) {

	const columns = props.columns || props.columnKeys.map(key => ({key}));
	const {defaultColumn} = props;

	columns.forEach((column, i) => {
		const title = column.title || toTitleCase(column.key)

		columns[i] = {
			...defaultColumn,
			...column,
			sortingIndex: -1,
			sortingMode: "",
			id: i,
			title,
		};
	});

	return columns;
}

export function parseTextProps(props) {
	const { lang, text } = props;
	return {...translations[lang], ...text};
}
