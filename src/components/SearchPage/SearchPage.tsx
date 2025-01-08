import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllArticles } from "../../services/article.service";
import { addToCart } from "../../services/cart.service";
import { ArticleDto } from "../../models/article";
import toast from "react-hot-toast";

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const navigate = useNavigate();
    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const data = await getAllArticles({
                    name: query,
                    limit: 20,
                    categoryName: undefined,
                    offset: 0,
                    sortPrice: "asc",
                });
                setArticles(data.data);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [query]);

    const handleAddToCart = (article: ArticleDto) => {
        addToCart(article);
        toast.success(`${article.name} added to cart`);
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;

    return (
        <div className="container py-5">
            <h1 className="text-primary mb-4">Search Results for "{query}"</h1>
            <div className="row">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article.id} className="col-md-4 mb-4">
                            <div className="card product-card border-0 shadow-sm h-100">
                                <img
                                    src={article.image || "https://via.placeholder.com/300x200"}
                                    alt={article.name}
                                    className="card-img-top"
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="card-body flex-column text-center">
                                    <h5 className="card-title text-primary">{article.name}</h5>
                                    <p className="card-text text-muted">{article.description}</p>
                                    <p className="fw-bold text-muted">
                                        Price: ${article.price.toFixed(2)}
                                    </p>
                                    <button
                                        className="btn btn-primary btn-sm mb-2"
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
                    ))
                ) : (
                    <div className="text-center">No results found for "{query}"</div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
