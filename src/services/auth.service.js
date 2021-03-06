import axios from 'axios';
import ApiService from './api.service'

class AuthService {

    currentUser = {}

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

    login(user) {
        return axios
            .post(ApiService.API_URL + 'api/auth/signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    this.currentUser = JSON.stringify(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(ApiService.API_URL + 'api/auth/signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}
export default new AuthService();
