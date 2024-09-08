import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://mind-castle-gql-server.csproject.org/",
  withCredentials: true,
});
export const setUpInterceptors = () => {
  axiosClient.interceptors.request.use(
    (request) => {
      const currentState = JSON.parse(localStorage.getItem("token") || "{access: ''}");
      request.headers[
        "Authorization"
      ] = `Bearer ${currentState.accessToken}`;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },

    // async (error) => {
    //   console.log("start");
    //   const originalConfig = error.config;
    //   console.log(originalConfig, "see originconfig");
    //   if (error.response && originalConfig.url !== "/landing") {
    //     console.log(
    //       error.response.status === 401 && !originalConfig._retry,
    //       notExpire,
    //       "checkconditionjust"
    //     );
    //     if (
    //       error.response.status === 401 &&
    //       !originalConfig._retry &&
    //       notExpire != 5
    //     ) {
    //       console.log(
    //         error.response.status === 401 && !originalConfig._retry,
    //         "checkcondition"
    //       );
    //       originalConfig._retry = true;
    //       notExpire += 1;
    //       try {
    //         console.log("enter in try block refresh the token");
    //         const res = await axiosClient.post("/api/auth/refresh");
    //         notExpire = 0;
    //         console.log(res.status, "res");
    //         const { access_token } = res.data;
    //         console.log(access_token, "token");
    //         localStorage.setItem("token", JSON.stringify(user));
    //         return axiosClient(originalConfig);
    //       } catch (error) {
    //         console.log(error, "error");
    //         if (error.response.status === 400) {
    //           clearAuth();
    //           return Promise.reject({
    //             message:
    //               "Refresh token not found in cookies and Access token expired",
    //           });
    //         }
    //         console.log("this is clear auth part", error?.response?.status);
    //         return Promise.reject({ message: "Access token expired" });
    //       }
    //     }
    //     if (notExpire === 5) {
    //         localStorage.removeItem("token");
    //       notExpire = 0;
    //       console.log("refresh token expired");
    //     //   navigate("/landing");
    //       return Promise.reject({ message: "refresh token expired" });
    //     }
    //   }
    //   notExpire = 0;
    //   console.log("end");
    //   return Promise.reject(error);
    // }
  );
};

export const getToken=async(resp,nav)=>{
  if(resp=='401: Unauthorized credentials'){
    const currentState = JSON.parse(localStorage.getItem("token") || "{access: ''}");
    console.log(currentState.accessToken,'gettokengraphql')
    try{
      const res = await axiosClient.post("/api/auth/refresh");
      console.log(res.status, "res");
      const { access_token } = res.data;
      console.log(access_token, "token");
      const user= JSON.parse(
        localStorage.getItem("token") || "{access: ''}"
      );
      localStorage.setItem(
        "token",
        JSON.stringify({ ...user, accessToken: access_token })
      );
      window.location.reload(false)
    }catch(error){
      console.log(error?.response?.status,'rfrsherr')
      if(error?.response?.status==400 || error?.response?.status==401){
        localStorage.removeItem("token");
      }
      nav('/landing')
    }
  }
}
