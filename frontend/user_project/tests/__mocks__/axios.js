export default {
  get: jest.fn(url => (
    Promise.resolve({
      status: 200,
      data: {
        title: 'Mock get request with Jest',
        url,
      }
    })
  )),
  post: jest.fn((url, body) => (
    Promise.resolve({
      status: 200,
      data: {
        title: 'Mock post request with Jest',
        url,
        body,
      }
    })
  )),
  put: jest.fn((url, body) => (
    Promise.resolve({
      status: 200,
      data: {
        title: 'Mock put request with Jest',
        url,
        body,
      }
    })
  )),
  create: jest.fn(() => (this))
}