// import { Unauthorized, BadRequest } from "./Exceptions";
// import jwt_decode from "jwt-decode";
// // import {IAuthData} from "../../controllers/auth/models";
// // import {checkAccessTokenExpired} from "../../controllers/auth/sagas/auth";

// export function isJWTTokenExpired (token: string) {
//   const payload = jwt_decode(token) as {exp: number};
//   const accessTokenExpDate = payload.exp;
//   const nowTime = Math.floor(new Date().getTime() / 1000)

//   return accessTokenExpDate <= nowTime
// }


// export async function handleErrors<T = {}>(
//   fetch: Promise<Response>
// ): Promise<T> {
//   try {
//     const res = await fetch;

//     if (!res.ok) {
//       const error = await res.json();

//       if (error?.statusCode) {
//         if (error.statusCode === 403 || error.statusCode === 401) {
//           throw error;
//         } else {
//           throw new BadRequest(error?.message);
//         }
//       } else if (error?.code || error?.message || error?.userMessage) {
//         if (error.code === "Unauthorized") {
//           throw new Unauthorized(error?.message || error?.userMessage);
//         } else {
//           throw new BadRequest(error?.message || error?.userMessage);
//         }
//       } else {
//         throw new Error(`Request filed with code: ${res.status}`);
//       }
//     }

//     const data = await res.json();

//     return data as T;
//   } catch (error) {
//     console.error("Fetch error: ", error);
//     throw error;
//   }
// }

// export function authHeader(token: string) {
//   return {
//     "authorization": `Bearer ${token}`
//   };
// }

// export function refreshHeader(token: string) {
//   return {
//     "refresh-token": `Bearer ${token}`
//   };
// }

export const api= '';