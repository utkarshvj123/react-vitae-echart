import React, { useEffect, useState } from "react";
import ECharts from "../Echarts/ECharts";
import { getBarOptions } from "../Echarts/ChartsOptions";
import ChartWrapper from "../Echarts/ChartWrapper";
import {
  agricultureData,
  calculateAverageProductionPerCrop,
} from "../../common/commonFuction";
import type { BarData } from "../../interfaces/cropInterfaces";

const initialBar: BarData = {
  data: {
    yAxis: {
      type: "",
    },
    xAxis: {
      type: "",
    },
  },
  loading: true,
  vertical: false,
};
export interface CommanBarChartProps {
  currentMode: string;
}
const CommanBarChart: React.FC<CommanBarChartProps> = ({
  currentMode,
}: {
  currentMode: string;
}) => {
  const [barData, setBarData] = useState<BarData>(initialBar);
  const mappedData = calculateAverageProductionPerCrop(agricultureData);
  useEffect(() => {
    getBarChart();
  }, [currentMode]);

  useEffect(() => {
    if (barData.data && barData.vertical) {
      const newXAxis = {
        ...barData.data.yAxis,
        type: "category",
      };

      const newYAxis = {
        ...barData.data.xAxis,
        type: "value",
      };

      const newData = {
        ...barData.data,
        xAxis: newXAxis,
        yAxis: newYAxis,
      };
      setBarData((prev) => ({
        ...prev,
        data: newData,
      }));
    }
  }, [barData.vertical]);
  const getBarChart = () => {
    setBarData((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      const labels = mappedData?.crops;
      const datasets = [
        {
          name: "Chart 1",
          type: "bar" as const,
          smooth: true,
          data: mappedData?.averages,
        },
      ];
      const barOptions = getBarOptions(datasets, labels, currentMode);
      setBarData({
        data: barOptions,
        error: false,
        loading: false,
        vertical: false,
      });
    }, 2000);
  };

  return (
    <div className="chart-container">
      <ChartWrapper>
        {barData.data && (
          <ECharts
            loading={barData.loading}
            options={barData.data}
            theme={currentMode === "dark" ? "dark" : "westeros"}
          />
        )}
      </ChartWrapper>
    </div>
  );
};

export default CommanBarChart;
