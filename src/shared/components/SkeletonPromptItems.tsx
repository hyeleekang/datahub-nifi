import Skeleton from 'react-loading-skeleton';

import { Divider, Paper } from '@shared';
import { generateUUID } from '@shared/utils/common';

import 'react-loading-skeleton/dist/skeleton.css';

/**
 * @component SkeletonPromptItems
 * @description 프롬프트 목록 스켈레톤
 * @returns {JSX.Element}
 */
export const SkeletonPromptItems = () => {
    return (
        <div className="flex flex-wrap gap-16">
            {Array.from({ length: 3 }).map(() => (
                <div key={`row-${generateUUID()}`} className="flex w-full gap-16">
                    {Array.from({ length: 4 }).map(() => (
                        <Paper key={`skeleton-${generateUUID()}`} type="body-only" flexible>
                            <div className="flex w-full flex-col gap-8 py-6">
                                <div className="flex w-full items-center justify-between">
                                    <Skeleton containerClassName="w-44 h-26 rounded-4" className="block size-full" />
                                    <Skeleton containerClassName="w-42 h-28" className="block size-full" />
                                </div>
                                <Skeleton containerClassName="w-full h-24" className="block size-full" />
                                <div className="flex flex-col gap-16">
                                    <Skeleton containerClassName="w-full h-21" className="block size-full" />
                                    <Divider />
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-8">
                                            <Skeleton containerClassName="w-100 h-18" className="block size-full" />
                                        </div>
                                        <Skeleton
                                            containerClassName="w-46 h-28 rounded-4"
                                            className="block size-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    ))}
                </div>
            ))}
        </div>
    );
};
