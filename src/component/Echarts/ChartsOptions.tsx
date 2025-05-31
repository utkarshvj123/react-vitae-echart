import type { Dataset } from "../../interfaces/cropInterfaces";

export function getBarOptions(
  data: Dataset[],
  labels: string[],
  theme: string
) {
  return {
    title: {
      text: "Crops",
      subtext: "Average number of crops",
    },
    darkMode: "auto",
    tooltip: {
      show: true,
    },
    backgroundColor: theme !== "light" ? "#1A1B1E" : "white",
    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
    },
    series: data,
  };
}
