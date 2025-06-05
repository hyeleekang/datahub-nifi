export interface ProcessGroup {
    id: string;
    name: string;
    queued_count: string;
    queued_size: string;
    generate_flow_files: GenerateFlowFile[];
}

export interface GenerateFlowFile {
    id: string;
    name: string;
    state: string;
    run_status: string;
    queued_count: string;
    queued_size: string;
    scheduling_strategy: string;
    scheduling_period: string;
    scheduling_period_detail: string;
}

export interface ProcessGroupComponent {
    id: string;
    name: string;
    runningCount: number;
    stoppedCount: number;
    invalidCount: number;
    disabledCount: number;
}

export interface ProcessGroupFlow {
    id: string;
    flow: {
        processGroups: Array<{
            component: ProcessGroupComponent;
        }>;
    };
}

export interface NifiResponse {
    processGroupFlow: ProcessGroupFlow;
}

export interface ProcessorState {
    state: string;
}
