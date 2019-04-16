import API from '@/services/api/DjangoService'
import axios from 'axios'

jest.mock('axios');

describe('login', () => {
  it('submits a request to the login route', async () => {
    const response = await API.login({username: 'test_user', password: 'test_password'});
    expect(response).toEqual({
      status: 200,
      data: {
      title: 'Mock post request with Jest',
      url: `/simple/token/`,
      body: {
        username: 'test_user',
        password: 'test_password'
      }}
    });
    expect(axios.post).toHaveBeenCalled();
    // axios.post.mockReset();
  })
});

describe('register', () => {
  it('submits a request to the register route', async () => {
    const payload = {
      email: 'email@mail.com',
      password1: 'test_password1',
      password2: 'test_password2',
      username: 'test_user'
    };
    const response = await API.register(payload);
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock post request with Jest',
        url: `/rest-auth/registration/`,
        body: payload
      }
    });
    expect(axios.post).toHaveBeenCalled();
  })
});

// describe('getAllUsers', () => {
//   it('submits a request to the getAllUsers route', async () => {
//     const response = await API.getAllUsers();
//     expect(response).toEqual({
//       status: 200,
//       data: {
//         title: 'Mock get request with Jest',
//         url: `/api/users/`,
//       }
//     });
//     expect(axios.get).toHaveBeenCalled();
//   })
// });

describe('getAllGames', () => {
  it('submits a request to the getAllGames route', async () => {
    const response = await API.getAllGames();
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock get request with Jest',
        url: `/api/games/`,
      }
    });
    expect(axios.get).toHaveBeenCalled();
  })
});

describe('getGameData', () => {
  it('submits a request to the getGameData route', async () => {
    const response = await API.getGameData({id: 123});
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock get request with Jest',
        url: `/api/games/123/`,
      }
    });
    expect(axios.get).toHaveBeenCalled();
  })
});

describe('getUser', () => {
  it('submits a request to the getUser route', async () => {
    const response = await API.getUser();
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock get request with Jest',
        url: `/rest-auth/user/`,
      }
    });
    expect(axios.get).toHaveBeenCalled();
  })
});

describe('updateUserInfo', () => {
  it('submits a request to the updateUserInfo route', async () => {
    const payload = {
      firstName: 'test_first_name',
      lastName: 'test_last_name',
      username: 'test_user'
    };
    const response = await API.updateUserInfo(payload);
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock put request with Jest',
        url: `/rest-auth/user/`,
        body: {
          first_name: payload.firstName,
          last_name: payload.lastName,
          username: payload.username
        }
      }
    });
    expect(axios.put).toHaveBeenCalled();
  })
});

describe('resetPassword', () => {
  it('submits a request to the resetPassword route', async () => {
    const payload = {email: 'email@mail.com'};
    const response = await API.resetPassword(payload);
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock post request with Jest',
        url: `/rest-auth/password/reset/`,
        body: payload
      }
    });
    expect(axios.post).toHaveBeenCalled();
  })
});

describe('confirmPasswordReset', () => {
  it('submits a request to the confirmPasswordReset route', async () => {
    const payload = {
      uid: 123,
      token: 'a.b.c',
      new_password1: 'test_password1',
      new_password2: 'test_password2'
    };
    const response = await API.confirmPasswordReset(payload);
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock post request with Jest',
        url: `/rest-auth/password/reset/confirm/`,
        body: payload
      }
    });
    expect(axios.post).toHaveBeenCalled();
  })
});

describe('changePassword', () => {
  it('submits a request to the changePassword route', async () => {
    const payload = {
      old_password: 'old_password',
      new_password1: 'new_password1',
      new_password2: 'new_password2'
    };
    const response = await API.changePassword(payload);
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock post request with Jest',
        url: `/rest-auth/password/change/`,
        body: payload
      }
    });
    expect(axios.post).toHaveBeenCalled();
  })
});

describe('logout', () => {
  it('submits a request to the logout route', async () => {
    const response = await API.logout({});
    expect(response).toEqual({
      status: 200,
      data: {
        title: 'Mock post request with Jest',
        url: `/rest-auth/logout/`,
        body: {}
      }
    });
    expect(axios.post).toHaveBeenCalled();
  })
});