// import {create} from "zustand";
// import {axiosInstance} from "../lib/axios.js"
// import toast from "react-hot-toast";

// export const useAuthStore= create( (set) => ({ //Initial State
//     authUser: null,
//     isSigningUp: false,
//     isLoggingIng: false,
//     isUpdatingProfile: false,

//     isCheckingAuth: true,

//     checkAuth: async () => {
//         try {
//             const res= await  axiosInstance.get("/auth/check");

//             set({authUser: res.data});
//         } catch (error) {
//             console.log("Error in checkAuth", error.message);
//             set({authUser: null});
//         }finally{
//             set({ isCheckingAuth: false })
//         }
//     },

//     signup: async (data) => {
//       set({ isSigningUp: true });
//       try {

//         const res= await axiosInstance.post("/auth/signup", data);

//         toast.success("Account created successfully");

//         set({authUser: res.data});
//       } catch (error) {
//         toast.error(error.response.data.message);
//       }finally{
//         set({ isSigningUp: false });
//       }
//     },
// }))

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      // ✅ Only show toast when user is new and created
      if (res.status === 201) {
        toast.success("Account created successfully");
      }

      set({ authUser: res.data });
    } catch (error) {
      // ✅ Avoid double toast issue by checking if error.response exists
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully")
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    try {
        const res= await axiosInstance.post("/auth/login", data);

        if(res.status === 200){
            toast.success("Logged in");
        }

        set({authUser: res.data});
    } catch (error) {
        toast.error(error.res.data.message);
    }finally{
        set({isLoggingIn: false});
    }
  }

}));
