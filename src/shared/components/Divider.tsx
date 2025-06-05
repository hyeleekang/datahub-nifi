/**
 * Divider 컴포넌트의 props 타입 정의
 * @type {DividerProps}
 * @property {string} [bgColor='gray-400'] Tailwind CSS 색상 클래스를 사용하여 구분선의 배경색을 설정합니다.
 * @property {number} [px=0] 구분선의 좌우 패딩 값을 설정합니다.
 */
export type DividerProps = {
    bgColor?: string;
    px?: number;
};

/**
 * Divider 컴포넌트는 콘텐츠를 시각적으로 구분하기 위해 사용되는 수평선을 렌더링합니다.
 * @component
 * @param {DividerProps} props Divider 컴포넌트의 props입니다.
 * @param {string} [props.bgColor='gray-400'] Tailwind CSS 색상 클래스를 사용하여 구분선의 배경색을 설정합니다.
 * @param {number} [props.px=0] 구분선의 좌우 패딩 값을 설정합니다.
 * @returns {JSX.Element} 주어진 스타일이 적용된 수평 구분선 요소를 반환합니다.
 */
export const Divider = ({ bgColor = 'gray-400', px = 0 }: DividerProps): JSX.Element => {
    const dividerClass = `h-px w-full bg-${bgColor} px-${px}`;
    return <div className={dividerClass} />;
};
