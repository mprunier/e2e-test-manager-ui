export const NotResults = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 text-gray-800">
                <img src="/images/noResult.png" className="h-16 w-16" />
            </div>
            <p className=" font-semibold text-gray-400">Sorry, your search did not find any results.</p>
        </div>
    );
};
