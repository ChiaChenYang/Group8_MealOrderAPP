import { useState, useEffect } from 'react';

import { getRestaurantInfoStatus } from '@/lib/api/restaurant/api';

const useRedirect = () => {
	const [isRedirecting, setIsRedirecting] = useState(false);
	const [redirectURL, setRedirectURL] = useState('');
	const [restaurantId, setRestaurantId] = useState(-1);
	useEffect(() => {
		const id = localStorage.getItem('id');
		const parsedId = id ? parseInt(id, 10) : null;
		if (!parsedId) {
			setIsRedirecting(true);
			setRedirectURL('/');
		} else {
			setRestaurantId(parsedId);
			const fetchData = async () => {
				const data = await getRestaurantInfoStatus(parsedId);
				if (!data) {
					setIsRedirecting(true);
					setRedirectURL('/operations-management/basic-information');
				}
			};
			fetchData();
		}
	}, []);

	return { isRedirecting, redirectURL, restaurantId };
};

export default useRedirect;
