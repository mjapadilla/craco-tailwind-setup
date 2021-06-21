/* eslint-disable */
import React from 'react';
import cn from 'classnames';

export const IconUser = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
      clipRule="evenodd"
    />
  </svg>
);

export const IconAddUser = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
  </svg>
);

export const IconDownFill = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 bg-gray-500': !props?.className,
    })}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 16l-6-6h12z" />
  </svg>
);

export const IconMail = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export const IconEye = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

export const IconEyeHide = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

export const IconMobile = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

export const IconPencil = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

export const IconPencilAlt = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

export const IconNavigator = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const IconDownload = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 20 20"
    stroke="currentColor"
  >
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 9v4m0 0l-2-2m2 2l2-2"
    />
  </svg>
);

export const IconRefresh = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

export const IconTrash = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export const IconChevronLeft = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export const IconCamera = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export const IconRegister = () => (
  <svg width="80px" height="80px" viewBox="0 0 100 100">
    <defs>
      <linearGradient
        id="prefix__a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#fff" />
        <stop offset={1} stopColor="#fff3d9" />
      </linearGradient>
    </defs>
    <g transform="translate(407.075 745.082)">
      <circle
        cx={35.355}
        cy={35.355}
        r={35.355}
        transform="rotate(-45 -1042.576 143.842)"
        fill="#2da700"
      />
      <path
        d="M1812.834 1591.016l-16.038-13.326a3.04 3.04 0 013.885-4.677l11.834 9.832 21.2-20.609a3.041 3.041 0 114.24 4.361z"
        transform="translate(-2173.477 -2271.278)"
        fill="url(#prefix__a)"
      />
    </g>
  </svg>
);

export const IconLogOut = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export const IconClose = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const IconBriefCase = (props) => (
  <svg
    className={cn({
      [`${props?.className}`]: props?.className,
      'w-6 h-6 text-gray-500': !props?.className,
    })}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
