import axios from "axios";

export const apiUrl = "http://localhost:5500/v2"; //`https://afrisight-express.onrender.com`;

export const AUTH_ROUTES = {
  REFRESH_TOKEN: "/auth/token/refresh",
  USER_OBJECT: "/auth/profile",
  USER_PROFILE: "/profile",
  LOGIN: "/auth/login/email",
  CREATE_USER: "/auth/register/email",
};

export const FORM_ROUTES = {
  CREATE: "/form",
  UPDATE: (id: string) => `/form/${id}`,
  GET_FORM_BY_ID: (id: string) => `/form/${id}`,
  GET_ALL_FORMS: "/form/user/forms",
};

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await localStorage.getItem("access_token");
    console.log({ accessToken });
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Refreshing token");
      originalRequest._retry = true;

      try {
        const refreshToken = await localStorage.getItem("refresh_token");
        const response = await axiosInstance.post(AUTH_ROUTES.REFRESH_TOKEN, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await localStorage.setItem("access_token", accessToken);
        await localStorage.setItem("refresh_token", newRefreshToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await localStorage.removeItem("access_token");
        await localStorage.removeItem("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
