import { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Button, Modal, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

export default function TransactionForm() {
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState({
    amount: 0,
    transactionDate: moment().format('YYYY-MM-DD'),
    categoryId: 0,
    description: '',
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
        if (response.data.length > 0) {
          setCategories(response.data);
          handleCategoryChange(response.data[0].id);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
    // eslint-disable-next-line
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChange(e) {
    transaction[e.target.name] = e.target.value;
    setTransaction({ ...transaction });
  }

  function handleAmountChange(e) {
    transaction[e.target.name] = parseFloat(e.target.value);
    setTransaction({ ...transaction });
  }

  function handleCategoryChange(value) {
    transaction['categoryId'] = parseFloat(value);
    setTransaction({ ...transaction });
  }

  function onChangeDate(date, dateString) {
    transaction['transactionDate'] = dateString;
    setTransaction({ ...transaction });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/transaction', transaction, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        message.success('Successfully added a transaction');
        setIsModalVisible(false);
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const hasCategory = () => {
    return categories.length > 0;
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new Transaction
      </Button>
      <Modal
        title="Add a category"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          {hasCategory() ? (
            <Select
              defaultValue={categories[0].id}
              style={{ width: '100%' }}
              className="mb-3"
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          ) : null}
          <DatePicker
            className="mb-3"
            onChange={onChangeDate}
            defaultValue={moment()}
          />
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              name="amount"
              onChange={handleAmountChange}
            />
            <label for="floatingInput">Amount</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              onChange={handleChange}
            />
            <label for="floatingInput">Description</label>
          </div>
          {hasCategory() && (
            <button className="w-100 btn btn-primary mb-3" type="submit">
              Add
            </button>
          )}
        </form>
      </Modal>
    </>
  );
}
