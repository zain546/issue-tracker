import AuthOptions from '@/app/auth/authOptions';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import IssueDetailPageClient from './IssueDetailPageClient';
const IssueDetailPageServer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await getServerSession(AuthOptions);
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!issue) return notFound();
  return <IssueDetailPageClient issue={issue} session={session} />;
};

export default IssueDetailPageServer;
