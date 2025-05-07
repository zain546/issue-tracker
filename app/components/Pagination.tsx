import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import React from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align={'center'} gap={'2'}>
      <Text size={'2'}>
        page of {currentPage} of {pageCount}
      </Text>
      <Button variant='soft' disabled={currentPage === 1}>
        <DoubleArrowLeftIcon/>
      </Button>
      <Button variant='soft' disabled={currentPage === 1}>
        <ChevronLeftIcon/>
      </Button>
      <Button variant='soft' disabled={currentPage === pageCount}>
        <ChevronRightIcon/>
      </Button>
      <Button variant='soft' disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon/>
      </Button>
    </Flex>
  );
};

export default Pagination;
