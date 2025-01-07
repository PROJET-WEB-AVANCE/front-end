import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleDto } from "../../models/article";
import { getArticleByName } from "../../services/article.service";
import { addToCart } from "../../services/cart.service";
import toast, { Toaster } from "react-hot-toast";
import "./ArticleDetailsPage.scss";

const ArticleDetailsPage: React.FC = () => {
    const { articleName } = useParams<{ articleName: string }>();
    const [article, setArticle] = useState<ArticleDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getArticleByName(articleName);
                setArticle(data);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [articleName]);

    const handleAddToCart = (article: ArticleDto) => {
        addToCart(article);
        toast.success(`${article.name} added to cart`);
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;

    if (!article) return <div className="text-center py-5">Article not found</div>;

    return (
        <div className="container py-5 article-details">
            <Toaster />
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={article.image || "https://via.placeholder.com/600x400"}
                        alt={article.name}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <div className="align-items-center justify-content-center d-flex flex-column">
                        <h1>{article.name}</h1>
                        <p className="lead">{article.description}</p>
                        <p>
                            <strong>Price:</strong> ${article.price}
                        </p>
                        <p>
                            <strong>Quantity Available:</strong> {article.quantity}
                        </p>
                        <div></div>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => handleAddToCart(article)}
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ArticleDetailsPage;
