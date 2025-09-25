"use client";

import React from 'react';

export default function NotFound() {
  return React.createElement('div', { 
    className: 'min-h-screen flex items-center justify-center bg-gray-50' 
  },
    React.createElement('div', { 
      className: 'text-center' 
    },
      React.createElement('h1', { 
        className: 'text-4xl font-bold text-gray-900 mb-4' 
      }, '404'),
      React.createElement('p', { 
        className: 'text-gray-600 mb-8' 
      }, 'Страница не найдена'),
      React.createElement('a', {
        href: './',
        className: 'inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700'
      }, 'На главную')
    )
  );
}
