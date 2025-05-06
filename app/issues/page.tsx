import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { Link, IssueStatusBadge } from '@/app/components';
import IssuesActions from './IssuesActions';
import { Status } from '@prisma/client';
interface Props {
  searchParams: Promise<{ status: Status }>;
}
export default async function IssuePage({ searchParams }: Props) {
  const status = (await searchParams).status;
  const statuses = Object.values(Status);
  const validateStatus = statuses.includes(status) ? status : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: validateStatus,
    },
  });
  return (
    <div>
      <IssuesActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
}
// export const revalidate = 0; means no cache, it will revalidate every time the page is visited, it's purpose is to make sure the data is up to date when the page is visited
export const dynamic = 'force-dynamic';
