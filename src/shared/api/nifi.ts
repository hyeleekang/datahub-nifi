import { axiosInstance } from './axios';
import { NifiResponse, ProcessorState } from '../../types/nifi';

const baseURL = '/v1/nifi';

export const getProcessGroups = async (): Promise<NifiResponse> => {
    const response = await axiosInstance.get(`${baseURL}/process-groups`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch process groups');
    }
    console.log('Response data:', response.data);
    return response.data;
};

export const updateProcessorState = async (processorId: string, state: string): Promise<ProcessorState> => {
    const response = await axiosInstance.put(`${baseURL}/processors/${processorId}/state`, { state });
    if (response.status !== 200) {
        throw new Error('Failed to update processor state');
    }
    return response.data;
};
