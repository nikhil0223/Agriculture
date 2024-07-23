export interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
  "Area Under Cultivation (UOM:Ha(Hectares))": number;
}

export interface YearlyData {
  year: string;
  maxCrop: string;
  minCrop: string;
}

export interface CropAggregation {
  crop: string;
  averageYield: number;
  averageArea: number;
}
