const baseConfig = {
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const instanceBase = axios.create({
  baseURL: API_URL,
  ...baseConfig,
});

// Add a request interceptor
instanceBase.interceptors.request.use(
  function (config) {
    const accessToken = getAccessTokenBase();
    if (accessToken) {
      config.headers.Authorization = `${BEARER} ${accessToken}`;
    }
    return config;
  },
  function (error) {
    console.log('Request error: ' + error);
    Promise.reject(error);
    throw new Error(error);
  },
);

// Add a response interceptor
instanceBase.interceptors.response.use(
  function (response) {
    if (response.data && response.data.code === 401) {
      const accessToken = getAccessTokenBase();
      const refreshToken = getRefreshTokenBase();
      if (!accessToken || !refreshToken) return Promise.resolve(response);

      return authRefreshToken({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
        .then(refreshResponse => {
          setAccessTokenBase(refreshResponse.data.accessToken);
          setRefreshTokenBase(refreshResponse.data.refreshToken);

          const originalRequest = response.config;
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          return instanceBase(originalRequest);
        })
        .catch(refreshError => {
          console.log('Error refreshing token:', refreshError.message);
          return response.data ? response.data : response;
        });
    }

    return response.data ? response.data : response;
  },
  function (error) {
    console.log('Response error: ' + error.message);
    Promise.reject(error);
    throw new Error(error);
  },
);
