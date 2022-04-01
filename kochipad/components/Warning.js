import React from 'react';

function Warning() {
  return (
    <div className="flex items-center justify-between p-4 my-8 text-sm font-semibold text-gray-600 dark:text-purple-100 bg-black-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-2" fill="orange" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          Make sure the URL is <span className="text-purple-300">https://</span>
          KochiKen
          <span className="text-purple-300">.com</span>.
        </span>
      </div>
      <span>
        We have an extension to help you navigate web3 safely{' '}
        <span dangerouslySetInnerHTML={{ __html: '&RightArrow;' }}></span>
      </span>
    </div>
  );
}

export default Warning;
