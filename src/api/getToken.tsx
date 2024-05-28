import axios, { AxiosError } from 'axios';
import api, { token } from './axios';

interface ApiResponse {
  status: string;
  [key: string]: any;
}

interface TokenRequestParams {
  userId: string;
  platform: string;
  language: string;
  packageName: string;
}

export const getToken = async ({ userId, platform, language, packageName }: TokenRequestParams): Promise<string> => {
  try {
    const response = await api.post<ApiResponse>('/rest/auth', {
        userId,
        platform,
        language,
        packageName,
    }, {
    //   headers: { 'Authorization': `Bearer ${token}` },
    });

    console.log('Response data:', response.data);

    if (response.data) {
      console.log('token', response.data);
      return "OK";
    } else {
      console.error('Unexpected response structure:', response.data);
      return "FAILED";
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Handle server response error
        console.error('Server error:', axiosError.response.data);
      } else if (axiosError.request) {
        // Handle network error
        console.error('Network error:', axiosError.request);
      } else {
        // Handle other Axios errors
        console.error('Axios error:', axiosError.message);
      }
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
    }
    return "FAILED";
  }
};
