'use client';

import { Issue } from '@prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import IssueDetails from './IssueDetails';
import IssueEditButton from './IssueEditButton';
import IssueDeleteButton from './IssueDeleteButton';
import AssigneeSelect from './AssigneeSelect';
import UpdateIssueStatus from './edit/UpdateIssueStatus';
import { useState } from 'react';
import { Session } from 'next-auth';

const IssueDetailPageClient = ({
  issue: initialIssue,
  session,
}: {
  issue: Issue;
  session: Session | null;
}) => {
  const [issue, setIssue] = useState(initialIssue);

  const handleStatusChange = (newStatus: Issue['status']) => {
    setIssue((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <UpdateIssueStatus issue={issue} onStatusChange={handleStatusChange} />
          <IssueEditButton issueId={issue.id} />
          {session && <IssueDeleteButton issueId={issue.id} />}
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPageClient;
