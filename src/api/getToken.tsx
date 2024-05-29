import api from "./axios";


export const getToken = async ({ userId, platform, language, packageName }: TokenRequestParams): Promise<string> => {
  try {
    const response = await api.post<string>('/rest/auth', {
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
      window.sessionStorage.setItem('token', response.data);
      return "OK";
    } else {
      console.error('Unexpected response structure:', response.data);
      return "FAILED";
    }
  } catch (error) {
    console.log(error)
    return "FAILED";
  }
};
