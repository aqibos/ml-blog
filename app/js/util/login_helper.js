import { getItem } from './session_storage';
import { isIncomplete } from './util_functions';

function isLoggedIn() {
  return !isIncomplete(getItem('user'));
}

module.exports = { isLoggedIn };