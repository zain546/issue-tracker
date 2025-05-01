import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import delay from 'delay';
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  await delay(2000);
  if (!issue) notFound();
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
