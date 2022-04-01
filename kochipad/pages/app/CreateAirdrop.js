import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import { Card, CardBody, Label, Input, Button, Select } from '@windmill/react-ui'

function LaunchPresale() {
  return (
    <>
      <div className="mt-8">
        <PageTitle>Create Airdrop</PageTitle>
      </div>

      <div className="grid gap-6 mt-8 mb-8 md:grid-cols-3">
        <div className="col-span-2">
          <div className="mb-8 text-black dark:text-gray-300">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>

          <Card>
            <CardBody className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
              <Label className="mt-4 max-w-sm">
                  <span>Select Chain</span>
                  <Select className="mt-1">
                      <option>ETH</option>
                      <option>BSC</option>
                  </Select>
              </Label>

              <div className="grid gap-6 mb-8 md:grid-cols-3">
                <div className="md:col-span-2">
                <Label className="mt-6">
                  <span>Token Address</span>
                  <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                    <Input
                      className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                      placeholder="Token Address"
                    />
                  </div>
                </Label>
                </div>
                <Label className="mt-6">
                  <span>Deflationary</span>
                  <Select className="mt-1">
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                </Label>
              </div>

              <Label className="mt-6">
                <span>List of Addresses in CSV</span>
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <Input
                    className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Token Supply"
                    type="file"
                    accept=".csv"
                  />
                </div>
              </Label>

              <div className="mt-6 mb-2 text-right">
                  <Button className="font-bold mt-4 text-lg">Next</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default LaunchPresale
