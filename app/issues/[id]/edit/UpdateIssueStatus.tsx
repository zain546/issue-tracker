import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react'

const UpdateIssueStatus = () => {
    const statuses = Object.values(Status);
  return (
   <Select.Root>
    <Select.Trigger placeholder="Update Status..." />
    <Select.Content>
    <Select.Group>
    {statuses.map(status => (
        <Select.Item key={status} value={status}>{status}</Select.Item>
    ))}
    </Select.Group>
    </Select.Content>
   </Select.Root>
  )
}

export default UpdateIssueStatus