import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import type { ECharts as EChartsInstance } from "echarts";
import cx from "classnames";
import type { EChartsProps } from "../../interfaces/cropInterfaces";

const ECharts: React.FC<EChartsProps> = ({
  options,
  style,
  className,
  loading = false,
  message,
  theme = "dark",
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chart, setChart] = useState<EChartsInstance | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      echarts.dispose(chartRef.current);
    }
    if (!chartRef.current) return;
    const instance = echarts.init(chartRef.current, theme);
    instance.setOption(options, true);
    setChart(instance);
    resizeObserver.observe(chartRef.current);
  }, [options, theme]);

  useEffect(() => {
    if (!chart) return;

    if (loading) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }
  }, [chart, loading]);

  useEffect(() => {
    if (chart && options && message) {
      chart.clear();
    }
  }, [chart, options, message]);

  const newStyle: React.CSSProperties = {
    height: 350,
    ...style,
  };

  return (
    <div className="echarts-parent position-relative">
      <div
        ref={chartRef}
        style={newStyle}
        className={cx("echarts-react", className)}
      />
      {message ? <div className="no-data">{message}</div> : null}
    </div>
  );
};
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => {
    const instance = echarts.getInstanceByDom(target as HTMLDivElement);
    if (instance) {
      instance.resize();
    }
  });
});

export default React.memo(ECharts);
