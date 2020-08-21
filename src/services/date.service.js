import moment from "moment";

export default {
    dateFormat(date) {
        const mom = moment(date).locale('fr');
        return mom.format('DD MMMM yyyy');
    }
}
