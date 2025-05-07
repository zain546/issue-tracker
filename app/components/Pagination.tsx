'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

import React from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  const onChange = (page: number) => {
   const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <Flex align={'center'} gap={'2'}>
      <Text size={'2'}>
        page of {currentPage} of {pageCount}
      </Text>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => onChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => onChange(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
