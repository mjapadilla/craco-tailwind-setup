import React from 'react';

export const renderIconType = {
  success: (
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  ),
  error: (
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  ),
  info: (
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  ),
  warning: (
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  ),
};

export const renderColor = {
  // background-color
  'bg-success': 'bg-green-200',
  'bg-error': 'bg-red-200',
  'bg-warning': 'bg-yellow-300',
  'bg-info': 'bg-blue-200',
  // text
  'text-success': 'text-green-700',
  'text-error': 'text-red-700',
  'text-warning': 'text-yellow-700',
  'text-info': 'text-blue-700',
  // icon
  'icon-success': 'text-green-600',
  'icon-error': 'text-red-500',
  'icon-warning': 'text-yellow-700',
  'icon-info': 'text-blue-500',
  // title
  'title-success': 'text-green-800',
  'title-error': 'text-red-800',
  'title-warning': 'text-yellow-800',
  'title-info': 'text-blue-800',
  // loader
  'loader-success': 'bg-green-600',
  'loader-error': 'bg-red-500',
  'loader-warning': 'bg-yellow-700',
  'loader-info': 'bg-blue-500',
};

export const renderTitle = {
  success: 'Succcess!',
  error: 'Error!',
  warning: 'Warning!',
  info: 'Reminder!',
};
