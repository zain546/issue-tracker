import { prisma } from '@/prisma/client';
import { Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssuesActions from './IssuesActions';
import IssueTable, { columnValues, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
interface Props {
  searchParams: Promise<IssueQuery>;
}

export default async function IssuePage({ searchParams }: Props) {
  const params = await searchParams;
  const statuses = Object.values(Status);
  const validateStatus = statuses.includes(params.status)
    ? params.status
    : undefined;
  const validateorderBy = columnValues.includes(params.orderBy)
    ? { [params.orderBy]: 'asc' }
    : undefined;
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const where = { status: validateStatus };
  const issues = await prisma.issue.findMany({
    where,
    orderBy: validateorderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });
  return (
    <Flex direction="column" gap="3">
      <IssuesActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}
// export const revalidate = 0; means no cache, it will revalidate every time the page is visited, it's purpose is to make sure the data is up to date when the page is visited
export const dynamic = 'force-dynamic';
