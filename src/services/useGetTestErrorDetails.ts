import useSWR, { SWRConfiguration } from "swr";
import { getTestDetailsApiRoute } from "../endpoints/publicEndpoints.ts";
import { ITest } from "../interfaces/domain/ITest.tsx";

interface IParams {
    testId: number;
}

export const useSwrGetTestDetails = (testId: number, options: SWRConfiguration<ITest> = {}) =>
    useSWR<ITest>(["useSwrGetTestDetails", testId], {
        ...options,
        fetcher: () => getTestDetailsApiRoute(testId),
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
