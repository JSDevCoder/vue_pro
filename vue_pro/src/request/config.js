export function reqPathConfig() {
  const mode = process.env.VUE_APP_MODE;
  let url = {
    baseUrl: '',
    resUrl: '',
    mockUrl: ''
  };

  switch(mode) {
    case 'development':
      url.baseUrl = '';
      url.mockUrl = 'https://www.easy-mock.com/mock/5d677b0a09835a6fa2c1feb3/api';
      url.resUrl = '';
      break;
    case '':
      url.baseUrl = '';
      url.resUrl = '';
      break;
    case '':
      url.baseUrl = '';
      url.resUrl = '';
      break;
  }

  return url;
}
