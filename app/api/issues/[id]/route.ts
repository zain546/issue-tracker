import { getServerSession } from 'next-auth';
import { IssueSchema } from '@/app/validationSchemas';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import AuthOptions from '@/app/auth/authOptions';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const seesion = await getServerSession(AuthOptions);
  if (!seesion) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }
  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json({
    message: 'Issue updated successfully',
    updatedIssue,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const seesion =   await getServerSession(AuthOptions);
  if (!seesion) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }
  const deletedIssue = await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({
    message: 'Issue deleted successfully',
    deletedIssue,
  });
}
