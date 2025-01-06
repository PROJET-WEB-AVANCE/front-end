import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";
import {addArticle, deleteArticle, getAllArticles} from "../../services/admin.service";
import {ArticleDto, CategoryDto} from "../../models/auth";
import {getAllCategories} from "../../services/user.service";

const Admin : React.FC = () => {

    const [articles, setArticles] = useState<ArticleDto[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<CategoryDto[] | null>(null);
    const [newArticle, setNewArticle] = useState<ArticleDto>({
        id: 0,
        reference: '',
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        categoryId: 0,
        category: {id:0, name:""},
        image: ''
    });

    useEffect(() => {
        const fetchAllArticles = async () => {
            try {
                const data = await getAllArticles();
                setArticles(data);
                console.log("All articles",data);

            } catch (err: any) {
                toast.error('Failed to load articles. Please try again.');
            }

            try {
                const categories = await getAllCategories();
                setCategories(categories);
            }catch (err: any){
                toast.error('Failed to load categories. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllArticles();
    }, []);

    const handleDeleteArticle = async (id: number) => {
        try{
            await deleteArticle(id);
            setArticles((prev) => prev?.filter((article) => article.id !== id) || []);
            toast.success("Article successfully deleted.")
        }catch (err : any){
            toast.error("Failed to delete an article. Please try again.")
        }
    }

    const resetNewArticleParams = async () => {
        setNewArticle({
            id: 0,
            reference: '',
            name: '',
            description: '',
            quantity: 0,
            price: 0,
            categoryId: 0,
            category: {id:0, name:""},
            image: ''
        });
    }

    const handleAddArticle = async (e: React.FormEvent) =>{
        e.preventDefault();
        try{
            await addArticle(newArticle);
            setArticles((prev) => (prev ? [...prev, newArticle] : [newArticle]));

            toast.success('Article added successfully!');
            await resetNewArticleParams();

        }catch (err : any){
            toast.error("Article couldn't be added. Please try again.")
        }
    }

    return (
        <div className="container py-5">
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleAddArticle}>
                <div className="mb-3">
                    <label htmlFor="reference" className="form-label">Reference</label>
                    <input
                        type="text"
                        className="form-control"
                        id="reference"
                        value={newArticle.reference}
                        onChange={(e) => setNewArticle({...newArticle, reference: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={newArticle.name}
                        onChange={(e) => setNewArticle({...newArticle, name: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={newArticle.description}
                        onChange={(e) => setNewArticle({...newArticle, description: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={newArticle.quantity}
                        onChange={(e) => setNewArticle({...newArticle, quantity: parseInt(e.target.value)})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={newArticle.price}
                        onChange={(e) => setNewArticle({...newArticle, price: parseFloat(e.target.value)})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="SelectedCategory" className="form-label">Category</label>
                    <select
                        id="SelectedCategory"
                        className="form-control"
                        value={newArticle.categoryId}
                        onChange={(e) => {
                            const selectedCategoryId = parseInt(e.target.value);
                            const selectedCategory = categories?.find(category => category.id === selectedCategoryId);
                            setNewArticle({
                                ...newArticle,
                                categoryId: selectedCategoryId,
                                category: selectedCategory || { id: 0, name: '' }  // Si la catégorie n'est pas trouvée, on met id: 0 et name: ''
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
                        value={newArticle.image}
                        onChange={(e) => setNewArticle({...newArticle, image: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Article</button>
            </form>

            <h3 className="mt-5">Articles List</h3>
            {loading ? (
                <p>Loading articles...</p>
            ) : (
                <ul className="list-group">
                    {articles?.map((article) => {

                        const category = categories?.find((cat) => cat.id === article.category.id);
                        return (
                            <li key={article.id}
                                className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{article.reference}</strong> - {article.name}
                                    <br />
                                    {article.quantity} units - {article.price} $
                                    <br />

                                    <small>Category: {category ? category.name : 'No category'}</small>
                                </div>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteArticle(article.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    )
}

export default Admin;