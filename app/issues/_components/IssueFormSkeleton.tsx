import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'
const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl spae-y-5'>
    <Skeleton height={'2rem'}/>
    <Skeleton height={'20rem'}/>
    <Skeleton height={'2rem'} width={'10rem'} className='mt-5'/>
  </Box>
  )
}

export default IssueFormSkeleton