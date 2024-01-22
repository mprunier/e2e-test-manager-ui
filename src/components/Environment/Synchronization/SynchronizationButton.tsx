import { keycloakUtils } from "../../../utils/Keycloak/keycloakUtils.ts";
import { Tooltip } from "../../Common/Tooltip/Tooltip.tsx";
import { LoadingSVG } from "../../../assets/images/LoadingSVG.tsx";

interface IParams {
    synchronize: () => void;
    synchronizationLoading: boolean;
}

export const SynchronizationButton = (props: IParams) => {
    const { synchronize, synchronizationLoading } = props;

    const isConnected = keycloakUtils.isAuthenticated();

    return (
        <div className="flex justify-center">
            <Tooltip
                content="You must be logged in to perform this action."
                position="bottom"
                disabled={isConnected}
                size={"w-80"}
            >
                <button
                    type="button"
                    onClick={synchronize}
                    disabled={synchronizationLoading || !isConnected}
                    className={`mr-2 inline-flex h-8 w-[120px] cursor-pointer items-center justify-center rounded-2xl text-center text-sm font-medium text-white focus:outline-none focus:ring-1 ${
                        synchronizationLoading || !isConnected
                            ? "cursor-not-allowed bg-gray-300"
                            : "bg-cyan-900 hover:bg-cyan-800 focus:ring-cyan-800"
                    }`}
                >
                    {synchronizationLoading ? (
                        <LoadingSVG size={6} />
                    ) : (
                        <>{synchronizationLoading ? "Synchronizing..." : " Synchronize"}</>
                    )}
                </button>
            </Tooltip>
        </div>
    );
};
