import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import { Card, CardBody, Label, Textarea, Input, Button } from '@windmill/react-ui'

function LaunchPresale() {
  
  function launchNewPresale() {
    // New presale logic here...
    console.log('---- Launch new presale ----');
  }

  return (
    <>
      <div className="mt-8">
        <PageTitle>Presale Launcher</PageTitle>
      </div>

      <div className="grid gap-6 mt-8 mb-8 md:grid-cols-3">
        <Card className="col-span-2">
          <CardBody className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
            <div className="mb-3 text-black dark:text-gray-300">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <Label className="mt-6">
              <span>Token Description (200 words)</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Textarea
                  placeholder="Token Description"
                  className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  maxLength="200"
                />
              </div>
            </Label>
            <Label className="mt-6">
              <span>Token Address</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input
                  className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Token Address"
                />
              </div>
            </Label>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Label className="mt-6">
                  <span>Token Name</span>
                  <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                    <Input
                      className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                      placeholder="Token Name"
                    />
                  </div>
                </Label>
              </div>
              <Label className="mt-6">
                <span>Token Symbol</span>
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <Input
                    className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Token Symbol"
                  />
                </div>
              </Label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label className="mt-6">
                    <span>Token Decimals</span>
                  <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                    <Input
                      className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                        placeholder="Token Decimals"
                    />
                  </div>
                </Label>
              </div>
              <Label className="mt-6">
                <span>Token Supply</span>
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <Input
                    className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Token Supply"
                  />
                </div>
              </Label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label className="mt-6">
                    <span>Presale Tokens</span>
                  <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                    <Input
                      className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                        placeholder="Presale Tokens"
                    />
                  </div>
                </Label>
              </div>
              <Label className="mt-6">
                <span>Liquidity Tokens</span>
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <Input
                    className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Liquidity Tokens"
                  />
                </div>
              </Label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <Label className="mt-6">
                    <span>Presale Rate</span>
                  <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                    <Input
                      className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                        placeholder="Presale Rate"
                    />
                  </div>
                </Label>
              </div>
              <Label className="mt-6">
                <span>Listing Rate</span>
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <Input
                    className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Listing Rate"
                  />
                </div>
              </Label>
            </div>

            <Label className="mt-6">
              <span>Listing On</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input
                  className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Listing On"
                />
              </div>
            </Label>

            <Label className="mt-6">
              <span>Initial Marketcap</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input
                  className="block w-full mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Initial Marketcap"
                />
              </div>
            </Label>

            <div className="mt-6 mb-2">
              <Button
                className="font-bold mt-4 text-lg"
                onClick={launchNewPresale}
              >
                Submit
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default LaunchPresale
