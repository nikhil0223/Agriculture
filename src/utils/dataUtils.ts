import { CropData, YearlyData, CropAggregation } from '../types/data';

interface AggregatedYearlyData {
  max: { crop: string, production: number };
  min: { crop: string, production: number };
}

const extractYear = (financialYear: string): string => {
  const match = financialYear.match(/(\d{4})$/);
  return match ? match[1] : '';
};

const preprocessData = (data: CropData[]): CropData[] => {
  return data.map((item) => ({
    ...item,
    'Crop Production (UOM:t(Tonnes))': item['Crop Production (UOM:t(Tonnes))'] || 0,
    'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0,
    'Area Under Cultivation (UOM:Ha(Hectares))': item['Area Under Cultivation (UOM:Ha(Hectares))'] || 0,
  }));
};

export const fetchData = async (): Promise<CropData[]> => {
  const response = await fetch('/data/data.json');
  const data: CropData[] = await response.json();
  return preprocessData(data);
};

export const aggregateYearlyData = (data: CropData[]): YearlyData[] => {
  const result = data.reduce((acc, curr) => {
    const year = extractYear(curr.Year);
    const production = curr['Crop Production (UOM:t(Tonnes))'];
    const cropName = curr['Crop Name'];
    
    if (!acc[year]) {
      acc[year] = { 
        max: { crop: cropName, production: production }, 
        min: { crop: cropName, production: production } 
      };
    }

    if (production > acc[year].max.production) {
      acc[year].max = { crop: cropName, production: production };
    }
    
    if (production < acc[year].min.production) {
      acc[year].min = { crop: cropName, production: production };
    }

    return acc;
  }, {} as Record<string, AggregatedYearlyData>);

  return Object.entries(result).map(([year, { max, min }]) => ({
    year,
    maxCrop: max.crop,
    minCrop: min.crop
  }));
};

export const aggregateCropData = (data: CropData[]): CropAggregation[] => {
  const crops = data.reduce((acc, curr) => {
    const cropName = curr['Crop Name'];
    
    if (!acc[cropName]) {
      acc[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
    }

    acc[cropName].totalYield += curr['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'];
    acc[cropName].totalArea += curr['Area Under Cultivation (UOM:Ha(Hectares))'];
    acc[cropName].count += 1;

    return acc;
  }, {} as Record<string, { totalYield: number, totalArea: number, count: number }>);

  return Object.entries(crops).map(([crop, { totalYield, totalArea, count }]) => ({
    crop,
    averageYield: totalYield / count,
    averageArea: totalArea / count
  }));
};
