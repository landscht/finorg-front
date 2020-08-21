import axios from "axios";

export default {

    createProfile(profile) {
        return axios
            .post( 'http://localhost:8080/profile', {
                firstname: profile.firstname,
                lastname: profile.lastname,
                birthday: profile.birthday
            })
    }

}
