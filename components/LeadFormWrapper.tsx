"use client";

import React from 'react';
import LeadForm, { LeadFormProps } from '@/components/LeadForm';

const LeadFormWrapper: React.FC = () => {
  const handleLeadSubmit = (data: { name: string; email: string; phone?: string }) => {
    console.log('Lead submitted:', data);
  };

  return <LeadForm onSubmit={handleLeadSubmit} />;
};

export default LeadFormWrapper;