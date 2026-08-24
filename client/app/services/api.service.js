import { getToken, removeToken } from "../utils/token";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});


api.interceptors.request.use(
    (config) => {

        const token = getToken();

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        /*
         * Let the browser/Axios generate the
         * multipart boundary for FormData.
         */

        if (
            typeof FormData !== "undefined" &&
            config.data instanceof FormData
        ) {

            delete config.headers["Content-Type"];

        }


        return config;

    },

    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (
            error.response?.status === 401
        ) {

            removeToken();

            if (
                typeof window !== "undefined"
            ) {

                window.location.href =
                    "/auth/login";

            }

        }

        return Promise.reject(error);

    }

);


export default api;