import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import delay from 'delay';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
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
      <Heading>{issue.title}</Heading>
      <Flex gap={'2'} my={'2'} align={'center'}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
