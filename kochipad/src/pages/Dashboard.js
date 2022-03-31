import React, { useState, useEffect } from 'react'

import InfoBlock from '../components/Blocks/InfoBlock'
import KochiNav from '../components/Kochi/KochiNav'
import response from '../utils/demo/tableData'


function Dashboard() {
  const [page] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  // const totalResults = response.length

  // pagination change control
  // function onPageChange(p) {
  //   setPage(p)
  // }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <KochiNav />
      {/* <!-- InfBlocks --> */}
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
    </>
  )
}

export default Dashboard
