"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Space, InputNumber } from "antd";
import { Product, useProductStore } from "../store/useProductStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

interface ProductFormProps {
  id?: string;
}

const ProductForm = ({ id }: ProductFormProps) => {
  const [form] = Form.useForm();
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const products = useProductStore((state) => state.products);
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
  } as Product);
  const router = useRouter();

  const { mutate: mutateAddProduct, isLoading: isLoadingAddProduct } =
    useMutation("add-product", addProduct, {
      onSuccess: () => {
        toast.success("Product added successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Error adding product");
      },
    });

  const { mutate: mutateUpdateProduct } = useMutation(
    "update-product",
    updateProduct,
    {
      onSuccess: () => {
        toast.success("Product updated successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Error updating product");
      },
    }
  );

  useEffect(() => {
    if (id) {
      const productToEdit = products.find((product) => product._id === id);
      if (productToEdit) setProduct(productToEdit);
      form.setFieldsValue(productToEdit);
    }
  }, [id, products]);

  const onFinish = (values: any) => {
    if (id) {
      mutateUpdateProduct({ ...values, _id: id });
    } else {
      mutateAddProduct({ ...values });
    }
    router.push("/");
  };

  return (
    <Form
      initialValues={product}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      form={form}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Product name" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, type: "number" }]}
      >
        <InputNumber<number>
          defaultValue={1000}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
        />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="stock"
        rules={[{ required: true, type: "number" }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
        <Input placeholder="Write the category" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Product description" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Space size="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoadingAddProduct}
          >
            {id ? "Update" : "Add"}
          </Button>
          <Button type="default" onClick={() => form.resetFields()}>
            Clear
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
