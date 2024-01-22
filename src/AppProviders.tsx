import { IConfigSwr } from "./interfaces/IConfigSwr.ts";
import { fetcher } from "./utils/fetcherUtils.ts";
import { SWRConfig } from "swr";
import { EnvironmentProvider } from "./providers/EnvironmentProvider.tsx";
import { EventProvider } from "./providers/EventProvider.tsx";
import { App } from "./App.tsx";

export const AppProviders = () => {
    const defaultSWROptions: IConfigSwr = {
        revalidateOnMount: true,
        fetcher,
    };

    const renderApp = () => {
        return (
            <SWRConfig value={defaultSWROptions}>
                <EnvironmentProvider>
                    <EventProvider>
                        <App />
                    </EventProvider>
                </EnvironmentProvider>
            </SWRConfig>
        );
    };

    return <>{renderApp()}</>;
};
