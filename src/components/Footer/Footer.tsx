import pkg from "../../../package.json";

export const Footer = () => {
    const APP_VERSION = pkg.version;
    return (
        <footer className="flex w-full items-center justify-center">
            <div className="p-4">
                <span className="text-center text-sm text-gray-400">
                    © 2024 By Maxime Prunier - Version {APP_VERSION}
                </span>
            </div>
        </footer>
    );
};
