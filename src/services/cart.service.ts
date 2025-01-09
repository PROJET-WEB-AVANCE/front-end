import { ArticleDto } from "../models/article";
import axiosInstance from "../interceptors/auth.interceptor";

const CART_KEY = "shopping-cart";

interface CartItem {
    article: ArticleDto;
    quantity: number;
}

export const getCart = (): { items: CartItem[]; total: number; totalItems: number } => {
    const cart = localStorage.getItem(CART_KEY);
    const parsedCart = cart ? JSON.parse(cart) : { items: [], total: 0 };

    const totalItems = parsedCart.items.reduce((sum: number, item: CartItem) =>  sum + item.quantity, 0);

    return { ...parsedCart, totalItems };
};

export const addToCart = (article: ArticleDto): void => {
    const cart = getCart();
    const existingItem = cart.items.find((item) => item.article?.name === article.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ article, quantity: 1 });
    }

    cart.total += article.price;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
};

export const removeFromCart = (name: string): void => {
    const cart = getCart();
    const itemIndex = cart.items.findIndex((item) => item.article?.name === name);

    if (itemIndex > -1) {
        const item = cart.items[itemIndex];
        cart.total -= item.article.price * item.quantity;
        cart.items.splice(itemIndex, 1);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
};

export const updateCartItemQuantity = (id: number, quantity: number): void => {
    const cart = getCart();
    const item = cart.items.find((item) => item.article?.id === id);

    if (item) {
        cart.total += (quantity - item.quantity) * item.article.price;
        item.quantity = quantity;
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
};
export const clearCart = (): void => {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cart-updated"));
};

export const cartCheckout = async  (items: { id: number; name: string;  quantity: number }[]) => {
    console.log("Sending cart : ", items)
    const response = await axiosInstance.post(`/cart/checkout`, JSON.stringify(items));
    return response.data;
};