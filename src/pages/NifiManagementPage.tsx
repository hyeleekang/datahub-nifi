import { useQuery } from '@tanstack/react-query';

import { EmptyMessage, SkeletonPromptItems } from '@shared/components';

import { NifiItems } from '@shared/components/NifiItems';
import { PageTitle } from '@shared/components/PageTitle';

import { getProcessGroups } from '../shared/api/nifi';
import { NifiResponse } from '../types/nifi';

/**
 * @component NifiManagementPage
 * @description Nifi 관리 페이지
 * @returns {JSX.Element}
 */
export const NifiManagementPage = () => {
    const {
        data: processGroups,
        isLoading,
        error,
    } = useQuery<NifiResponse>({
        queryKey: ['processGroups'],
        queryFn: getProcessGroups,
        retry: false,
    });

    const processGroupsList = processGroups?.processGroupFlow?.flow?.processGroups || [];

    return (
        <div className="flex size-full flex-1 flex-col gap-30 pt-20 transition-all duration-300">
            <div className="flex size-full flex-col gap-16">
                <div className="flex w-full items-center justify-between px-30">
                    <PageTitle title="Nifi 관리" subTitle={`총 프로세스 그룹 ${processGroupsList.length} 개`} />
                </div>
                <div className="flex size-full flex-col gap-12 overflow-y-auto px-30 pb-30 pt-30">
                    {isLoading && <SkeletonPromptItems />}
                    {error && <EmptyMessage message="데이터를 불러오는데 실패했습니다." />}
                    {!isLoading &&
                        !error &&
                        (processGroupsList.length > 0 ? (
                            <NifiItems nifiItems={processGroupsList.map(pg => pg.component)} />
                        ) : (
                            <EmptyMessage message={`조회 데이터가 없습니다. ${processGroupsList.length}`} />
                        ))}
                </div>
            </div>
        </div>
    );
};
