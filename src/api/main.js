import TokenService from "@/service/token.service";
import axios from "axios";
// import {extractJWT} from '@/services/utils';

export const API_URL = "http://localhost:3000/api/";

// export const API_URL = 'http://localhost:8081/api/';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Access-Control-Allow-Origin": "*" },
});

instance.interceptors.request.use(function (config) {
  const token = TokenService.getToken();
  if (token) {
    console.log("TOKEN EXISTS");
    console.log(token);
    config.headers.Authorization = `${token.type} ${token.token}`;
  }
  return config;
});

// instance.interceptors.request.use(async function (config) {
//   const token = TokenService.getToken();

//   if (token) {
//     let accessToken = token.accessToken;
//     if (token.token) {
//       const lifeTimeAccess = extractJWT(accessToken).exp * 1000;
//       const difference = lifeTimeAccess - Date.now() - 10000;
//       console.log('DIFFERENCE', difference);
//       let auth = accessToken ? 'Bearer ' + accessToken : null;
//       if (difference < 0) {
//         const newTokenResponse = await axios.post(
//           `${API_URL}/auth/getNewAccessToken`,
//           {
//             refreshToken: token.refreshToken,
//           }
//         );
//         console.log('NEW TOKEN RESPONSE', newTokenResponse);
//         const accessTokenJSON = newTokenResponse.data;
//         auth = accessTokenJSON.type + ' ' + accessTokenJSON.accessToken;
//         TokenService.updateLocalAccessToken(accessTokenJSON.accessToken);
//       }
//       config.headers.Authorization = auth;
//     }
//   }

//   return config;
// });

export default instance;
