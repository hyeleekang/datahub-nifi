import { ICONS } from '@shared/constants';

const { PRIORITY_HIGH } = ICONS;

/**
 * @type EmptyMessageProps
 * EmptyMessage 컴포넌트 props 타입
 */
type EmptyMessageProps = {
    message: string;
};

/**
 * 데이터가 없을 때 표시하는 메시지 컴포넌트
 * @param message 메시지
 * @returns
 */
export const EmptyMessage = ({ message }: EmptyMessageProps) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
            <img src={PRIORITY_HIGH} alt="조회 데이터가 없습니다." className="size-24" />
            <span className="text-body04 text-gray-900">{message}</span>
        </div>
    );
};
