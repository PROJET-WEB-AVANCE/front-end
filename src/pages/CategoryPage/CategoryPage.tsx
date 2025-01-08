import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ArticleDto } from "../../models/article";
import { getAllArticles } from "../../services/article.service";
import { addToCart } from "../../services/cart.service";
import "./CategoryPage.scss";

const CategoryPage: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();
    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({ name: "", sortPrice: "asc", limit: 12, offset: 0 });
    const [total, setTotal] = useState<number>(0);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const data = await getAllArticles({ categoryName, ...filters });
            setArticles(data.data);
            setTotal(data.total);
        } catch (error: any) {
            if (error.response?.status === 404) {
                toast.error("Category not found. Redirecting...");
                setTimeout(() => navigate("/home"), 1000);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch articles every time the categoryName changes
    useEffect(() => {
        fetchArticles();
    }, [categoryName, filters]); // Dependencies include categoryName and filters

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, name: e.target.value, offset: 0 });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, sortPrice: e.target.value });
    };

    const handleAddToCart = (article: ArticleDto) => {
        addToCart(article);
        toast.success(`${article.name} added to cart`);
    };

    const handlePageChange = (page: number) => {
        setFilters({ ...filters, offset: (page - 1) * filters.limit });
    };

    const totalPages = Math.ceil(total / filters.limit);

    if (loading) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="container py-5 category-page">
            <Toaster />
            <h1 className="text-primary mb-4">Products in "{categoryName}"</h1>

            <div className="filters row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="Search by name..."
                        onChange={handleSearchChange}
                        value={filters.name}
                    />
                </div>
                <div className="col-md-6 text-end">
                    <select
                        className="form-select shadow-sm w-auto d-inline"
                        onChange={handleSortChange}
                        value={filters.sortPrice}
                    >
                        <option value="asc">Sort by Price: Low to High</option>
                        <option value="desc">Sort by Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {articles.map((article) => (
                    <div key={article.id} className="col-4 mb-4">
                        <div className="card product-card border-0 shadow-sm h-100">
                            <img
                                src={article.image || "https://via.placeholder.com/300x200"}
                                className="card-img-top"
                                alt={article.name}
                            />
                            <div className="card-body flex-column text-center">
                                <h5 className="card-title text-primary">{article.name}</h5>
                                <p className="card-text text-muted">{article.description}</p>
                                <p className="text-muted fw-bold">Price: ${article.price.toFixed(2)}</p>
                                <div>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleAddToCart(article)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => navigate(`/article/${article.name}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav>
                <ul className="pagination justify-content-center mt-4">
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${filters.offset / filters.limit === i ? "active" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default CategoryPage;
