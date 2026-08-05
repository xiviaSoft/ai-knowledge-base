import api from "./api.service";

class AuthService {

    async login(data) {

        const response = await api.post(

            "/auth/login",

            data

        );

        return response.data;

    }

    async register(data) {

        const response = await api.post(

            "/auth/register",

            data

        );

        return response.data;

    }

    async forgotPassword(email) {

        const response = await api.post(

            "/auth/forgot-password",

            {

                email

            }

        );

        return response.data;

    }

    async resetPassword(data) {

        const response = await api.post(

            "/auth/reset-password",

            data

        );

        return response.data;

    }

}

export default new AuthService();