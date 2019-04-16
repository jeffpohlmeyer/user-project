import Vue from 'vue';
import Vuex from 'vuex';
import { mutations, actions } from '@/store/modules/user';
// import '@/services/api/DjangoService';

Vue.use(Vuex);
jest.mock('@/services/api/DjangoService');

const {
  setUserKey,
  setSnackbar,
  setConfirmedMessage,
  setPasswordResetMessage,
  setPasswordResetData,
  setUserInfo,
  // reset
} = mutations;

const {
  loginUser,
  registerUser,
  getAllUsers,
  getUser,
  updateUserInfo,
  resetPassword,
  confirmPasswordReset,
  changePassword,
  logout
} = actions;

describe('mutations', () => {
  describe('setUserKey', () => {
    it('gets an access and refresh key and updates the state with them', () => {
      const state = {
        accessKey: null,
        refreshKey: null,
      };
      const payload = {
        accessKey: '1.2.3',
        refreshKey: '4.5.6',
      };

      setUserKey(state, payload);
      expect(state.accessKey).toEqual(payload.accessKey);
      expect(state.refreshKey).toEqual(payload.refreshKey);
      expect(state.expiration).toBeGreaterThan(Date.now())
    })
  });

  describe('setSnackbar', () => {
    it('sets the snackbar message and the color', () => {
      const state = {
        alertMessage: '',
        color: '',
      };

      const payload = {
        message: 'hello world',
        color: 'purple'
      };

      setSnackbar(state, payload);
      expect(state.alertMessage).toEqual(payload.message);
      expect(state.color).toEqual(payload.color);
    })
  });

  describe('setConfirmedMessage', () => {
    it('sets the alertMessage to the email confirmation message', () => {
      const state = {
        alertMessage: '',
      };

      setConfirmedMessage(state);
      expect(state.alertMessage).toEqual('You have confirmed your email address.  Please log in.');
    })
  });

  describe('setPasswordResetMessage', () => {
    it('sets the alertMessage to the password reset message', () => {
      const state = {
        alertMessage: '',
      };

      setPasswordResetMessage(state);
      expect(state.alertMessage).toEqual('You have successfully reset your password.  Please log in.');
    })
  });

  describe('setPasswordResetData', () => {
    it('sets the uid and token used for the password redirect route', () => {
      const state = {
        uid: '',
        token: '',
      };

      const payload = {
        uid: 'test_uid',
        token: 'test.token.zero'
      };

      setPasswordResetData(state, payload);
      expect(state).toMatchObject(payload);
    })
  });

  describe('setUserInfo', () => {
    it('sets the user info (email, names, id) in the state', () => {
      const state = {
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        id: null
      };

      const payload = {
        email: 'test@email.com',
        first_name: 'test first name',
        last_name: 'test last name',
        username: 'test user',
        id: 34563265
      };

      setUserInfo(state, payload);
      expect(state.email).toEqual(payload.email);
      expect(state.firstName).toEqual(payload.first_name);
      expect(state.lastName).toEqual(payload.last_name);
      expect(state.username).toEqual(payload.username);
      expect(state.id).toEqual(payload.id);
    })
  });
});

// todo: figure out why the DjangoService functions aren't being mocked
// describe('actions', () => {
//   let store, setDataMock;
//   beforeEach(() => {
//     setDataMock = jest.fn();
//     const state = {
//       accessKey: null,
//       refreshKey: null,
//       expiration: 0,
//       id: '',
//       email: '',
//       firstName: '',
//       lastName: '',
//       username: '',
//       path: '',
//       alertMessage: '',
//       uid: '',
//       token: '',
//     };
//     store = new Vuex.Store({
//       state,
//       mutations: {
//         setUserKey: setDataMock,
//         setSnackbar: setDataMock,
//         setConfirmedMessage: setDataMock,
//         setPasswordResetMessage: setDataMock,
//         setPasswordResetData: setDataMock,
//         setUserInfo: setDataMock,
//       },
//       actions
//     })
//   });
//   describe('loginUser', () => {
//     it('sends a request to the login route then commits setUserKey', async () => {
//       const body = {
//         data: {
//           username: 'test_user',
//           password: 'test_password'
//         }
//       };
//       await store.dispatch('loginUser', body);
//       expect(setDataMock).toHaveBeenCalled();
//       console.log('setDataMock.mock.calls', setDataMock.mock.calls)
//       // expect(setDataMock.mock.calls[0][1]).toMatchObject({title: 'Mock post request with Jest', url: '/simple/token/', body})
//     })
//   })
// });