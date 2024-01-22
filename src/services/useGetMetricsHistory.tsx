import { formatApiDate } from "../utils/dateUtils.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import useSWR, { SWRConfiguration } from "swr";
import { getMetricsHistoryApiRoute } from "../endpoints/publicEndpoints.ts";
import { IMetrics } from "../interfaces/domain/IMetrics.tsx";

interface IParams {
    period: string;
}

const calculateStartDate = (period: string) => {
    const now = new Date();
    switch (period) {
        case "day":
            return formatApiDate(now);
        case "week":
            return formatApiDate(new Date(now.setDate(now.getDate() - 7)));
        case "month":
            return formatApiDate(new Date(now.setMonth(now.getMonth() - 1)));
        case "3months":
            return formatApiDate(new Date(now.setMonth(now.getMonth() - 3)));
        case "6months":
            return formatApiDate(new Date(now.setMonth(now.getMonth() - 6)));
        case "year":
            return formatApiDate(new Date(now.setFullYear(now.getFullYear() - 1)));
        default:
            return formatApiDate(new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1))));
    }
};

const useGetSwrMetricsHistory = (
    environmentId: number,
    periodDate: string,
    options: SWRConfiguration<IMetrics[]> = {},
) =>
    useSWR<IMetrics[]>(["useGetSwrMetricsHistory", environmentId, periodDate], {
        ...options,
        revalidateOnFocus: false,
        fetcher: () => getMetricsHistoryApiRoute(environmentId, periodDate),
    });

export const useGetMetricsHistory = (props: IParams) => {
    const { period } = props;
    const { environment } = useEnvironmentContext();

    const periodDate = calculateStartDate(period);
    const { data, isLoading, error } = useGetSwrMetricsHistory(environment?.id as number, periodDate);

    return {
        data: data || [],
        isLoading,
        error,
    };
};
