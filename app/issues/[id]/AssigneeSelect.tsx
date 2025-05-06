'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Skeleton } from '@/app/components';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });
  if (isLoading) return <Skeleton height={'2rem'} />;
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'null'}
        onValueChange={userId => {
          axios
            .patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId === 'null' ? null : userId,
            })
            .catch(() => {
              toast.error('Failed to update issue');
            });
        }}
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
