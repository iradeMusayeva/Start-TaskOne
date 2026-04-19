import { create } from "zustand";
import { Movie, MovieFormData } from "@/types/index";
import { productService } from "@/services/product.service";

interface ProductState {
    movies: Movie[];
    loading: boolean;
    error: string | null;

    fetchMovies: () => Promise<void>;
    createMovie: (data: MovieFormData) => Promise<void>;
    updateMovie: (id: number, data: MovieFormData) => Promise<void>;
    deleteMovie: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    movies: [],
    loading: false,
    error: null,

    fetchMovies: async () => {
        set({ loading: true, error: null });
        try {
            const movies = await productService.getAll();
            set({ movies, loading: false });
        } catch {
            set({ error: "Məlumatlar yüklənmədi", loading: false });
        }
    },

    createMovie: async (data) => {
        set({ loading: true, error: null });
        try {
            const movie = await productService.create(data);
            set((state) => ({ movies: [...state.movies, movie], loading: false }));
        } catch {
            set({ error: "Yaradılmadı", loading: false });
        }
    },

    updateMovie: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const updated = await productService.update(id, data);
            set((state) => ({
                movies: state.movies.map((m) => (m.id === id ? updated : m)),
                loading: false,
            }));
        } catch {
            set({ error: "Yenilənmədi", loading: false });
        }
    },

    deleteMovie: async (id) => {
        set({ loading: true, error: null });
        try {
            await productService.delete(id);
            set((state) => ({
                movies: state.movies.filter((m) => m.id !== id),
                loading: false,
            }));
        } catch {
            set({ error: "Silinmədi", loading: false });
        }
    },
}));