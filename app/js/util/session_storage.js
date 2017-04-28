import { isEmpty, isNil } from 'ramda';

function setItem(itemName, itemValue) {
  const itemValueAsJson = JSON.stringify(itemValue);
  sessionStorage.setItem(itemName, itemValueAsJson);
}

function getItem(itemName) {
  const retrievedItem = sessionStorage.getItem(itemName);
  return isEmpty(retrievedItem) || isNil(retrievedItem) ? null : JSON.parse(retrievedItem);
}

function removeItem(itemName) {
  sessionStorage.removeItem(itemName);
}

module.exports = { setItem, getItem, removeItem };