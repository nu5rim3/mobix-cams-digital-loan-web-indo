import * as React from 'react';

export interface IBreadCrumbContainerProps {
  children: React.ReactNode
}

export default function BreadCrumbContainer({
  children
}: IBreadCrumbContainerProps) {
  return (
    <div className='h-8 mb-3'>
      {children}
    </div>

  );
}
