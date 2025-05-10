'use client';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
interface Props{
  issue: Issue;
  onStatusChange?: (status: Status) => void;
}
const UpdateIssueStatus = ({ issue, onStatusChange }:Props) => {
  const statuses = Object.values(Status);
  const updateStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, { status });
      toast.success('Issue updated successfully');
      onStatusChange?.(status);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to update issue');
    }
  };
  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={updateStatus}>
        <Select.Trigger placeholder="Update Status..." />
        <Select.Content>
          <Select.Group>
            {statuses.map(status => (
              <Select.Item key={status} value={status}>
                {status}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default UpdateIssueStatus;
