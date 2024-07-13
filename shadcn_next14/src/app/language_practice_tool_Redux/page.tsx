import React from 'react';
import ClientApp from './ClientApp'; 
import { Metadata } from 'next';
import { CommonMetadata }  from '../common/languageComponent';

export const metadata: Metadata = CommonMetadata;


const Page = () => {
  return (
    <div>
      <ClientApp />
    </div>
  );
};

export default Page;
