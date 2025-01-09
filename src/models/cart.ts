export interface cartDto {
    userId: number;
    date: Date;
    items: { id: number; name: string;  quantity: number }[];
}