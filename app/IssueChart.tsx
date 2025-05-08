'use client';
import { Card } from '@radix-ui/themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMediaQuery } from 'react-responsive';
interface ValueProps {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueChart = ({ values }: { values: ValueProps }) => {
  const { open, inProgress, closed } = values;
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar
            dataKey="value"
            barSize={isMobile ? 40 : 60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
