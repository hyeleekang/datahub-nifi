import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { ICONS } from '@shared/constants';

const { ARROW_LEFT } = ICONS;

/**
 * PageTitle 컴포넌트의 props 타입 정의
 * @type {PageTitleProps}
 * @property {string} title 페이지의 제목을 나타냅니다.
 * @property {string | ReactNode} [subTitle] 페이지의 부제목을 나타냅니다. 문자열인 경우 특정 스타일이 적용된 태그로 렌더링되며, ReactNode인 경우 그대로 렌더링됩니다.
 */
type PageTitleProps = {
    title: string;
    subTitle?: string | ReactNode;
    historyBackUrl?: string;
};

/**
 * 각 feature에 해당하는 page 상단 타이틀을 나타내는 컴포넌트
 * @component
 * @param {PageTitleProps} props PageTitle 컴포넌트의 props입니다.
 * @param {string} props.title 페이지의 제목을 나타냅니다.
 * @param {string | ReactNode} [props.subTitle] 페이지의 부제목을 나타냅니다. 문자열인 경우 특정 스타일이 적용된 태그로 렌더링되며, ReactNode인 경우 그대로 렌더링됩니다.
 * @returns {JSX.Element} 주어진 스타일이 적용된 수평 구분선 요소를 반환합니다.
 */
export const PageTitle = ({ title, subTitle, historyBackUrl }: PageTitleProps): JSX.Element => {
    // hooks
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-start gap-14 px-4">
            <div className="flex items-center justify-center gap-4">
                {historyBackUrl && (
                    <button
                        type="button"
                        className="flex size-24 items-center justify-center active:translate-y-1"
                        onClick={() => navigate(historyBackUrl)}
                    >
                        <img src={ARROW_LEFT} alt="arrow left" />
                    </button>
                )}
                <span className="text-header06 text-black">{title || ''}</span>
            </div>
            {subTitle &&
                (typeof subTitle === 'string' ? (
                    <span className="text-body06 text-gray-900">{subTitle}</span>
                ) : (
                    subTitle || ''
                ))}
        </div>
    );
};
