/**
 * @function convertPxToRem
 * @description px 값을 rem 단위로 변환하여 반환
 * @param px 변환할 픽셀 값
 * @param baseFontSize 기본 폰트 사이즈, default 16
 * @returns {string} rem 단위 문자열
 */
export const convertPxToRem = (px: number, baseFontSize: number = 16): string => {
    const remValue = (px / baseFontSize).toFixed(3);
    return `${parseFloat(remValue)}rem`;
};

/**
 * @function formatToUSD
 * @description 숫자를 USD 형식으로 포맷팅
 * @param amount 포맷팅할 숫자
 * @returns {string} USD 형식 문자열
 */
export const formatToUSD = (amount: number): string =>
    amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

/**
 * @function formatAddCommaNumber
 * @description 숫자를 쉼표 형식으로 포맷팅
 * @param value 포맷팅할 숫자
 * @returns {string} 쉼표 형식 문자열
 */
export const formatAddCommaNumber = (value?: number): string => {
    if (!value) return '0';
    return value.toLocaleString('ko-KR');
};

/**
 * @function formatK
 * @description 숫자를 K 단위로 포맷팅
 * @param num 포맷팅할 숫자
 * @returns {string} K 단위 문자열
 */
export const formatK = (num: number): string => {
    const formatter = new Intl.NumberFormat('en-US');

    if (num >= 1000) {
        return `${formatter.format(parseFloat((num / 1000).toFixed(1)))}K`;
    }
    return formatter.format(num);
};

/**
 * @function formatUSD
 * @description 숫자를 USD 형식으로 포맷팅
 * @param num 포맷팅할 숫자
 * @returns {string} USD 형식 문자열
 */
export const formatUSD = (num: number): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    if (num >= 1000) {
        return `${formatter.format(parseFloat((num / 1000).toFixed(1))).replace('$', '$')}K`;
    }
    return formatter.format(num);
};

/**
 * 파일 사이즈를 적정한 단위(예: KB, MB)를 지정하여 문자열 형식으로 변환후 반환
 * @function formatBytes
 * @param {number} bytes 파일 size bytes
 * @param {number} decimals 출력의 소수 자릿수를 지정, 제공되지 않은 경우 기본값은 1
 * @returns {string}
 */
export const formatBytes = (bytes: number, decimals: number = 1): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

/**
 * @function generateUUID
 * @description UUID v4를 생성하는 함수
 * @returns {string} 생성된 UUID
 */
export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
