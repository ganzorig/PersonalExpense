import { useEffect, useState } from 'react';
import axios from 'axios';
import { Statistic, Card, Row, Col, message } from 'antd';

export default function Index({ incomeAmount }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get('/report/getBalance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setBalance(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  return (
    <div className="balance-statistic">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Balance"
              value={balance}
              precision={2}
              valueStyle={{ color: '#341f97' }}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Income"
              value={incomeAmount}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Expense"
              value={incomeAmount - balance}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix="$"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
