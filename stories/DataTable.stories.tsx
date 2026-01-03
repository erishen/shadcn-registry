import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from '../components/DataTable';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleData: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'inactive' },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'User', status: 'active' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active' },
  { id: '6', name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'inactive' },
  { id: '7', name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'active' },
  { id: '8', name: 'Henry Wilson', email: 'henry@example.com', role: 'User', status: 'active' },
];

const columns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true, filterable: true },
  { key: 'email', label: 'Email', sortable: true, filterable: true },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => (
      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
        value === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-slate-100 text-slate-800'
      }`}>
        {value === 'active' ? '✓ Active' : 'Inactive'}
      </span>
    ),
  },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    pageSize: 5,
  },
};

export const WithRowClick: Story = {
  args: {
    data: sampleData,
    columns,
    pageSize: 5,
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
};

export const SmallDataset: Story = {
  args: {
    data: sampleData.slice(0, 3),
    columns,
    pageSize: 10,
  },
};
