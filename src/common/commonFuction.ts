import type {
  AverageProduction,
  CropDataEntry,
  CropsAndAverages,
  YearlyCropProductionExtreme,
} from "../interfaces/cropInterfaces";
import data from "../localJson/dataCrop.json";

export function getCropsAndAverages(
  data: AverageProduction[]
): CropsAndAverages {
  const crops: string[] = [];
  const averages: number[] = [];

  data.forEach((entry) => {
    crops.push(entry.crop);
    averages.push(entry["average production"]);
  });

  return { crops, averages };
}

export function calculateAverageProductionPerCrop(
  data: CropDataEntry[]
): CropsAndAverages {
  const cropStats: Record<string, { total: number; count: number }> = {};

  data.forEach((entry) => {
    const cropName = entry["Crop Name"];
    const production = entry["Crop Production (UOM:t(Tonnes))"];
    const productionValue =
      typeof production === "number" ? production : parseFloat(production) || 0;

    if (!cropStats[cropName]) {
      cropStats[cropName] = { total: 0, count: 0 };
    }

    cropStats[cropName].total += productionValue;
    cropStats[cropName].count += 1;
  });

  const result: AverageProduction[] = [];

  for (const crop in cropStats) {
    const { total, count } = cropStats[crop];
    const average = total / count;
    const roundedAverage = parseFloat(average.toFixed(2));
    result.push({
      crop,
      "average production": roundedAverage,
    });
  }

  return getCropsAndAverages(result);
}

export function getYearlyCropProductionExtremes(
  data: CropDataEntry[]
): YearlyCropProductionExtreme[] {
  function extractYear(yearStr: string): string | null {
    const match = yearStr.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : null;
  }
  const groupedByYear: Record<string, CropDataEntry[]> = data.reduce(
    (acc, curr) => {
      const year = extractYear(curr.Year);
      if (!year) return acc;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(curr);
      return acc;
    },
    {} as Record<string, CropDataEntry[]>
  );

  const result: YearlyCropProductionExtreme[] = [];

  for (const year in groupedByYear) {
    const crops = groupedByYear[year];
    const validCrops = crops.filter((crop) => {
      const production = crop["Crop Production (UOM:t(Tonnes))"];
      return (
        production !== "" &&
        production !== null &&
        production !== undefined &&
        !isNaN(Number(production))
      );
    });

    if (validCrops.length === 0) {
      continue;
    }

    const maxCrop = validCrops.reduce((prev, current) =>
      Number(current["Crop Production (UOM:t(Tonnes))"]) >
      Number(prev["Crop Production (UOM:t(Tonnes))"])
        ? current
        : prev
    );

    const minCrop = validCrops.reduce((prev, current) =>
      Number(current["Crop Production (UOM:t(Tonnes))"]) <
      Number(prev["Crop Production (UOM:t(Tonnes))"])
        ? current
        : prev
    );

    result.push({
      year,
      maximumProduction: maxCrop["Crop Name"],
      minimumProduction: minCrop["Crop Name"],
    });
  }

  return result;
}
export const agricultureData: CropDataEntry[] = data;
