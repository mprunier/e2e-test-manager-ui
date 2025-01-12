import Navbar from "./components/Navbar/Navbar.tsx";
import { AppRoutes } from "./Routes.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import { Snackbar } from "./components/Common/Snackbar/Snackbar.tsx";
import { useGetEnvironmentDetails } from "./services/useGetEnvironmentDetails.ts";

export const App = () => {
    useGetEnvironmentDetails();

    const renderApp = () => {
        return (
            <>
                <div className="flex h-screen flex-col items-center justify-center xl:hidden">
                    <p className="mt-4 text-center text-lg font-bold text-red-800">
                        Oops, not designed for little screens!
                    </p>
                    <img src="/images/lel.png" className="h-60 w-60" />
                </div>
                <div className="hidden xl:block">
                    <div className="flex min-h-screen flex-col bg-gray-100">
                        <Navbar />
                        <div className="flex flex-grow flex-col">
                            <div className="m-4 flex-grow rounded-lg">
                                <div className="mx-auto w-full p-4 md:justify-between">
                                    <AppRoutes />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
                <Snackbar />
            </>
        );
    };

    return <>{renderApp()}</>;
};
