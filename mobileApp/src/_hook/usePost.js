import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../_api/api';
import { useStorage } from './useStorage';

export const usePost = (route, data) => {
	const [token, setToken] = useStorage('token', '');
	const [data, setData] = useState([]);
	const [pending, setPending] = useState(false);

	const handlePostData = () => {
		setData([]);
		setPending(true);
		axios.post(baseUrl + route, data, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${token}`,

			}
		})
			.then(res => {
				if (res.data.status == 200) {
					navigation.navigate('Application');
					// setToken(res.data.token);
					// dispatch(setUser(res.data.user))
				} else {
					console.warn("Error")
				}
			})
			.catch(err => console.warn(err));
	};
	useEffect(() => {
		if (token) {
			handlePostData();
		}
	}, [token]);
	return [data, pending];
}