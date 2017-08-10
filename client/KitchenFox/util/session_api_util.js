import { AsyncStorage } from 'react-native';

export const signup = (state) => {
  const { first, last, username, password } = state;
  return fetch('https://kitchenfox.herokuapp.com/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
    body: `username=${username}&password=${password}&first_name=${first}&last_name=${last}`,
  });
};

// TODO: Change interpolated bodies to JSON.stringifieds
export const login = (username, password) => (
  fetch('https://kitchenfox.herokuapp.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
    body: `username=${username}&password=${password}`,
  })
);

export const saveToken = response => (
  AsyncStorage.setItem('jwt', response)
);

export const getLocalToken = () => (
  AsyncStorage.getItem('jwt')
);

export const deleteLocalToken = () => (
  AsyncStorage.removeItem('jwt')
);

export const saveFirstName = response => (
  AsyncStorage.setItem('fn', response)
);

export const getFirstName = () => (
  AsyncStorage.setItem('fn')
);

export const saveLastName = response => (
  AsyncStorage.setItem('ln', response)
);

export const getLastName = () => (
  AsyncStorage.setItem('ln')
);

export const demoSecured = () => {
  const token = getLocalToken();
  return (
    fetch('https://kitchenfox.herokuapp.com/api/protected', {
      method: 'GET',
      headers: {
        authorization: `JWT ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        charset: 'UTF-16',
      },
    })
  );
};

export const securable = token => (
  fetch('https://kitchenfox.herokuapp.com/api/protected', {
    method: 'GET',
    headers: {
      authorization: `JWT ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
  })
);

export const protectedHeaders = () => (
  fetch('https://kitchenfox.herokuapp.com/api/protected', {
    method: 'GET',
    headers: {
      authorization: `JWT ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      charset: 'UTF-16',
    },
  })
);
