import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://192.168.100.14:8000/api/exam/home',
	timeout: 15000,
});

export async function callAPI(url, option, data) {
	try {
		const parsedOption = typeof option === 'string' ? { method: option } : option
		const response = await axiosInstance({
			url,
			method: parsedOption.method || 'get',
			data,
			headers: {
				'Content-Type': parsedOption.contentType || 'application/json',
			},
		});
		return response.data
	} catch (err) {
		if (err.response) return err.response.data

		return { error: 'Network error' }
	}
}
