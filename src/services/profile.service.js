import axios from "axios";
import ApiService from './api.service';

export default {

    createProfile(profile) {
        return axios
            .post( `${ApiService.API_URL}profile`, {
                firstname: profile.firstname,
                lastname: profile.lastname,
                birthday: profile.birthday
            })
    }

}
