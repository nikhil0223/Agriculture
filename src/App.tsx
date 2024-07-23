// src/App.tsx
import React, { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import YearlyDataTable from "./components/YearlyDataTable";
import CropDataTable from "./components/CropDataTable";
import {
  fetchData,
  aggregateYearlyData,
  aggregateCropData,
} from "./utils/dataUtils";
import { CropData, YearlyData, CropAggregation } from "./types/data";

const App: React.FC = () => {
  const [data, setData] = useState<CropData[]>([]);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [cropData, setCropData] = useState<CropAggregation[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setYearlyData(aggregateYearlyData(fetchedData));
      setCropData(aggregateCropData(fetchedData));
    };
    loadData();
  }, [data]);

  return (
    <MantineProvider>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Indian Agriculture Analytics
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Yearly Crop Data
          </h2>
          <YearlyDataTable data={yearlyData} />
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">
            Crop Data (1950-2020)
          </h2>
          <CropDataTable data={cropData} />
        </div>
      </div>
    </MantineProvider>
  );
};

export default App;
