import { parseString } from 'xml2js';

const parseToJson = (xml: string) => {
	parseString(xml, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			console.log(result);
		}
	});
};

export default { parseToJson };
