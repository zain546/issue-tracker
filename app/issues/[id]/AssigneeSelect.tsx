/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Skeleton } from '@/app/components';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();
  if (isLoading) return <Skeleton height={'2rem'} />;
  if (error) return null;
  const assignIssue = async (userId: string) => {
  try {
      await axios
        .patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === 'null' ? null : userId,
        })
        toast.success('Issue updated successfully');
  } catch (error) {
    toast.error('Failed to update issue');
  }
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'null'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assignee..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggesions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });
