import Layout from './Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Table, Tag, Button, Modal, Select } from 'antd';

const { Option } = Select;

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: '',
    transactionType: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios
      .get('/category', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.data.length > 0) setCategories(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChange(e) {
    category[e.target.name] = e.target.value;
    setCategory({ ...category });
  }

  function handleTypeChange(value) {
    category['transactionType'] = value;
    setCategory({ ...category });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/category', category, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        message.success('Successfully added a category');
        setIsModalVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const columns = [
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (transactionType) => (
        <Tag color={transactionType === 'Income' ? 'green' : 'red'}>
          {transactionType}
        </Tag>
      ),
    },
    {
      title: 'Category name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <Layout
      title="Category"
      topContent={
        <Button type="primary" onClick={showModal}>
          Add new Category
        </Button>
      }
    >
      <Table
        dataSource={categories}
        columns={columns}
        bordered={true}
        pagination={false}
      />
      <Modal
        title="Add a category"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <Select
            defaultValue={category.transactionType}
            style={{ width: '100%' }}
            className="mb-3"
            onChange={handleTypeChange}
          >
            <Option value={0}>Income</Option>
            <Option value={1}>Expense</Option>
          </Select>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Category name"
              name="name"
              onChange={handleChange}
            />
            <label for="floatingInput">Category name</label>
          </div>

          <button className="w-100 btn btn-primary mb-3" type="submit">
            Add
          </button>
        </form>
      </Modal>
    </Layout>
  );
}
