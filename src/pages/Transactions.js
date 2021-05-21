import Layout from './Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Table, Tag, Statistic } from 'antd';
import Balance from '../components/common/Balance';
import TransactionForm from '../components/common/TransactionForm';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    axios
      .get('/transaction', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setTransactions(response.data);
        }
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  useEffect(() => {
    const calcIncome = () => {
      let sum = 0;

      transactions
        .filter((transaction) => transaction.transactionType === 'Income')
        .forEach((transaction) => (sum += transaction.amount));

      setIncome(sum);
    };

    calcIncome();
  }, [transactions]);

  const columns = [
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
      render: (transactionType, index) => {
        return (
          <Tag
            color={transactionType === 'Income' ? 'green' : 'red'}
            key={`${transactionType}${index}`}
          >
            {transactionType}
          </Tag>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Statistic key={amount} value={amount} />,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
  ];

  return (
    <Layout title="Transactions" topContent={<TransactionForm />}>
      <Balance incomeAmount={income} />
      <Table
        dataSource={transactions}
        columns={columns}
        bordered={true}
        pagination={false}
        rowkey="id"
      />
    </Layout>
  );
}
