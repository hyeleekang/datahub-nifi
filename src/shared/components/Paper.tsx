import classNames from 'classnames';

import { convertPxToRem } from '@shared/utils';

/**
 * @type PaperProps
 * @description Paper 컴포넌트 속성
 */
export type PaperProps = {
    children: React.ReactNode;
    type?: 'primary' | 'secondary' | 'body-only';
    title?: string;
    width?: number | string;
    flexible?: boolean;
    className?: string;
};

/**
 * @function Paper
 * @description Paper 컴포넌트
 * @param {PaperProps} props Paper 컴포넌트 속성
 * @returns {JSX.Element} Paper 컴포넌트
 */
export const Paper = ({
    children,
    type = 'primary',
    title,
    width,
    flexible = false,
    className,
}: PaperProps): JSX.Element => {
    /**
     * @function getWidthStyle
     * @description width 속성에 따른 style 반환
     * @returns {Object} width 속성에 따른 style
     */
    const getWidthStyle = () => {
        if (!width) return { width: '100%' };
        if (typeof width === 'number') return { width: `${convertPxToRem(width)}` };
        return {}; // string인 경우 style 적용하지 않음
    };

    return (
        <>
            {/** wrapper */}
            <div
                className={classNames('flex size-full flex-col rounded-4', {
                    'flex-1': flexible,
                    [width as string]: typeof width === 'string', // string인 경우 className으로 적용
                    [className as string]: className,
                })}
                style={getWidthStyle()}
            >
                {/** header */}
                {type !== 'body-only' && (
                    <div
                        className={classNames(
                            'flex min-h-40 w-full items-center justify-start rounded-t-4 border-l-1 border-r-1 border-t-1 border-gray-400 px-16 text-body02 text-gray-1100',
                            {
                                'bg-blue-300': type === 'primary',
                                'border-b-1 border-gray-400 bg-white': type === 'secondary',
                            },
                        )}
                    >
                        {title}
                    </div>
                )}
                {/** body */}
                <div
                    className={classNames(
                        'flex size-full overflow-hidden rounded-b-4 border-b-1 border-l-1 border-r-1 border-gray-400 bg-white p-16',
                        {
                            'border-t-1': type === 'body-only',
                        },
                    )}
                >
                    {children}
                </div>
            </div>
        </>
    );
};
