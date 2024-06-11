"use client";
import { Table, Button, Spin, Modal, Form, Input } from "antd";
import { Product, useProductStore } from "../store/useProductStore";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { Fragment, useState } from "react";
import Paragraph from "antd/es/typography/Paragraph";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAuth } from "@/store/useAuth";
import { toast } from "react-toastify";
import { usePushRoute } from "@/routes";

const ProductList = () => {
  const [form] = Form.useForm();
  const products = useProductStore((state) => state.products);
  const total = useProductStore((state) => state.total);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const authenticate = useAuth((state) => state.authenticate);
  const checkAuth = useAuth((state) => state.checkAuth);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const router = useRouter();
  const { pushRoute } = usePushRoute();
  const [openModal, setOpenModal] = useState(false);

  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const { isLoading } = useQuery(
    ["fetch-products-list", page, pageSize],
    () => Promise.all([fetchProducts(page, pageSize), checkAuth()]),
    {
      onError: () => {
        toast.error("Error fetching products, try again later!");
      },
      retry: false,
    }
  );

  const { mutate: mutateAuthentication } = useMutation(
    ["authenticate"],
    () =>
      authenticate(
        form.getFieldValue("client_id"),
        form.getFieldValue("client_secret")
      ),
    {
      onSuccess: async () => {
        setOpenModal(false);
        toast.success("Authenticated successfully, try again!");
        await checkAuth();
      },
      onError: () => {
        setOpenModal(false);
        toast.error("Invalid credentials");
      },
    }
  );

  const { mutate: mutateRemoveProduct } = useMutation(
    "remove-product",
    removeProduct,
    {
      onSuccess: () => {
        toast.success("Product removed successfully");
        router.push("/");
      },
      onError: () => {
        toast.error("Error removing product");
      },
    }
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Paragraph copyable={{ tooltips: false }}>{id}</Paragraph>
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$ ${price}`,
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Quantity", dataIndex: "stock", key: "stock" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        date ? format(new Date(date), "yyyy-MM-dd") : "",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: Product) => (
        <>
          <Button
            type="link"
            onClick={() => pushRoute(`/edit-product/${record._id}`)}
            disabled={!isAuthenticated}
          >
            <EditOutlined />
          </Button>
          <Button
            type="link"
            onClick={() => mutateRemoveProduct(record._id)}
            disabled={!isAuthenticated}
          >
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <Modal
        title="Authentication Required"
        open={openModal}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          onFinish={mutateAuthentication}
          form={form}
          initialValues={{
            client_id: "",
            client_secret: "",
          }}
        >
          <Form.Item label="Client ID" name="client_id">
            <Input placeholder="Insert your client id" />
          </Form.Item>
          <Form.Item label="Client Secret" name="client_secret">
            <Input placeholder="Insert your client secret" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between items-center">
        <Button
          type="primary"
          onClick={() => router.push("/add-product")}
          className="mb-4"
          disabled={!isAuthenticated}
        >
          Add Product
        </Button>
        <Button
          type="primary"
          onClick={() => setOpenModal(true)}
          className="mb-4"
          disabled={isAuthenticated}
        >
          Authenticate
        </Button>
      </div>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </Fragment>
  );
};

export default ProductList;
