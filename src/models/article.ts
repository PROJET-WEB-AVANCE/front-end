import {CategoryDto} from "./category";

export interface ArticleDto {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    category: CategoryDto;
}
