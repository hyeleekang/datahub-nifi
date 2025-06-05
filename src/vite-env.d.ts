/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        VITE_APP_TITLE: string;
        VITE_BASE_API_URL: string;
    }
}
