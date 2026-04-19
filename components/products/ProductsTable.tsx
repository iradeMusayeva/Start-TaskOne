"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/product.store";
import { Movie } from "@/types/index";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

interface Props {
    initialMovies: Movie[];
}

export default function ProductsTable({ initialMovies }: Props) {
    const { movies, fetchMovies, deleteMovie, loading } = useProductStore();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        if (initialMovies.length > 0) {
            useProductStore.setState({ movies: initialMovies });
        } else {
            fetchMovies();
        }
    }, []);

    const filtered = movies.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice((page - 1) * perPage, page * perPage);
    const totalPages = Math.ceil(filtered.length / perPage);

    const handleDelete = async (id: number) => {
        await deleteMovie(id);
        toast.success("Silindi");
    };

    if (loading) return <p>Yüklənir...</p>;

    return (
        <div>
            {/* Search */}
            <input
                type="text"
                placeholder="Axtar..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                className="border px-3 py-2 rounded mb-4 w-full max-w-sm"
            />

            {/* Table */}
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-muted text-left">
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Title</th>
                        <th className="p-3 border">IMDB</th>
                        <th className="p-3 border">Duration</th>
                        <th className="p-3 border">Release</th>
                        <th className="p-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((movie) => (
                        <tr key={movie.id} className="hover:bg-muted/50">
                            <td className="p-3 border">{movie.id}</td>
                            <td className="p-3 border">{movie.title}</td>
                            <td className="p-3 border">{movie.imdb}</td>
                            <td className="p-3 border">{movie.duration} dəq</td>
                            <td className="p-3 border">{movie.release}</td>
                            <td className="p-3 border">
                                <div className="flex gap-2">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(movie.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Əvvəlki
                </button>
                <span className="px-3 py-1">
                    {page} / {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Növbəti
                </button>
            </div>
        </div>
    );
}