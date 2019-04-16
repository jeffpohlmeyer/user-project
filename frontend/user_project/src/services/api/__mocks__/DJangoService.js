export default {
  getAllGames: jest.fn(url => {
    return Promise.resolve({
      status: 200,
      data: {
        title: 'Mock get request to getAllGames',
        url,
      }
    })
  }),
  login: jest.fn((url, body) => {
    console.log('body', body)
    // return Promise.resolve({
    //   status: 200,
    //   data: {
    //     title: 'Mock post request to login',
    //     url,
    //     body
    //   }
    // })
  }),
}