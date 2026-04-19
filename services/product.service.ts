import axiosInstance from "./axiosInstance";
import { Movie, MovieFormData } from "@/types/index";

export const productService = {
    getAll: async (): Promise<Movie[]> => {
        const res = await axiosInstance.get("/movie-list/");
        return res.data;
    },

    getById: async (id: number): Promise<Movie> => {
        const res = await axiosInstance.get(`/movie-list/${id}/`);
        return res.data;
    },

    create: async (data: MovieFormData): Promise<Movie> => {
        const res = await axiosInstance.post("/movie-list/", data);
        return res.data;
    },

    update: async (id: number, data: MovieFormData): Promise<Movie> => {
        const res = await axiosInstance.put(`/movie-list/${id}/`, data);
        return res.data;
    },

    delete: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/movie-list/${id}/`);
    },
};