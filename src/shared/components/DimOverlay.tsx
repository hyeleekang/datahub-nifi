import classNames from 'classnames';
import { useLayoutEffect, useState } from 'react';

/**
 * DimOverlay 컴포넌트의 props 정보
 * @type DimOverlayProps
 * @property {string=} className props로 전달받은 tailwind class
 * @property {Function=} onClick 배경 클릭 시 실행할 함수 (e.stopPropagation() 포함)
 */
interface DimOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 추가적으로 적용할 CSS 클래스 */
    className?: string;
    /** 자식 객체 */
    children?: React.ReactElement;
    /** 클릭 이벤트를 처리하는 함수 */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

/**
 * modal 또는 popup 사용시 배경으로 사용되는 화면 전체를 어둡게 덮는 컴포넌트
 * @param {DimOverlayProps} props DimOverlay 컴포넌트의 props
 * @param {string} props.className 추가적인 CSS 클래스를 지정할 수 있습니다. Tailwind CSS 클래스 호환
 * @param {Function} props.onClick 배경 클릭 시 실행할 함수 (e.stopPropagation() 포함)
 */
export const DimOverlay = ({ className, children, onClick }: DimOverlayProps) => {
    // state
    const [overlayExists, setOverlayExists] = useState(() => {
        // 초기 상태를 즉시 감지하여 설정
        const existingOverlay = document.querySelectorAll('#dim-overlay');
        return existingOverlay.length > 1;
    });

    const defaultClasses = 'fixed left-0 top-0 z-50 flex size-full flex-col items-center justify-center';

    useLayoutEffect(() => {
        const existingOverlay = document.querySelectorAll('#dim-overlay');
        if (existingOverlay.length > 1) {
            setOverlayExists(true);
        }
    }, []);

    return (
        <div
            id="dim-overlay"
            role="none"
            className={classNames(defaultClasses, className, {
                '!bg-transparent': overlayExists,
                'bg-black/30': !overlayExists,
            })}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                /** 이벤트 전파 방지 */
                e.stopPropagation();
                if (onClick) {
                    onClick(e);
                }
            }}
        >
            {children}
        </div>
    );
};
