import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllCategories} from "../../services/category.service";
import {CategoryDto} from "../../models/category";
import './SubNavbar.scss';


const SubNavbar: React.FC = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <nav className="sub-navbar navbar navbar-expand-lg bg-primary">
            <div className="container">
                <ul className="navbar-nav">
                    {categories.map((category) => (
                        <li key={category.id} className="nav-item">
                            <Link to={`/category/${category.name}`} className="nav-link text-white">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default SubNavbar;
