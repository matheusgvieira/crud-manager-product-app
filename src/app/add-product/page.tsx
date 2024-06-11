"use client";

import ProductForm from "../../components/ProductForm";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";

const AddProduct = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center align-middle mb-8 gap-4">
        <Button type="primary" onClick={router.back}>
          <Icon type="left" />
          Go back
        </Button>
        <h1 className="text-2xl font-bold">Add Product</h1>
      </div>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
