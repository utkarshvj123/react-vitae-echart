export interface CropDataEntry {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

export interface AverageProduction {
  crop: string;
  "average production": number;
}
export interface CropsAndAverages {
  crops: string[];
  averages: number[];
}
export interface YearlyCropProductionExtreme {
  year: string;
  maximumProduction: string;
  minimumProduction: string;
}

export interface BarData {
  data: { yAxis: { type: string }; xAxis: { type: string } };
  error?: boolean;
  loading: boolean;
  vertical: boolean;
}

export interface Dataset {
  name: string;
  type: "bar";
  smooth: boolean;
  data: number[];
}

export interface EChartsProps {
  options: {
    yAxis: {
      type: string;
    };
    xAxis: {
      type: string;
    };
  };
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  message?: string;
  theme?: string;
}
