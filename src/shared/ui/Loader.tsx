import { Flex, Loader as MantineLoader } from '@mantine/core';
import React from 'react';

export const Loader: React.FC = () => (
  <Flex align={'center'} justify={'center'} h="70vh">
    <MantineLoader />
  </Flex>
);
