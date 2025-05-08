import { Status } from '@prisma/client';
import { Badge, Card, Flex } from '@radix-ui/themes';
import Link from 'next/link';

interface ValuesProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ values }: { values: ValuesProps }) => {
  const { open, inProgress, closed } = values;
  const issues: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In_Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];
  return (
    <Flex gap="4">
      {issues.map(issue => (
        <Card key={issue.label}>
          <Flex direction="column" align="start" gap="2">
            <Link
              className="text-sm font-semibold"
              href={`/issues?status=${issue.status}`}
            >
              {issue.label}
            </Link>
            <Badge
              color={
                issue.status === 'OPEN'
                  ? 'red'
                  : issue.status === 'IN_PROGRESS'
                  ? 'plum'
                  : 'green'
              }
            >
              {issue.value}
            </Badge>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
