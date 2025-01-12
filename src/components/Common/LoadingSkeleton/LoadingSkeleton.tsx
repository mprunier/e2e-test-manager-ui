export const LoadingSkeleton = () => {
    return (
        <div className="m-2 mb-4 animate-pulse rounded-3xl  border-2 p-2 shadow-md">
            <div className="min-w-full">
                {[...Array(5)].map((_, idx) => (
                    <div key={idx} className={`my-1 rounded-2xl p-4 ${idx % 2 === 0 ? "bg-blue-100" : "bg-blue-50"}`}>
                        <div className="h-2 rounded-2xl bg-gray-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
