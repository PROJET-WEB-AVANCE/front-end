import React from 'react';

const mockArticles = [
    { id: 1, reference: 'A1001', name: 'Produit 1', quantity: 10, price: 99.99, category: 'Category 1', image: '' },
    { id: 2, reference: 'A1002', name: 'Produit 2', quantity: 5, price: 199.99, category: 'Category 1', image: '' },
    { id: 3, reference: 'A1003', name: 'Produit 3', quantity: 3, price: 299.99, category: 'Category 2', image: '' },
    { id: 4, reference: 'A1004', name: 'Produit 4', quantity: 2, price: 499.99, category: 'Category 4', image: '' },
];

const Home: React.FC = () => {
    return (
        <div className="container py-5">
            <h1 className="mb-5 text-center text-gradient fw-bold">
                Welcome to <span className="text-primary"> SHOPY 🧺😎</span>
            </h1>

            <Carousel articles={mockArticles} />

            <div className="row">
                {mockArticles.map((article) => (
                    <ProductCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

const Carousel: React.FC<{ articles: typeof mockArticles }> = ({ articles }) => (
    <div id="carouselExample" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
            {articles.map((article, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={article.id}>
                    <img
                        src={article.image || 'https://via.placeholder.com/800x400?text=Placeholder'}
                        className="d-block w-100 rounded-3 shadow-lg"
                        alt={article.name || 'Placeholder'}
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h3 className="text-dark fw-bold">{article.name || 'Product Name'}</h3>
                        <p className="text-warning fs-5">${article.price.toFixed(2) || '0.00'}</p>
                    </div>
                </div>
            ))}
        </div>
        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
        >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
        >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
);

const ProductCard: React.FC<{ article: typeof mockArticles[0] }> = ({ article }) => (
    <div className="col-md-4 mb-4">
        <div className="card product-card border-0 shadow-lg h-100">
            <div className="product-card-img position-relative">
                <img
                    src={article.image || 'https://via.placeholder.com/300x200?text=Placeholder'}
                    alt={article.name || 'Placeholder'}
                    className="card-img-top"
                    style={{ objectFit: 'cover', borderRadius: '15px 15px 0 0' }}
                />
                <span className="badge bg-success price-badge">${article.price.toFixed(2) || '0.00'}</span>
            </div>
            <div className="card-body">
                <h5 className="card-title text-primary fw-bold">{article.name || 'Product Name'}</h5>
                <p className="card-text text-muted">
                    <strong>Category:</strong> {article.category || 'Category'}
                </p>
                <button className="btn btn-primary btn-gradient w-100 fw-bold mt-3">Add to Cart</button>
            </div>
        </div>
    </div>
);

export default Home;
