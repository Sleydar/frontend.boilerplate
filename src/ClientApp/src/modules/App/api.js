/*
 * Component API calls
 *
 * API calls for component are implemented here. Here we import our axios instance and perform async calls that are consumed in saga.js
 *
 */

import axiosInstance from '../../utils/apiInstance';

const loadDataAsync = async () => {
    const response = await axiosInstance.get(
        'https://raw.githubusercontent.com/LearnWebCode/json-example/master/animals-1.json',
    );
    return response;
};

export { loadDataAsync };
