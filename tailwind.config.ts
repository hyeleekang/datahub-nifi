/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * 매개변수로 전달 받은 end 값 만큼 px 값을 rem 단위로 매핑한 배열을 반환
 * @param end 범위에 포함할 최대 픽셀 값
 * @param baseFontSize 기본 폰트 사이즈, default 16
 * @returns {Record<number, string>}
 */
const pxToRem = (end: number, baseFontSize: number = 16): Record<number, string> => {
    return Object.fromEntries(
        Array.from({ length: end + 1 }).map((_, i) => {
            let remValue = (i / baseFontSize).toFixed(3);
            remValue = parseFloat(remValue).toString();
            return [Number(i), `${remValue}rem`];
        }),
    );
};

export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    safelist: [{ pattern: /bg-./ }],
    theme: {
        extend: {
            /** font family */
            fontFamily: {
                pretendard: ['Pretendard', 'ui-sans-serif', 'system-ui'],
                tech: ['Orbitron', ...defaultTheme.fontFamily.sans],
                mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
                space: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
            },
            /** font style */
            fontSize: {
                ...pxToRem(50),
                display01: ['3.75rem', { lineHeight: '5.625rem', fontWeight: '600' }],
                display02: ['2.5rem', { lineHeight: '3.75rem', fontWeight: '600' }],
                display03: ['2rem', { lineHeight: '3rem', fontWeight: '600' }],
                header01: ['1.75rem', { lineHeight: '2.625rem', fontWeight: '700' }],
                header02: ['1.75rem', { lineHeight: '2.625rem', fontWeight: '600' }],
                header03: ['1.5rem', { lineHeight: '2.25rem', fontWeight: '700' }],
                header04: ['1.5rem', { lineHeight: '2.25rem', fontWeight: '600' }],
                header05: ['1.5rem', { lineHeight: '2.25rem', fontWeight: '500' }],
                header06: ['1.25rem', { lineHeight: '1.875rem', fontWeight: '600' }],
                header07: ['1.25rem', { lineHeight: '1.875rem', fontWeight: '500' }],
                header08: ['1.25rem', { lineHeight: '1.875rem', fontWeight: '400' }],
                subheader01: ['1.125rem', { lineHeight: '1.688rem', fontWeight: '600' }],
                subheader02: ['1.125rem', { lineHeight: '1.688rem', fontWeight: '500' }],
                subheader03: ['1.125rem', { lineHeight: '1.688rem', fontWeight: '400' }],
                subheader04: ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
                subheader05: ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
                subheader06: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
                body01: ['0.875rem', { lineHeight: '1.313rem', fontWeight: '700' }],
                body02: ['0.875rem', { lineHeight: '1.313rem', fontWeight: '600' }],
                body03: ['0.875rem', { lineHeight: '1.313rem', fontWeight: '500' }],
                body04: ['0.875rem', { lineHeight: '1.313rem', fontWeight: '400' }],
                body05: ['0.75rem', { lineHeight: '1.125rem', fontWeight: '500' }],
                body06: ['0.75rem', { lineHeight: '1.125rem', fontWeight: '400' }],
                d2coding01: ['0.875rem', { lineHeight: '1.313rem', fontWeight: '400', letterSpacing: '-4%' }],
                d2coding02: ['0.75rem', { lineHeight: '1.125rem', fontWeight: '400', letterSpacing: '-4%' }],
            },
            lineHeight: {
                ...pxToRem(50),
            },
            /** colors */
            colors: {
                icon: '#505050',
                danger: '#E00000',
                container: '#F7F7F7',
                /** gray */
                gray: {
                    100: '#FCFCFC',
                    200: '#F5F5F5',
                    300: '#F0F0F0',
                    400: '#DCDCDC',
                    500: '#C8C8C8',
                    600: '#B4B4B4',
                    700: '#8C8C8C',
                    800: '#787878',
                    900: '#646464',
                    1000: '#505050',
                    1100: '#3C3C3C',
                    1200: '#282828',
                    1300: '#141414',
                },
                /** blue */
                blue: {
                    100: '#F5F7F9',
                    200: '#F5FAFF',
                    300: '#EBF4FF',
                    400: '#DBEDFF',
                    500: '#8FBFFF',
                    600: '#388EFF',
                    700: '#0A64FA',
                    800: '#0452CF',
                    900: '#0341A3',
                    1000: '#0341A3',
                },
                /** green */
                green: {
                    100: '#F5FFF8',
                    200: '#E3FFDE',
                    300: '#C5F9CA',
                    400: '#ACF4BA',
                    500: '#9DF1B0',
                    600: '#7AEA98',
                    700: '#5BE384',
                    800: '#31B95A',
                    900: '#006A20',
                },
                /** red */
                red: {
                    100: '#FFF5F5',
                    200: '#FFE5E5',
                    300: '#FFCCCC',
                    400: '#FFB2B2',
                    500: '#FF9999',
                    600: '#FF6B6B',
                    700: '#DD4040',
                    800: '#BF2B2B',
                    900: '#610000',
                },
                /** yellow */
                yellow: {
                    100: '#FFFBEB',
                    200: '#FFF6D1',
                    300: '#FFF1B8',
                    400: '#FFEC9E',
                    500: '#FFE88A',
                    600: '#F8D95D',
                    700: '#BA9608',
                    800: '#987B06',
                    900: '#987B06',
                },
            },
            /** bos shadow */
            boxShadow: {
                primary: '0px 0px 20px 0px rgba(51, 51, 51, 0.50)',
                secondary: '0px 0px 20px 0px rgba(51, 51, 51, 0.20)',
                tertiary: '5px 0px 20px 0px rgba(51, 51, 51, 0.05)',
                tooltip: '0px 0px 4px 0px rgba(0, 0, 0, 0.2)',
            },
            /** spacing */
            width: pxToRem(1920),
            minWidth: pxToRem(1920),
            maxWidth: pxToRem(1920),
            height: pxToRem(1080),
            minHeight: pxToRem(1080),
            maxHeight: pxToRem(1080),
            size: pxToRem(1920),
            padding: pxToRem(500),
            margin: pxToRem(500),
            borderWidth: pxToRem(30),
            borderRadius: pxToRem(30),
            gap: pxToRem(100),
            spacing: pxToRem(100),
            /** z-index */
            zIndex: {
                100: 100,
                200: 200,
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
