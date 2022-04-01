import React from 'react';

import ChartCard from '/src/components/Chart/ChartCard';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import ChartLegend from '/src/components/Chart/ChartLegend';
import PageTitle from '/src/components/Typography/PageTitle';
import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from 'src/utils/demo/chartsData';

function Charts() {
  return (
    <>
      <PageTitle>Charts</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Doughnut">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Charts;
