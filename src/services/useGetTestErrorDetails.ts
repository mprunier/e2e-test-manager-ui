import useSWR, { SWRConfiguration } from "swr";
import { TestResultApiService, type TestResultErrorDetailsResponse } from "../api";

interface IParams {
    testId: string;
}

export const useSwrGetTestDetails = (testId: string, options: SWRConfiguration<TestResultErrorDetailsResponse> = {}) =>
    useSWR<TestResultErrorDetailsResponse>(["useSwrGetTestDetails", testId], {
        ...options,
        fetcher: () => TestResultApiService.getErrorDetails(testId),
        revalidateOnFocus: false,
    });

export const useGetTestErrorDetails = (props: IParams) => {
    const { testId } = props;

    const {
        data: testDetailsData,
        error: testDetailsError,
        isLoading: testDetailsLoading,
    } = useSwrGetTestDetails(testId);

    return {
        testDetailsData,
        testDetailsError,
        testDetailsLoading,
    };
};
