export interface IMetrics {
    at: Date;
    suites?: number;
    tests?: number;
    passes?: number;
    failures?: number;
    skipped?: number;
    passPercent?: number;
    isAllTestsRun: boolean;
    lastAllTestsRunAt?: Date;
}
