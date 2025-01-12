import { IConfigSwr } from "./interfaces/IConfigSwr.ts";
import { fetcher } from "./utils/fetcherUtils.ts";
import { SWRConfig } from "swr";
import { App } from "./App.tsx";

export const AppProviders = () => {
    const defaultSWROptions: IConfigSwr = {
        revalidateOnMount: true,
        fetcher,
    };

    const renderApp = () => {
        return (
            <SWRConfig value={defaultSWROptions}>
                <App />
            </SWRConfig>
        );
    };

    return <>{renderApp()}</>;
};
