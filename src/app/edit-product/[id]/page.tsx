"use client";
import { LeftOutlined } from "@ant-design/icons";
import ProductForm from "../../../components/ProductForm";
import { useParams, useRouter } from "next/navigation";

const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    router.back();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center align-middle mb-4">
        <button className="px-4 py-2 rounded" onClick={() => router.push("/")}>
          <LeftOutlined />
        </button>

        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      </div>
      <ProductForm id={String(id)} />
    </div>
  );
};

export default EditProduct;
