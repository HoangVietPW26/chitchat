import {create} from 'zustand';
import {axiosInstance }from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    checkAuth: async () => {
        try {
            const res = axiosInstance.get('/auth/check');
            set({authUser: res.data})
        } catch (error) {
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser: res.data})
            toast.success("Acoount created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp: false})
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });
          console.log(res.data);
          toast.success("Logged in successfully");
    
        //   get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            set({authUser: null});
            toast.success("Log out sucessfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))
