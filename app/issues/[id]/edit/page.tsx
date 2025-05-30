import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/DynamicIssueForm';

const IssueEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
