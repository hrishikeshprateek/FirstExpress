function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
}

function convertDateStringToDDMMYYYY(dateString){
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
}

const rani = 'girl'
module.exports = {
    formatTime,
    convertDateStringToDDMMYYYY,
    rani
}