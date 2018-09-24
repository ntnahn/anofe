import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://35.200.156.138:8000/',
	timeout: 15000,
});

export async function callAPI(url, option, data) {
	try {
		const parsedOption = typeof option === 'string' ? { method: option } : option;
		const response = await axiosInstance({
			url,
			method: parsedOption.method || 'get',
			data,
			headers: {
				'Content-Type': parsedOption.contentType || 'application/json',
			},
		});
		console.log(response);
		return response.data
	} catch (err) {
		if (err.response) return err.response.data

		return { error: 'Network error' }
	}
}
