import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import { default as NextLink } from 'next/link';
import { IssueStatusBadge, Link } from '../components';

export interface IssueQuery{
    status: Status;
    orderBy: keyof Issue;
    page: string;
    
}
interface Props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
}
const IssueTable = async({ searchParams, issues}: Props) => {
    const params = await searchParams;
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.classname}
            >
              <NextLink
                href={{
                  query: { ...params, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === params.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden text-xs">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;

const columns: { label: string; value: keyof Issue; classname?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', classname: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', classname: 'hidden md:table-cell' },
  ];
  export const columnValues = columns.map(column => column.value);