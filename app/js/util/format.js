import moment from 'moment';

function dateWithTime(date) {
  return moment(new Date(date)).format('MMM Do YYYY, h:mm a');
}

module.exports = {
  dateWithTime
}