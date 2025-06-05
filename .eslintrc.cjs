module.exports = {
    /** General Configuration */
    root: true, // 프로젝트의 최상위 설정 파일임을 명시합니다.
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tailwind.config.ts'], // 무시할 파일 및 폴더 목록을 지정합니다.

    /** Environment Settings */
    env: {
        browser: true, // 브라우저 전역 변수 활성화
        es2021: true, // 모든 ECMAScript 2021 전역 변수 추가 및 최신 ECMAScript 기능 사용 허용
        node: true, // Node.js 전역 변수 및 Node.js 스코핑 활성화
    },

    /** Parser Settings */
    parser: '@typescript-eslint/parser', // TypeScript 파일을 파싱하기 위한 파서 지정
    parserOptions: {
        ecmaVersion: 2022, // 최신 ECMAScript 기능 사용을 허용합니다.
        sourceType: 'module', // ECMAScript 모듈 사용을 허용합니다.
        ecmaFeatures: {
            jsx: true, // JSX 파싱을 허용합니다.
        },
        project: ['./tsconfig.json'], // TypeScript 설정 파일을 지정합니다.
    },

    /** Plugins */
    plugins: [
        'prettier', // Prettier 플러그인 사용
        '@typescript-eslint', // TypeScript 관련 규칙을 위한 플러그인 사용
        'import', // import 관련 규칙을 위한 플러그인 사용
        'react', // React 관련 규칙을 위한 플러그인 사용
        'react-hooks', // React Hooks 관련 규칙을 위한 플러그인 사용
        'react-refresh', // React Refresh 관련 규칙을 위한 플러그인 사용
    ],

    /** Extends */
    extends: [
        'airbnb', // Airbnb의 코드 스타일 가이드 사용
        'airbnb/hooks', // Airbnb의 React Hooks 규칙 추가
        'plugin:react/recommended', // React 권장 규칙 사용
        'plugin:@typescript-eslint/recommended', // TypeScript 권장 규칙 사용
        'plugin:prettier/recommended', // Prettier 권장 설정 사용 및 Prettier 오류를 ESLint 오류로 표시
    ],

    /** Rules */
    rules: {
        /** General Rules */
        'no-alert': 'off', // alert 사용에 대한 경고 비활성화
        'no-console': 'off', // console 사용에 대한 경고 비활성화
        'import/prefer-default-export': 'off', // 단일 export에 대해 기본 export 권장 비활성화

        /** React Rules */
        'react/jsx-props-no-spreading': 'off', // JSX에서 props 펼침 사용 허용
        'react/require-default-props': 'off', // 기본 props 정의 요구 비활성화
        'react/function-component-definition': [
            2,
            { namedComponents: ['arrow-function', 'function-declaration'] }, // 함수형 컴포넌트 정의 방식을 지정
        ],
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                some: ['nesting', 'id'], // 접근성을 위한 label과 control 연관 규칙 설정
            },
        ],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // .tsx 파일에서 JSX 사용 허용
        'react/react-in-jsx-scope': 'off', // React 17 이후 JSX에서 React import 필요 없음

        /** TypeScript Rules */
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수 반환 타입 명시 요구 비활성화
        '@typescript-eslint/no-unused-vars': ['warn'], // 사용되지 않는 변수에 대해 경고

        /** Prettier Rules */
        'prettier/prettier': [
            'error',
            {},
            {
                usePrettierrc: true, // .prettierrc 파일 사용 허용
            },
        ],

        /** Import Rules */
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type', 'unknown'],
                pathGroups: [
                    { pattern: 'react', group: 'external', position: 'before' },
                    { pattern: '@assets/*', group: 'internal', position: 'before' },
                    { pattern: '@shared/*', group: 'internal', position: 'before' },
                    { pattern: '@features/*', group: 'internal', position: 'before' },
                    { pattern: '@interfaces/*', group: 'internal', position: 'before' },
                    { pattern: '@routes/*', group: 'internal', position: 'before' },
                    { pattern: '@app/*', group: 'internal', position: 'before' }, // 추가된 @app 경로 설정
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],

        /** React Hooks Rules */
        'react-hooks/rules-of-hooks': 'error', // React Hooks 규칙 강제
        'react-hooks/exhaustive-deps': 'warn', // 종속성 배열 검사 경고
    },

    /** Settings */
    settings: {
        react: {
            version: 'detect', // React 버전을 자동으로 감지하여 적절한 규칙 적용
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // import 모듈의 타입을 항상 시도합니다
                project: './tsconfig.json', // tsconfig.json 위치 지정
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'], // Node 모듈 해석 시 확장자 목록
            },
        },
    },

    /** Overrides */
    overrides: [
        {
            files: ['*.tsx', '*.ts'], // TypeScript 파일에만 적용되는 규칙 설정
            rules: {
                'no-unused-vars': 'off', // JavaScript 기본 사용되지 않는 변수 검사 비활성화
                '@typescript-eslint/no-unused-vars': ['warn'], // TypeScript에서 사용되지 않는 변수 경고
            },
        },
    ],
};