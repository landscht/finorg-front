import authHeader from "@/services/auth.header";

export default {

    createOperation(operation) {
        fetch(`http://localhost:8080/operation`, {
            method: 'POST',
            body: JSON.stringify(operation),
            headers: authHeader()
        })
    },

    async getOperationsByProfileAndType(profileId, type) {
        let response = await fetch(`http://localhost:8080/operation/${profileId}/${type}`, {
            method: 'GET',
            headers: authHeader()
        });
        let data = await response.json();
        return data;
    },

    async getOperationsByProfileAndPeriod(startDate, endDate, profileId) {
        let response = await fetch(`http://localhost:8080/operation/period/${startDate}/${endDate}/${profileId}`, {
            method: 'GET',
            headers: authHeader()
        });
        let data = await response.json();
        return data;
    }
}
