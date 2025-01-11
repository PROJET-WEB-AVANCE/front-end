import {CategoryDto} from "./category";

export interface ArticleDto {
    id: number;
    name: string;
    reference: string,
    description: string;
    price: number;
    quantity: number;
    image: string;
    category: CategoryDto;
}
