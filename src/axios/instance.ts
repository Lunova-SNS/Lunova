import axios from 'axios';

export const client = axios.create({
	baseURL: 'http://34.64.75.50/',
	headers: {
		'Content-Type': 'application/json',
	},
});
// export const formDataClient = axios.create({
// 	baseURL: 'http://34.64.75.50/',
// 	headers: {
// 		'Content-Type': 'multipart/form-data',
// 	},
// });
