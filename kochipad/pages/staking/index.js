import React from 'react';

import PageTitle from '/components/Typography/PageTitle';
import { Label, Input, Card, CardBody, Button } from '@windmill/react-ui';

function BrowsePresale() {
  return (
    <div className="px-6 m-auto">
      <div className="mt-8">
        <PageTitle>Staking</PageTitle>
      </div>

      <div className="mb-8 text-black dark:text-gray-300 max-w-screen-md">
        <p>
          Stake your Kochi tokens to earn your share of 25% of all revenue generated by Kochi Pad plus a share of 1% of
          the KOCHI token tax.
        </p>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <Card>
          <div className="p-5 text-center bg-k-orange  border-gray-600 rounded-t-lg border">
            <h3 className="text-gray-700 dark:text-white">Your Current Balance</h3>
          </div>
          <CardBody className="text-center min-w-0 rounded-b-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
            <Label className="mt-4">
              <div className="text-lg text-gray-600 dark:text-white pb-2">Total Balance</div>
              <div className="relative text-gray-500 focus-within:text-purple-600">
                <Input
                  className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="0.00"
                />
                <button className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-k-orange border border-transparent rounded-r-md active:bg-white active:text-gray-800 hover:bg-white hover:text-gray-800 focus:outline-none focus:shadow-outline-purple">
                  MAX
                </button>
              </div>
            </Label>

            <Label className="mt-3">
              <div className="relative">
                <Input
                  className="block w-full mt-1 text-md dark:text-k-orange dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="0.00"
                />
              </div>
            </Label>

            <div className="text-center mt-4">
              <Button className="font-bold text-md">Stake</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <div className="p-5 text-center bg-k-orange  border-gray-600 rounded-t-lg border">
            <h3 className="text-gray-700 dark:text-white">Your Staked Balance</h3>
          </div>
          <CardBody className="text-center min-w-0 rounded-b-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
            <Label className="mt-4">
              <div className="text-lg text-gray-600 dark:text-white pb-2">Total Staked Balance</div>
              <div className="relative text-gray-500 focus-within:text-purple-600">
                <Input
                  className="block w-full mt-1 text-md dark:text-k-orange dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="0.00"
                />
              </div>
            </Label>

            <Label className="mt-3">
              <div className="relative">
                <Input
                  className="block w-full mt-1 text-md dark:text-k-orange dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="0.00% - Pool Percentage"
                />
              </div>
            </Label>

            <div className="text-center mt-4">
              <Button className="font-bold text-md">Unstake</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <div className="p-5 text-center bg-k-orange  border-gray-600 rounded-t-lg border">
            <h3 className="text-gray-700 dark:text-white">Your Daily Rewards</h3>
          </div>
          <CardBody className="text-center min-w-0 rounded-b-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
            <Label className="mt-4">
              <div className="text-lg text-gray-600 dark:text-white pb-2">Daily Rewards</div>
              <div className="relative text-gray-500 focus-within:text-purple-600">
                <Input
                  className="block w-full mt-1 text-md dark:text-k-orange dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="0.00"
                />
              </div>
            </Label>

            <Label className="mt-3">
              <div className="relative">
                <Input
                  className="block w-full mt-1 text-md dark:text-k-orange dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="0.00"
                />
              </div>
            </Label>

            <div className="text-center mt-4">
              <Button className="font-bold text-md">Claim</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default BrowsePresale;
