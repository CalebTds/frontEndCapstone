import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getItemsByShopId = (shopId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items?orderBy="shopId"&equalTo="${shopId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getItems = (shopId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredItems = Object.values(data).filter((item) => item.shopId === shopId);
          resolve(filteredItems);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getItemsById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items?orderBy="itemId"&equalTo="${id}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const createItem = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateItem = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteItem = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => resolve(true))
      .catch(reject);
  });

export { deleteItem, getItems, getItemsById, createItem, updateItem, getItemsByShopId };
