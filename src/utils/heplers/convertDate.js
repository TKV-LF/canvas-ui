import moment from 'moment';
const ConvertDate = (date) => {
    return moment(date).format('DD-MM-YYYY HH:mm');
};

export default ConvertDate;
