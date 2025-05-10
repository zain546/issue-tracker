import AuthOptions from '@/app/auth/authOptions';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import IssueDetailPageClient from './IssueDetailPageClient';
import { cache } from 'react';
interface Props {
  params: Promise<{ id: string }>;
}


const fetchUser = cache((issueId:number)=>prisma.issue.findUnique({where:{id:issueId}}))
const IssueDetailPageServer = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);
  const { id } = await params;
  const issue = await fetchUser(Number(id));
  if (!issue) return notFound();
  return <IssueDetailPageClient issue={issue} session={session} />;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(Number(id));
  if (!issue) return notFound();
  return { title: issue.title, description: `Details of issue ${issue.id}` };
}

export default IssueDetailPageServer;
