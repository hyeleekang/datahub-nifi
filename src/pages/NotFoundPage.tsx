import { PageTitle } from '@shared/components/PageTitle';

/**
 * @function NotFoundPage
 * @description 404 페이지 컴포넌트
 * @return {JSX.Element}
 */
export const NotFoundPage = (): JSX.Element => {
    return (
        <div className="flex size-full flex-1 flex-col gap-30 pt-20 transition-all duration-300">
            <div className="flex size-full flex-col gap-16">
                <div className="flex w-full items-center justify-between px-30">
                    <PageTitle title="404 페이지" />
                </div>
            </div>
        </div>
    );
};
