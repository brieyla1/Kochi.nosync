import React from 'react'
import { connectWallet } from '../WebThree/WebThree'

import PageTitle from '../components/Typography/PageTitle'
import { Card, CardBody, Button, Label } from '@windmill/react-ui'
import TokenImage from '../assets/img/catoshi.svg';

function ExamplePresale() {

  function exampleFunction() {
    connectWallet();
  }

  return (
    <>
      <div className="mt-8">
        <PageTitle>Browse Presales</PageTitle>
      </div>

      <div className="grid gap-6 mt-8 mb-8 md:grid-cols-3">
        <Card className="col-span-2">
          <CardBody className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
            <div className="grid gap-6 mt-4 mb-5 grid-cols-3">
              <div className="col-span-2 flex">
                <img src={TokenImage} alt="" className="mr-6 inline-block rounded-full border-2 border-white" width="75" />
                <div className="inline-block">
                  <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Catoshi</h1>
                  <span className="text-l font-medium text-gray-700 dark:text-gray-200">1 ETH = 1,000,000,000,000</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-500 dark:text-white mb-2">KOCHI9713</div>
                <div className="text-white rounded-sm bg-green-500 text-center inline-block px-5 py-1">In progress</div>
              </div>
            </div>

            <div className="mt-6 mb-8 text-lg text-black dark:text-white">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            {/* <!-- Presale Address --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-k-orange dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="0xB4c08d26FF8B1eD4f51511C12863331A9A9De880"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Presale Address	
                </div>
              </div>
            </Label>
            {/* <!-- Presale Address --> */}

            {/* <!-- Token Name --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="SaitaMax"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Token Name	
                </div>
              </div>
            </Label>
            {/* <!-- Token Name --> */}

            {/* <!-- Token Symbol	 --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="STMAX"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Token Symbol		
                </div>
              </div>
            </Label>
            {/* <!-- Token Symbol	 --> */}

            {/* <!-- Token Decimals	 --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="18"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Token Decimals		
                </div>
              </div>
            </Label>
            {/* <!-- Token Decimals	 --> */}

            {/* <!-- Token Supply --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="100,000,000,000"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Token Supply			
                </div>
              </div>
            </Label>
            {/* <!-- Token Supply --> */}

            {/* <!-- Presale Tokens --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="50,000,000,000"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Presale Tokens			
                </div>
              </div>
            </Label>
            {/* <!-- Presale Tokens --> */}

            {/* <!-- Liquidity Tokens --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="25,000,000,000"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Liquidity Tokens			
                </div>
              </div>
            </Label>
            {/* <!-- Liquidity Tokens --> */}

            {/* <!-- Presale Rate --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="2,000,000,000 per ETH"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Presale Rate			
                </div>
              </div>
            </Label>
            {/* <!-- Presale Rate --> */}

            {/* <!-- Listing Rate --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="1,800,000,000 per ETH"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Listing Rate			
                </div>
              </div>
            </Label>
            {/* <!-- Listing Rate --> */}

            {/* <!-- Listing On --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="Uniswap"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Listing On			
                </div>
              </div>
            </Label>
            {/* <!-- Listing On --> */}

            {/* <!-- Initial Marketcap --> */}
            <Label className="mt-3">
              <div className="relative">
                <input
                  disabled
                  className="text-right block w-full pl-20 mt-1 text-md dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value="$200,000"
                />
                <div className="presale__value-label absolute inset-y-0 px-4 pt-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-l-md">
                  Initial Marketcap
                </div>
              </div>
            </Label>
            {/* <!-- Initial Marketcap --> */}

          </CardBody>
        </Card>
        <div>
          <div className="text-center">
            <Button
              className="cursor-not-allowed hover:text-white font-bold text-md mb-6 bg-white text-gray-900"
              onClick={exampleFunction}
            >
                Enter the whitelist raffle
            </Button>
          </div>
          <Card className="col-span-1">
            <CardBody className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
              <div className="border-1 rounded-lg">
                <span className="text-white">Progress (20%)</span>
                <div className="w-full bg-gray-600 rounded-full my-4">
                  <div className="bg-k-orange text-xs text-blue-100 text-center p-1 font-bold leading-none rounded-l-full" style={{ width: `${20}%` }}> 20%</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <span className="text-gray-500 block dark:text-gray-200">0 ETH</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 block dark:text-gray-200">6 ETH</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="col-span-1 mt-6">
            <CardBody className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
              <h3 className="text-gray-600 dark:text-white">You are whitelisted!</h3>
              <div className="border-1 rounded-lg">
                <Label className="mt-4">
                  <div className="text-gray-600 dark:text-white pb-2">Amount</div>
                  <div className="relative text-gray-500 focus-within:text-purple-600">
                    <input
                      className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                      placeholder="0.00"
                    />
                    <button className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-k-orange border border-transparent rounded-r-md active:bg-white active:text-gray-800 hover:bg-white hover:text-gray-800 focus:outline-none focus:shadow-outline-purple">
                      MAX
                    </button>
                  </div>
                  <div className="grid grid-cols-2 mt-4">
                    <Button className="font-bold text-md">Buy</Button>
                    <div className="text-k-orange flex items-center flex-row-reverse">Antibot enabled</div>
                  </div>
                </Label>
              </div>
            </CardBody>
          </Card>

          <Card className="col-span-1 mt-6">
            <CardBody className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 border border-gray-600 p-5">
              <div className="grid gap-6 grid-cols-2">
                <div>
                  <span className="text-gray-500 block dark:text-gray-200">Soft/Hard</span>
                  <span className="text-k-orange mb-2 text-2xl">3 ETH</span>
                </div>
                <div>
                  <span className="text-gray-500 block dark:text-gray-200">Cap</span>
                  <span className="text-k-orange mb-2 text-2xl">6 ETH</span>
                </div>
                <div>
                  <span className="text-gray-500 block dark:text-gray-200">Minimum Buy</span>
                  <span className="text-k-orange mb-2 text-2xl">0.1 ETH</span>
                </div>
                <div>
                  <span className="text-gray-500 block dark:text-gray-200">Maximum Buy</span>
                  <span className="text-k-orange mb-2 text-2xl">0.5 ETH</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ExamplePresale
