import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import IssueEditButton from './IssueEditButton';
import IssueDeleteButton from './IssueDeleteButton';
import { getServerSession } from 'next-auth';
import AuthOptions from '@/app/auth/authOptions';
const IssueDetailPage = async ({
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
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <IssueEditButton issueId={issue.id} />
          {session && <IssueDeleteButton issueId={issue.id} />}
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
