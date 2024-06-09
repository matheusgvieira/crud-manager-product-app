"use client";

import { LeftOutlined } from "@ant-design/icons";
import ProductForm from "../../components/ProductForm";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center align-middle mb-4">
        <button className="px-4 py-2 rounded" onClick={() => router.push("/")}>
          <LeftOutlined />
        </button>
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      </div>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
