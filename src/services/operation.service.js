import authHeader from "@/services/auth.header";
import ApiService from './api.service';

export default {

    createOperation(operation) {
        fetch(`${ApiService.API_URL}operation`, {
            method: 'POST',
            body: JSON.stringify(operation),
            headers: authHeader()
        })
    },

    async getOperationsByProfileAndType(profileId, type) {
        let response = await fetch(`${ApiService.API_URL}operation/${profileId}/${type}`, {
            method: 'GET',
            headers: authHeader()
        });
        let data = await response.json();
        return data;
    },

    async getOperationsByProfileAndPeriod(startDate, endDate, profileId) {
        let response = await fetch(`${ApiService.API_URL}operation/period/${startDate}/${endDate}/${profileId}`, {
            method: 'GET',
            headers: authHeader()
        });
        let data = await response.json();
        return data;
    }
}
