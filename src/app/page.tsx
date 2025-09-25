"use client";

import React from 'react';

export default function Home() {
  return React.createElement('div', { 
    className: 'min-h-screen flex items-center justify-center bg-gray-50' 
  },
    React.createElement('div', { 
      className: 'max-w-md w-full space-y-8 p-8' 
    },
      React.createElement('div', { 
        className: 'text-center' 
      },
        React.createElement('h1', { 
          className: 'text-3xl font-bold text-gray-900 mb-2' 
        }, 'GuestMe Promo'),
        React.createElement('p', { 
          className: 'text-gray-600 mb-8' 
        }, 'Выберите портал для входа в систему')
      ),
      React.createElement('div', { 
        className: 'space-y-4' 
      },
                    React.createElement('a', {
                      href: '/supplier',
                      className: 'w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
                    }, 'Портал поставщика'),
                    React.createElement('a', {
                      href: '/tips',
                      className: 'w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors'
                    }, 'GuestMe чаевые')
      )
    )
  );
}