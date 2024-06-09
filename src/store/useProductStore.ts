import { api } from "@/services/api";
import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type ProductCreate = Omit<
  Product,
  "_id" | "created_at" | "updated_at" | "deleted_at"
>;

export type ProductUpdate = Omit<
  Product,
  "created_at" | "updated_at" | "deleted_at"
>;

interface ProductStore {
  products: Product[];
  fetchProducts: (page: number, page_size: number) => Promise<void>;
  addProduct: (product: ProductCreate) => Promise<void>;
  updateProduct: (product: ProductUpdate) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async (page: number, page_size: number): Promise<void> => {
    const { data: products } = await api.get("/product", {
      params: {
        page,
        page_size,
      },
    });

    set({ products: products.data });
  },
  addProduct: async (product: ProductCreate): Promise<void> => {
    const { name, price, description, stock, category } = product;

    const { data } = await api.post<{ product: Product }>("/product", {
      name,
      price,
      description,
      stock,
      category,
    });

    set((state) => ({ products: [...state.products, data.product] }));
  },
  updateProduct: async (product: ProductUpdate): Promise<void> => {
    const { name, price, description, stock, category, _id } = product;

    const { data } = await api.put<Product>(`/product/${_id}`, {
      name,
      price,
      description,
      stock,
      category,
    });
    set((state) => ({
      products: state.products.map((p) => (p._id === data._id ? data : p)),
    }));
  },
  removeProduct: async (id): Promise<void> => {
    await api.delete<Product>(`/product/${id}`);

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },
}));
