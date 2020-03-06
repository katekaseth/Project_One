const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export default rawDate => {
    let splitDate = rawDate.replace('T00:00:00Z', '').split('-');
    let dateString = months[parseInt(splitDate[1]) - 1] + ' ' + splitDate[2] + ', ' + splitDate[0];
    return dateString;
};
