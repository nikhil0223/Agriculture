// src/components/YearlyDataTable.tsx
import React from "react";
import { Table } from "@mantine/core";
import { YearlyData } from "../types/data";

interface YearlyDataTableProps {
  data: YearlyData[];
}

const YearlyDataTable: React.FC<YearlyDataTableProps> = ({ data }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="relative">
        <Table className="w-full max-w-4xl bg-white border border-gray-300 border-x-2 border-y-2">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th className="p-2 border-b">Year</th>
              <th className="p-2 border-b">Crop with Maximum Production</th>
              <th className="p-2 border-b">Crop with Minimum Production</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 text-center">
                <td className="p-2 border-b">{row.year}</td>
                <td className="p-2 border-b">{row.maxCrop}</td>
                <td className="p-2 border-b">{row.minCrop}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="absolute inset-y-0 left-0 w-2 border-l border-gray-300"></div>
        <div className="absolute inset-y-0 right-0 w-2 border-r border-gray-300"></div>
      </div>
    </div>
  );
};

export default YearlyDataTable;
