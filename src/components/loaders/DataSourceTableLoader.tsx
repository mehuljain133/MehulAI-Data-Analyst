import React from 'react';

interface TableLoaderProps {
  rows: number;
}

export const DataSourceTableLoader: React.FC<TableLoaderProps> = ({ rows = 5 }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <th className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </th>
          <th className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </th>
          <th className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(rows)].map((_, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="ml-4">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const DataSourceCardLoader: React.FC<TableLoaderProps> = ({ rows = 5 }) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg p-3 mb-2 flex items-center cursor-pointer animate-pulse"
        >
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
              <div className="ml-4 flex-grow">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const SelectModelSkeleton: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      {/* First Select Skeleton */}
      <div className="relative">
        <div className="h-10 w-44 bg-gray-200 rounded-[12px] animate-pulse flex items-center">
          <div className="h-4 w-24 bg-gray-300 rounded ml-4" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-6 w-px bg-gray-200" />

      {/* Second Select Skeleton */}
      <div className="relative">
        <div className="h-10 w-44 bg-gray-200 rounded-[12px] animate-pulse flex items-center">
          <div className="h-4 w-24 bg-gray-300 rounded ml-4" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};
