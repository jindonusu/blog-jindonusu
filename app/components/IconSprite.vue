<!-- SVG 로고 심볼 + 아이콘 라이브러리 (문서 전역에서 <use href="#..."> 로 참조) -->
<template>
  <svg width="0" height="0" style="position: absolute" aria-hidden="true">
    <defs>
      <symbol id="jindo-logo" viewBox="0 0 48 48">
        <linearGradient id="dropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3A5778" />
          <stop offset="100%" stop-color="#15293F" />
        </linearGradient>
        <path
          d="M24 3 C24 3, 8 21, 8 31 C8 40, 15 46, 24 46 C33 46, 40 40, 40 31 C40 21, 24 3, 24 3 Z"
          fill="url(#dropGrad)"
          stroke="#B8945F"
          stroke-width="0.8"
          opacity="0.98"
        />
        <path
          d="M14 35 Q19 31, 24 35 T34 35"
          stroke="#B8945F"
          stroke-width="1"
          fill="none"
          opacity="0.75"
          stroke-linecap="round"
        />
        <path
          d="M17 39 Q21 36.5, 24 39 T31 39"
          stroke="#B8945F"
          stroke-width="0.8"
          fill="none"
          opacity="0.5"
          stroke-linecap="round"
        />
        <text
          x="24"
          y="29"
          text-anchor="middle"
          font-family="'Pretendard Variable', Pretendard, sans-serif"
          font-weight="900"
          font-size="17"
          fill="#FAFAF7"
          letter-spacing="-0.5"
        >진</text>
        <circle cx="24" cy="8" r="1.2" fill="#B8945F" opacity="0.85" />
      </symbol>

      <symbol id="icon-phone" viewBox="0 0 24 24">
        <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.97z" />
      </symbol>
      <symbol id="icon-chat" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </symbol>
      <symbol id="icon-bolt" viewBox="0 0 24 24">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </symbol>
      <symbol id="icon-clock" viewBox="0 0 24 24">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
      </symbol>
      <symbol id="icon-search" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </symbol>
      <symbol id="icon-tool" viewBox="0 0 24 24">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </symbol>
      <symbol id="icon-check" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </symbol>
      <symbol id="icon-check-circle" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </symbol>
      <symbol id="icon-calendar" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      </symbol>
      <symbol id="icon-news" viewBox="0 0 24 24">
        <path d="M22 3l-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z" />
      </symbol>
      <symbol id="icon-pin" viewBox="0 0 24 24">
        <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
      </symbol>
      <symbol id="icon-arrow-up" viewBox="0 0 24 24">
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
      </symbol>
      <symbol id="icon-dot" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" />
      </symbol>
    </defs>
  </svg>
</template>
