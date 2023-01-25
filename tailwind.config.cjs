const UNIT = 'rem';
const unit0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}` + `${UNIT}`) };
const unit0_100 = {
  ...Array.from(Array(101)).map((_, i) => `${i}` + `${UNIT}`),
};
const unit0_200 = {
  ...Array.from(Array(201)).map((_, i) => `${i}` + `${UNIT}`),
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: unit0_200,
      minHeight: unit0_200,
      spacing: unit0_200, // padding, margin, width, height, maxHeight, top, gap ...
      borderWidth: unit0_10,
      // 컬러 추가
      colors: {
        blue: '#1fb6ff',
      },
    },
  },
  plugins: [],
  // corePlugins : {
  //   preflight : false  // 브라우저 기본 스타일 무효화 해제
  // }
};
