import { Status } from '@prisma/client';
import { Badge, BadgeProps } from '@radix-ui/themes';
import React from 'react';

const statusMap: Record<Status, { label: string; color: BadgeProps['color'] }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'plum' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return <Badge radius="full" color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};

export default IssueStatusBadge;
