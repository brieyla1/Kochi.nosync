import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import PresaleCard from '../components/Presale/PresaleCard'
import { Label, Select, Input } from '@windmill/react-ui'

import Wolf from '../assets/img/wolf.jpg';
import Catoshi from '../assets/img/catoshi.svg';
import Kochi from '../assets/img/kochi/kochi-1.svg';

import { SearchIcon } from '../icons'

function BrowsePresale() {
  return (
    <>
      <div className="mt-8">
        <PageTitle>Browse Presales</PageTitle>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-5">
        <div className="col-span-3">
          <Label className="mt-4">
            <span>Search presales</span>
            <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
              <Input
                className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                placeholder="Enter name of presale"
              />
              <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                <SearchIcon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
          </Label>
        </div>
        <div>
          <Label className="mt-4">
            <span>Filter by</span>
            <Select className="mt-1">
              <option>All presales</option>
              <option>KYC</option>
              <option>Chain</option>
              <option>Upcoming</option>
              <option>In progress</option>
              <option>Filled</option>
              <option>Ended</option>
              <option>Canceled</option>
            </Select>
          </Label>
        </div>
        <div>
          <Label className="mt-4">
            <span>Sort by</span>
            <Select className="mt-1">
              <option>No Filter</option>
              <option>Hard Cap</option>
              <option>Soft Cap</option>
              <option>LP percent</option>
              <option>End time</option>
            </Select>
          </Label>
        </div>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <PresaleCard
          image={Catoshi}
          status="In progress"
          projectID="KOCH43218"
          title="Catoshi"
          ethValue="1 ETH = 6,000,000,000,000"
          softHard="3 ETH"
          cap="6 ETH"
          progress="75"
          liquidity="100"
          lockupTime="365"
          url="/presale/catoshi"
        />
        <PresaleCard
          image={Wolf}
          status="In progress"
          projectID="KOCH2118"
          title="SaitaMAX"
          ethValue="1 ETH = 1,000,000,000,000"
          softHard="3 ETH"
          cap="6 ETH"
          progress="20"
          liquidity="100"
          lockupTime="365"
          url="/presale/catoshi"
        />
        <PresaleCard
          image={Kochi}
          status="In progress"
          projectID="KOCH35715"
          title="KochiKen"
          ethValue="1 ETH = 14,000,000,000,000"
          softHard="3 ETH"
          cap="6 ETH"
          progress="97"
          liquidity="100"
          lockupTime="365"
          url="/presale/catoshi"
        />
      </div>
    </>
  )
}

export default BrowsePresale
