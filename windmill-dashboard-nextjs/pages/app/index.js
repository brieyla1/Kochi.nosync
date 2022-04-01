import React, { useState, useEffect } from 'react';

import Warning from 'components/Warning';
import InfoBlock from '/components/Blocks/InfoBlock';
import response from 'utils/demo/tableData';
import KochiNav from '/components/Kochi/KochiNav';

import { doughnutOptions, lineOptions, doughnutLegends, lineLegends } from 'utils/demo/chartsData';

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <div className="md:px-8 sm:px-20">
      <Warning />

      <KochiNav />

      <div className="grid gap-8 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoBlock
          title="Reliability"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e"
        />
        <InfoBlock
          title="24/7 Support"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e"
        />
        <InfoBlock
          title="Title here"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e"
        />
        <InfoBlock
          title="Title here"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e"
        />
      </div>
    </div>
  );
}

export default Dashboard;
