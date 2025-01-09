import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getArticleById, updateArticle } from '../../services/admin.service';
import { getAllCategories } from '../../services/user.service';
import {ArticleDto} from "../../models/article";
import {CategoryDto} from "../../models/category";

const EditItem: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [article, setArticle] = useState<ArticleDto | null>(null);
    const [categories, setCategories] = useState<CategoryDto[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchArticleAndCategories = async () => {
            try {
                const articleData = await getArticleById(parseInt(id!));
                setArticle(articleData);
            }catch (err: any) {
                toast.error('Failed to load article.');
            }
            try{

                const categoriesData = await getAllCategories();
                setCategories(categoriesData);
            } catch (err: any) {
            toast.error('Failed to load categories.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticleAndCategories();
    }, [id]);

    const handleUpdateArticle = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!article) return;

        try {
            await updateArticle(article);
            toast.success('Article updated successfully!');
            navigate('/admin');
        } catch (err: any) {
            toast.error("Article couldn't be updated. Please try again.");
        }
    };

    return (
        <div className="container py-5">
            <h2>Edit Article</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                article && (
                    <form onSubmit={handleUpdateArticle}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={article.name}
                                onChange={(e) => setArticle({...article, name: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={article.description}
                                onChange={(e) => setArticle({...article, description: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                value={article.quantity}
                                onChange={(e) => setArticle({...article, quantity: parseInt(e.target.value)})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={article.price}
                                onChange={(e) => setArticle({...article, price: parseFloat(e.target.value)})}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="SelectedCategory" className="form-label">Category</label>
                            <select
                                id="SelectedCategory"
                                className="form-control"
                                value={article.category.id}
                                onChange={(e) => {
                                    const selectedCategoryId = parseInt(e.target.value);
                                    const selectedCategory = categories?.find(category => category.id === selectedCategoryId);
                                    setArticle({
                                        ...article,
                                        category: selectedCategory || {id: 0, name: ''}
                                    });
                                }}
                            >
                                <option value={0}>Select Category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                value={article.image}
                                onChange={(e) => setArticle({...article, image: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Article</button>
                    </form>
                )
            )}
        </div>
    );
};

export default EditItem;
