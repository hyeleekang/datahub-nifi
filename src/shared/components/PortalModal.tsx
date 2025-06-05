import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ConfirmModal } from './ConfirmModal';

/**
 * @type PortalModalProps
 * @description PortalModal 컴포넌트 props 타입
 * @property {boolean} isOpen - 모달 열림 여부
 * @property {function} onClose - 모달 닫기 함수
 * @property {React.ReactNode} children - 모달 내용
 * @property {boolean} [showCloseConfirm=false] - 닫기 확인 모달 표시 여부
 */
type PortalModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCloseConfirm?: boolean;
};

/**
 * @component PortalModal
 * @description Portal을 사용한 모달 컴포넌트
 * @param {PortalModalProps} props
 * @returns {JSX.Element | null}
 */
export const PortalModal = ({
    isOpen,
    onClose,
    children,
    showCloseConfirm = false,
}: PortalModalProps): JSX.Element | null => {
    const [mounted, setMounted] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                if (showCloseConfirm) {
                    setConfirmModalOpen(true);
                } else {
                    onClose();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, showCloseConfirm]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (showCloseConfirm) {
                    setConfirmModalOpen(true);
                } else {
                    onClose();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose, showCloseConfirm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                if (showCloseConfirm) {
                    setConfirmModalOpen(true);
                } else {
                    onClose();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, showCloseConfirm]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="relative">
                {children}
                {confirmModalOpen && showCloseConfirm && (
                    <ConfirmModal
                        title="닫기"
                        subText="현재 모달창을 닫으시겠습니까?"
                        okMessage="확인"
                        cancelMessage="취소"
                        onClickOk={() => {
                            setConfirmModalOpen(false);
                            onClose();
                        }}
                        onClickCancel={() => setConfirmModalOpen(false)}
                    />
                )}
            </div>
        </div>,
        document.body,
    );
};
