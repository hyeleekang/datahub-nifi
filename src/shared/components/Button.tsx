import classNames from 'classnames';
import React, { useState } from 'react';

import { ICONS } from '@shared/constants';
import { convertPxToRem } from '@shared/utils';

const {
    BUTTON_SEARCH_WHITE,
    BUTTON_SEARCH_BLUE_700,
    BUTTON_SEARCH_BLUE_500,
    BUTTON_SEARCH_GRAY_900,
    BUTTON_SEARCH_GRAY_500,
    BUTTON_REFRESH_WHITE,
    BUTTON_REFRESH_BLUE_700,
    BUTTON_REFRESH_BLUE_500,
    BUTTON_REFRESH_GRAY_900,
    BUTTON_REFRESH_GRAY_500,
    BUTTON_DELETE_WHITE,
    BUTTON_DELETE_BLUE_700,
    BUTTON_DELETE_BLUE_500,
    BUTTON_DELETE_GRAY_900,
    BUTTON_DELETE_GRAY_500,
    BUTTON_PLUS_WHITE,
    BUTTON_PLUS_BLUE_700,
    BUTTON_PLUS_BLUE_500,
    BUTTON_PLUS_GRAY_900,
    BUTTON_PLUS_GRAY_500,
} = ICONS;

interface BaseButtonProps {
    type?: 'button' | 'submit';
    size?: 'lg' | 'md' | 'sm';
    width?: number;
    fullSize?: boolean;
    disabled?: boolean;
    iconType?: 'search' | 'refresh' | 'delete' | 'add';
    iconPosition?: 'left' | 'right';
    iconSize?: number;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface BlueButtonProps extends BaseButtonProps {
    color: 'blue';
    variant: 'primary' | 'secondary' | 'tertiary';
}

interface GrayButtonProps extends BaseButtonProps {
    color: 'gray';
    variant: 'secondary' | 'tertiary';
}

type ButtonProps = BlueButtonProps | GrayButtonProps;

/**
 * @component Button
 * @description 버튼 컴포넌트
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
export const Button = ({
    type = 'button',
    variant,
    size = 'md',
    width,
    fullSize,
    color,
    disabled,
    iconType,
    iconPosition,
    iconSize,
    children,
    onClick,
}: ButtonProps): JSX.Element => {
    // state
    const [isHovered, setIsHovered] = useState(false);

    /**
     * @variable buttonClasses
     * @description 버튼 클래스 스타일
     */
    const buttonClasses = classNames(
        'rounded-4 flex items-center justify-center active:opacity-80 active:shadow-inner focus:outline-none',
        {
            // blue primary
            'bg-blue-700 text-white hover:bg-blue-800': variant === 'primary' && color === 'blue' && !disabled,
            'bg-blue-500 text-white cursor-not-allowed pointer-events-none':
                variant === 'primary' && color === 'blue' && disabled,

            // blue secondary
            'bg-white text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white':
                variant === 'secondary' && color === 'blue' && !disabled,
            'bg-white text-blue-500 border border-blue-500 cursor-not-allowed pointer-events-none':
                variant === 'secondary' && color === 'blue' && disabled,

            // blue tertiary
            'text-blue-700 hover:bg-blue-700 hover:text-white': variant === 'tertiary' && color === 'blue' && !disabled,
            'text-blue-500 cursor-not-allowed pointer-events-none':
                variant === 'tertiary' && color === 'blue' && disabled,

            // gray secondary
            'bg-white text-gray-900 border border-gray-600 hover:bg-gray-400 active:border-gray-600':
                variant === 'secondary' && color === 'gray' && !disabled,
            'bg-white text-gray-500 border border-gray-400 cursor-not-allowed pointer-events-none active:border-gray-400':
                variant === 'secondary' && color === 'gray' && disabled,

            // gray tertiary
            'text-gray-900 hover:bg-gray-400 active:border-transparent':
                variant === 'tertiary' && color === 'gray' && !disabled,
            'text-gray-500 cursor-not-allowed pointer-events-none active:border-transparent':
                variant === 'tertiary' && color === 'gray' && disabled,

            // Size: Large, Medium, Small (Add responsive classes)
            'p-8 h-50 gap-4 text-body03 whitespace-nowrap overflow-hidden text-ellipsis min-w-250': size === 'lg',
            'py-6 px-12 gap-4 h-36 text-body03 whitespace-nowrap overflow-hidden text-ellipsis': size === 'md',
            'py-2 px-10 gap-4 h-28 text-body05 whitespace-nowrap overflow-hidden text-ellipsis': size === 'sm',

            // width
            'w-full': fullSize,
        },
    );

    /**
     * @function renderIconByType
     * @description 버튼 아이콘 렌더링
     * @param {ButtonProps['iconType']} buttonIconType
     * @returns {JSX.Element | null}
     */
    const renderIconByType = (buttonIconType: ButtonProps['iconType']): JSX.Element | null => {
        if (!buttonIconType) return null;
        // 아이콘 매핑 객체 정의
        const iconMapping = {
            search: {
                primary: {
                    blue: BUTTON_SEARCH_WHITE,
                },
                secondary: {
                    blue: {
                        enabled: isHovered ? BUTTON_SEARCH_WHITE : BUTTON_SEARCH_BLUE_700,
                        disabled: BUTTON_SEARCH_BLUE_500,
                    },
                    gray: {
                        enabled: BUTTON_SEARCH_GRAY_900,
                        disabled: BUTTON_SEARCH_GRAY_500,
                    },
                },
            },
            refresh: {
                primary: {
                    blue: BUTTON_REFRESH_WHITE,
                },
                secondary: {
                    blue: {
                        enabled: isHovered ? BUTTON_REFRESH_WHITE : BUTTON_REFRESH_BLUE_700,
                        disabled: BUTTON_REFRESH_BLUE_500,
                    },
                    gray: {
                        enabled: BUTTON_REFRESH_GRAY_900,
                        disabled: BUTTON_REFRESH_GRAY_500,
                    },
                },
            },
            delete: {
                primary: {
                    blue: BUTTON_DELETE_WHITE,
                },
                secondary: {
                    blue: {
                        enabled: isHovered ? BUTTON_DELETE_WHITE : BUTTON_DELETE_BLUE_700,
                        disabled: BUTTON_DELETE_BLUE_500,
                    },
                    gray: {
                        enabled: BUTTON_DELETE_GRAY_900,
                        disabled: BUTTON_DELETE_GRAY_500,
                    },
                },
            },
            add: {
                primary: {
                    blue: BUTTON_PLUS_WHITE,
                },
                secondary: {
                    blue: {
                        enabled: isHovered ? BUTTON_PLUS_WHITE : BUTTON_PLUS_BLUE_700,
                        disabled: BUTTON_PLUS_BLUE_500,
                    },
                    gray: {
                        enabled: BUTTON_PLUS_GRAY_900,
                        disabled: BUTTON_PLUS_GRAY_500,
                    },
                },
            },
        };
        // 아이콘 소스 가져오기
        const getIconSrc = () => {
            if (variant === 'primary') {
                return iconMapping[buttonIconType].primary[color];
            }

            return iconMapping[buttonIconType].secondary[color][disabled ? 'disabled' : 'enabled'];
        };
        const iconSrc = getIconSrc();
        return iconSrc ? (
            <img
                src={iconSrc}
                alt="button icon"
                className="h-auto w-auto select-none"
                style={{
                    width: iconSize ? convertPxToRem(iconSize) : undefined,
                    height: iconSize ? convertPxToRem(iconSize) : undefined,
                    imageRendering: 'crisp-edges',
                    WebkitFontSmoothing: 'antialiased',
                }}
            />
        ) : null;
        // return iconSrc ? (
        //     <object
        //         data={iconSrc}
        //         type="image/svg+xml"
        //         style={{
        //             width: iconSize ? convertPxToRem(iconSize) : undefined,
        //             height: iconSize ? convertPxToRem(iconSize) : undefined,
        //         }}
        //     >
        //         <img src={iconSrc} alt="button icon" />
        //     </object>
        // ) : null;
    };

    return (
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            className={classNames(buttonClasses)}
            style={{
                width: width ? `${convertPxToRem(width)}` : undefined,
                transition: 'none', // 트랜지션 제거
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {iconType && iconPosition === 'left' && renderIconByType(iconType)}
            {children}
            {iconType && iconPosition === 'right' && renderIconByType(iconType)}
        </button>
    );
};
