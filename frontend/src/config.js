const baseURL = 'https://infiniteline-global.herokuapp.com'

export const API =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_API_URL
    : `${baseURL}`
export const BACKEND_API =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_BACKEND_API_URL
    : `${baseURL}/api/v1/`
export const REGISTER_COMPLETE =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_REGISTER_COMPLETE
    : `${baseURL}/api/v1/register/complete`
export const FORGOT_PASSWORD =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_FORGOT_PASSWORD
    : `${baseURL}/api/v1/forgotpassword`
export const ETH_ADDRESS =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_ETH_ADDRESS
    : '0x890d4fbf3dd6149d93551f3b5003de13d6c92136'
export const BNB_ADDRESS =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_BNB_ADDRESS
    : '0x890d4fbf3dd6149d93551f3b5003de13d6c92136'
export const USDT_ADDRESS =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_USDT_ADDRESS
    : 'TX45YDx6yCeVfdKAvAJm39LESahtgkDogq'
export const BTC_ADDRESS =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_BTC_ADDRESS
    : '1DRzNdzYRmy25wqBV8Qn2FGazEo4vYapEp'
