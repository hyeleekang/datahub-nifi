import { useCallback, useState } from 'react';

type UseModalOutput<T> = {
    isOpen: boolean;
    modalData: T | null;
    openModal: (data?: T) => void;
    closeModal: () => void;
    toggleModal: () => void;
};

/**
 * 모달 open, close를 관리하기 위한 hooks
 * @param {boolean} initialState 제외 대상 modal Ref
 */
export const useModal = <T = unknown>(
    initialState: boolean = false,
    initialData: T | null = null,
): UseModalOutput<T> => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState);
    const [modalData, setModalData] = useState<T | null>(initialData);

    const openModal = useCallback((data?: T) => {
        setModalData(data ?? null);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalData(null);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen(prev => !prev);
        if (!isOpen) {
            setModalData(null);
        }
    }, [isOpen]);

    return { isOpen, modalData, openModal, closeModal, toggleModal };
};
