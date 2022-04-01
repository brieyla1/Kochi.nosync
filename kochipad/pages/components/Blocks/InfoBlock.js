import React from 'react'

function InfoBlock({ title, value, children: icon }) {
  return (
    <div>
      <div>
        <div className="p-4 shadow-sm bg-k-orange w-16 h-16 rounded-full mx-auto mb-5"></div>
      </div>
      <div className="text-center">
        <h4 className="mb-2 text-xl font-jura text-gray-800 dark:text-white font-semibold">{title}</h4>
        <p className="text-md font-semibold text-gray-700 dark:text-gray-200">{value}</p>
      </div>
    </div>
  )
}

export default InfoBlock
