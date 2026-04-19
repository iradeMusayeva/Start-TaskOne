import { productService } from "@/services/product.service";
import ProductsTable from "@/components/products/ProductsTable";
import { Movie } from "@/types";

// SSR — server component
export default async function ProductsPage() {
    let movies: Movie[] = [];

    try {
        movies = await productService.getAll();
    } catch {
        movies = [];
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <ProductsTable initialMovies={movies} />
        </div>
    );
}