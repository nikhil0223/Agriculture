import React from "react";
import { Table } from "@mantine/core";
import { CropAggregation } from "../types/data";

interface CropDataTableProps {
  data: CropAggregation[];
}

const CropDataTable: React.FC<CropDataTableProps> = ({ data }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="relative">
        <Table className="w-full max-w-4xl bg-white border border-gray-300 border-x-2 border-y-2">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th className="p-2 border-b">Crop</th>
              <th className="p-2 border-b">Average Yield (Kg/Ha)</th>
              <th className="p-2 border-b">Average Cultivation Area (Ha)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 text-center">
                <td className="p-2 border-b">{row.crop}</td>
                <td className="p-2 border-b">{row.averageYield.toFixed(2)}</td>
                <td className="p-2 border-b">{row.averageArea.toFixed(2)}</td>
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

export default CropDataTable;
