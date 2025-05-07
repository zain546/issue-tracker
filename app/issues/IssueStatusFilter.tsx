'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];
  const router = useRouter();
 const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={status => {
        // Convert "ALL" to empty string since we can't use empty value in <Select.Item />
        const filterValue = status === 'ALL' ? '' : status;
        const orderBy = searchParams.get('orderBy');
        if (orderBy) {
          // If orderBy is present in url then add it to the query string 
          const query = filterValue ? `?status=${filterValue}&orderBy=${orderBy}` : `?orderBy=${orderBy}`; 
          router.push(`/issues${query}`);
          return;
        }

        const query = filterValue ? `?status=${filterValue}` : '';
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses?.map(status => (
          <Select.Item key={status.label} value={status.value || 'ALL'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
