import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';
import { IssueSchema } from '../../validationSchemas';
import AuthOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
export async function POST(request: NextRequest) {
  const seesion = await getServerSession(AuthOptions);
  if (!seesion) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
