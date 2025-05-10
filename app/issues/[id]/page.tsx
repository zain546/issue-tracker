import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import AuthOptions from '@/app/auth/authOptions';
import IssueDetailPageClient from './IssueDetailPageClient';

const IssueDetailPageServer = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(AuthOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue) notFound();

  return <IssueDetailPageClient issue={issue} session={session} />;
};

export default IssueDetailPageServer;
