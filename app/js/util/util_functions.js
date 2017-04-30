import { isEmpty, isNil } from 'ramda';

function isIncomplete(val) {
  return !val || isNil(val) || isEmpty(val);
}

function truncate (str, size = 150) {
  const truncatedSize = size - 3;
  return str.length <= truncatedSize ? str : (str.slice(0, truncatedSize) + '...');
}


module.exports = {
  isIncomplete,
  truncate
};