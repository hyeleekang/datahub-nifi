import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useApiError } from '@shared/api/useApiError';
import { Paper } from '@shared/components/Paper';
import { useToast } from '@shared/hooks/useToast';

import { ConfirmModal } from './ConfirmModal';
import { PortalModal } from './PortalModal';
import { ProcessGroupComponent } from '../../types/nifi';
import { updateProcessorState } from '../api/nifi';

/**
 * @type NifiItemsProps
 * @description Nifi 목록 컴포넌트 props 타입
 */
type NifiItemsProps = {
    nifiItems: ProcessGroupComponent[];
};

/**
 * @component NifiItems
 * @description Nifi 목록 컴포넌트
 * @param {ProcessGroupComponent[]} nifiItems
 * @returns {JSX.Element}
 */
export const NifiItems = ({ nifiItems }: NifiItemsProps): JSX.Element => {
    const queryClient = useQueryClient();
    const [selectedGroup, setSelectedGroup] = useState<ProcessGroupComponent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showToast = useToast();
    const { handleError } = useApiError();

    const { mutate: updateState } = useMutation({
        mutationFn: ({ processorId, state }: { processorId: string; state: 'RUNNING' | 'STOPPED' }) =>
            updateProcessorState(processorId, state),
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['processGroups'] });
            showToast({ type: 'success', title: '상태가 성공적으로 변경되었습니다.' });
            setIsModalOpen(false);
        },
        onError: (error: Error) => {
            handleError(error);
            setIsModalOpen(false);
        },
    });

    const handleStateChange = (processorId: string, currentState: string) => {
        const newState = currentState === 'RUNNING' ? 'STOPPED' : 'RUNNING';
        updateState({ processorId, state: newState });
    };

    const handleOpenModal = (group: ProcessGroupComponent) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-wrap gap-16">
                {nifiItems
                    .reduce<ProcessGroupComponent[][]>((rows, item, index) => {
                        if (index % 4 === 0) rows.push([]);
                        rows[rows.length - 1].push(item);
                        return rows;
                    }, [])
                    .map((row, rowIndex) => (
                        <div key={`row-${rowIndex}`} className="flex w-full gap-16">
                            {row.map(group => (
                                <Paper key={group.id} type="body-only" flexible>
                                    <div className="flex w-full flex-col gap-8 py-6">
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-8">
                                                <span className="text-subheader04 text-gray-1200">{group.name}</span>
                                            </div>
                                            <button
                                                onClick={() => handleOpenModal(group)}
                                                className={`w-fit cursor-pointer rounded-4 p-4 text-body05 text-gray-1200 transition-colors ${
                                                    group.runningCount > 0
                                                        ? 'bg-green-300 hover:bg-green-400'
                                                        : group.stoppedCount > 0
                                                          ? 'bg-red-300 hover:bg-red-400'
                                                          : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            >
                                                {group.runningCount > 0
                                                    ? 'RUNNING'
                                                    : group.stoppedCount > 0
                                                      ? 'STOPPED'
                                                      : 'UNKNOWN'}
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-16">
                                            <div className="space-y-2">
                                                <p className="flex justify-between text-body03 text-gray-800">
                                                    <span>실행 중:</span>
                                                    <span className="font-medium">{group.runningCount}</span>
                                                </p>
                                                <p className="flex justify-between text-body03 text-gray-800">
                                                    <span>중지됨:</span>
                                                    <span className="font-medium">{group.stoppedCount}</span>
                                                </p>
                                                <p className="flex justify-between text-body03 text-gray-800">
                                                    <span>유효하지 않음:</span>
                                                    <span className="font-medium">{group.invalidCount}</span>
                                                </p>
                                                <p className="flex justify-between text-body03 text-gray-800">
                                                    <span>비활성화됨:</span>
                                                    <span className="font-medium">{group.disabledCount}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            ))}
                            {/* 빈 Paper 추가 */}
                            {Array.from({ length: 4 - row.length }).map((_, index) => (
                                <div key={`empty-${rowIndex}-${index}`} className="flex-1" />
                            ))}
                        </div>
                    ))}
            </div>
            {isModalOpen && selectedGroup && (
                <PortalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showCloseConfirm={false}>
                    <ConfirmModal
                        title={selectedGroup.runningCount > 0 ? 'STOPPED' : 'RUNNING'}
                        subText="상태를 변경하시겠습니까?"
                        okMessage="확인"
                        cancelMessage="취소"
                        onClickOk={() =>
                            handleStateChange(selectedGroup.id, selectedGroup.runningCount > 0 ? 'RUNNING' : 'STOPPED')
                        }
                        onClickCancel={() => setIsModalOpen(false)}
                    />
                </PortalModal>
            )}
        </>
    );
};
