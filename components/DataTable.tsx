'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/registry/new-york/ui/button';
import { Input } from '@/registry/new-york/ui/input';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

type SortDirection = 'asc' | 'desc' | null;

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cellValue = String(row[key as keyof T]).toLowerCase();
        return cellValue.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const getSortIndicator = (key: keyof T) => {
    if (sortKey !== key) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="w-full space-y-6">
      {/* 搜索框 */}
      <div className="flex gap-4 flex-wrap p-6 bg-white rounded-xl border border-slate-200 shadow-sm mx-6">
        {columns
          .filter((col) => col.filterable)
          .map((col) => (
            <Input
              key={String(col.key)}
              placeholder={`搜索 ${col.label}...`}
              value={filters[String(col.key)] || ''}
              onChange={(e) => handleFilter(String(col.key), e.target.value)}
              className="w-48 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
          ))}
      </div>

      {/* 表格容器 */}
      <div className="w-full border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white mx-6">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="border-b border-slate-200 px-6 py-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{col.label}</span>
                      <span className={`text-slate-400 group-hover:text-blue-500 transition-colors ${sortKey === col.key ? 'text-blue-600 font-bold' : ''}`}>
                        {getSortIndicator(col.key)}
                      </span>
                    </button>
                  ) : (
                    <span className="group-hover:translate-x-0.5 transition-transform">{col.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-8 py-32 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">📊</span>
                    <span className="text-sm font-medium">暂无数据</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200 cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-6 py-6 text-sm text-slate-700 font-medium"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between gap-6 px-8 py-6 bg-white rounded-xl border border-slate-200 shadow-sm flex-wrap lg:flex-nowrap mx-6">
        <div className="text-sm text-slate-600 whitespace-nowrap">
          显示 <span className="font-semibold text-slate-900">{paginatedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> 到{' '}
          <span className="font-semibold text-slate-900">{Math.min(currentPage * pageSize, sortedData.length)}</span> 条，共{' '}
          <span className="font-semibold text-slate-900">{sortedData.length}</span> 条
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
          >
            上一页
          </Button>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 p-0 ${currentPage === page ? 'shadow-md hover:shadow-lg transition-shadow duration-200' : 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200'}`}
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && <span className="text-slate-400 text-xs px-1">...</span>}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
