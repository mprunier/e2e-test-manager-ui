import { useSynchronization } from "../../../services/useSynchronization.ts";
import { EnvironmentUpdateForm } from "./EnvironmentUpdateForm.tsx";
import { GlobalLoader } from "../../Common/Loader/GlobalLoader.tsx";
import { Error } from "../../Common/Error/Error.tsx";
import { SynchronizationButton } from "../Synchronization/SynchronizationButton.tsx";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { ConfigurationScheduler } from "../Scheduler/ConfigurationScheduler.tsx";
import { useGetEnvironmentDetails } from "../../../services/useGetEnvironmentDetails.ts";

export const ConfigurationUpdate = () => {
    const { synchronize } = useSynchronization();

    const { data, isLoading, error } = useGetEnvironmentDetails();

    return (
        <>
            {isLoading && <GlobalLoader />}
            {error && <Error errorMessage={error.detail} status={error.status} />}
            {!isLoading && !error && data && (
                <div className="space-y-8">
                    <div className="rounded-2xl bg-white p-4 shadow">
                        <h2 className="mb-4 text-center text-lg  font-semibold">Schedule Flow Execution</h2>
                        <ConfigurationScheduler />
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow">
                        <h2 className="mb-4 text-center text-lg  font-semibold">Environment Update</h2>
                        <EnvironmentUpdateForm environment={data} />
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow">
                        <h2 className="mb-8 text-center text-lg font-semibold">Git Repository Synchronization</h2>
                        <Tooltip
                            content="This button allows for a complete resynchronization of tests with the GitLab repository. This operation may take some time."
                            position="bottom"
                        >
                            <SynchronizationButton
                                synchronize={synchronize}
                                synchronizationLoading={data.synchronizationInProgress ?? false}
                            />
                        </Tooltip>
                    </div>
                </div>
            )}
        </>
    );
};
