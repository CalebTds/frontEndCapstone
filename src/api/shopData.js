import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getShops = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/shops`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getShopsById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/shops/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createShop = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/shops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateShops = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/shops/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          return response.text().then((text) => {
            console.error('Update failed:', text);
            throw new Error('Failed to update shop');
          });
        }
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        return {};
      })
      .then(resolve)
      .catch(reject);
  });

const deleteShops = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/shops/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Failed to delete shop: ${text}`);
          });
        }
        return response.status === 204 ? null : response.json(); // Fix empty response error
      })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getShops, getShopsById, deleteShops, createShop, updateShops };
