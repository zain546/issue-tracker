import AuthOptions from '@/app/auth/authOptions';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import IssueDetailPageClient from './IssueDetailPageClient';
interface Props {
  params: Promise<{ id: string }>;
}
const IssueDetailPageServer = async ({ params }: Props) => {
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

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!issue) return notFound();
  return { title: issue.title, description: `Details of issue ${issue.id}` };
}

export default IssueDetailPageServer;
