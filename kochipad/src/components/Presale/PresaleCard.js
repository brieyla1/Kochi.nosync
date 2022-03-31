import React from 'react'
import { Button } from '@windmill/react-ui'

function PresaleCard({ image, status, projectID, title, ethValue, value, softHard, cap, progress, liquidity, lockupTime, url }) {
  return (
    <div className="presale-card min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-600 p-5">
      <div className="">
        <div>
          <div className="grid gap-6 mb-5 grid-cols-2">
            <img src={image} alt={title} className="rounded-full border-2 border-white" width="75" />
            <div className="text-right">
              <div className="text-gray-500 dark:text-gray-400 mb-2">{projectID}</div>
              <div className="text-white rounded-sm bg-green-500 text-center inline-block px-5 py-1">{status}</div>
            </div>
          </div>
          <div>
            <div className="mb-5">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h3>
              <span className="text-l font-medium text-gray-700 dark:text-gray-200">{ethValue}</span>
            </div>
            <div className="grid gap-6 mb-5 grid-cols-2">
              <div>
                <span className="text-gray-500 block dark:text-gray-200">Soft/Hard</span>
                <span className="text-k-orange mb-2 text-2xl">{softHard}</span>
              </div>
              <div>
                <span className="text-gray-500 block dark:text-gray-200">Cap</span>
                <span className="text-k-orange mb-2 text-2xl">{cap}</span>
              </div>
            </div>
            <div className="bg-gray-700 border-1 p-4 my-10 rounded-lg">
              <span className="text-white">Progress ({progress}%)</span>
              <div className="w-full bg-gray-600 rounded-full my-4">
                <div className="bg-k-orange text-xs text-blue-100 text-center p-1 font-bold leading-none rounded-l-full" style={{ width: `${progress}%` }}> {progress}%</div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <span className="text-gray-500 block dark:text-gray-200">0 ETH</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block dark:text-gray-200">{cap}</span>
                </div>
              </div>
            </div>
            <div className="grid gap-6 mb-5 grid-cols-2">
              <div>
                <span className="text-gray-500 block dark:text-gray-200">Liquidity %:</span>
                <span className="text-gray-500 block dark:text-gray-200">Lockup Time:</span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block dark:text-gray-200">{liquidity}</span>
                <span className="text-gray-500 block dark:text-gray-200">{lockupTime}</span>
              </div>
            </div>
            <div className="mt-4 mb-2 text-right">
              <a href={url}>
                <Button className="font-bold mt-4 text-lg">View pool</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresaleCard
