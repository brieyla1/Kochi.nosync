import React from 'react';
import { useRouter } from 'next/router';
import routes from '/src/routes/sidebar';
import SidebarSubmenu from './SidebarSubmenu';
import * as Icons from 'icons';

import Link from 'next/link';

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const { asPath } = useRouter();
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link href="/app">
        <a className="block text-center text-lg font-bold px-4">
          <svg
            className="fill-current fill-gray-800 dark:fill-white"
            width="155"
            height="23"
            viewBox="0 0 155 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.14048 22H0.740479V0.99995H6.14048V9.24995H8.84048L13.5205 0.99995H19.2205L13.3405 11.35L19.1905 22H13.4905L8.84048 13.45H6.14048V22Z" />
            <path d="M33.928 6.69995C33.928 5.49995 33.328 4.89995 32.128 4.89995H27.028C25.828 4.89995 25.228 5.49995 25.228 6.69995V16.3C25.228 17.5 25.828 18.1 27.028 18.1H32.128C33.328 18.1 33.928 17.5 33.928 16.3V6.69995ZM39.328 16.3C39.328 18.4 38.848 19.93 37.888 20.89C36.948 21.83 35.428 22.3 33.328 22.3H25.828C23.728 22.3 22.198 21.83 21.238 20.89C20.298 19.93 19.828 18.4 19.828 16.3V6.69995C19.828 4.59995 20.298 3.07995 21.238 2.13995C22.198 1.17995 23.728 0.699951 25.828 0.699951H33.328C35.428 0.699951 36.948 1.17995 37.888 2.13995C38.848 3.07995 39.328 4.59995 39.328 6.69995V16.3Z" />
            <path d="M58.542 21.7C54.082 22.1 50.382 22.3 47.442 22.3C45.482 22.3 44.042 21.84 43.122 20.92C42.202 20 41.742 18.56 41.742 16.6V6.99995C41.742 4.89995 42.212 3.37995 43.152 2.43995C44.112 1.47995 45.642 0.99995 47.742 0.99995H58.542V5.19995H48.942C47.742 5.19995 47.142 5.79995 47.142 6.99995V16.6C47.142 17.06 47.272 17.43 47.532 17.71C47.812 17.97 48.162 18.1 48.582 18.1C49.002 18.1 49.462 18.1 49.962 18.1C50.462 18.08 50.982 18.06 51.522 18.04C52.062 18.02 52.602 18 53.142 17.98C53.702 17.96 54.412 17.92 55.272 17.86C56.152 17.8 57.242 17.73 58.542 17.65V21.7Z" />
            <path d="M79.2456 22H73.8456V13.45H66.3456V22H60.9456V0.99995H66.3456V9.24995H73.8456V0.99995H79.2456V22Z" />
            <path d="M92.7596 22H81.9596V17.8H84.6596V5.19995H81.9596V0.99995H92.7596V5.19995H90.0596V17.8H92.7596V22Z" />
            <path
              d="M95.4573 0.99995H108.057C110.157 0.99995 111.677 1.47995 112.617 2.43995C113.577 3.37995 114.057 4.89995 114.057 6.99995V9.99995C114.057 12.1 113.577 13.63 112.617 14.59C111.677 15.53 110.157 16 108.057 16H100.857V22H95.4573V0.99995ZM108.657 6.99995C108.657 5.79995 108.057 5.19995 106.857 5.19995H100.857V11.8H106.857C108.057 11.8 108.657 11.2 108.657 9.99995V6.99995Z"
              fill="#FF6708"
            />
            <path
              d="M118.719 22H112.869L120.819 0.99995H126.819L134.769 22H128.919L127.569 18.25H120.069L118.719 22ZM121.419 14.35H126.219L123.819 7.29995L121.419 14.35Z"
              fill="#FF6708"
            />
            <path
              d="M147.968 0.99995C150.228 0.99995 151.938 1.58995 153.098 2.76995C154.278 3.92995 154.868 5.63995 154.868 7.89995V15.1C154.868 17.36 154.278 19.08 153.098 20.26C151.938 21.42 150.228 22 147.968 22H136.268V0.99995H147.968ZM149.468 7.89995C149.468 6.09995 148.568 5.19995 146.768 5.19995H141.668V17.8H146.768C148.568 17.8 149.468 16.9 149.468 15.1V7.89995Z"
              fill="#FF6708"
            />
          </svg>
        </a>
      </Link>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <Link href={route.path}>
                <a
                  className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    asPath == route.path ? 'dark:text-gray-100 text-gray-800' : ''
                  }`}
                >
                  {asPath == route.path && (
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  )}

                  <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                  <span className="ml-4">{route.name}</span>
                </a>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default SidebarContent;
