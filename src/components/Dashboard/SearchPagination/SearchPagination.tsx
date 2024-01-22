import { FC } from "react";
import {
    EConfigurationSuiteSortField,
    EConfigurationSuiteSortOrder,
} from "../../../interfaces/domain/IConfigurationSuite.tsx";

interface IParams {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    defaultValue: number;
    sortField: EConfigurationSuiteSortField;
    sortOrder: EConfigurationSuiteSortOrder;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    onSortFieldChange: (field: EConfigurationSuiteSortField) => void;
    onSortOrderChange: (order: EConfigurationSuiteSortOrder) => void;
}

const sortFieldLabels: Record<EConfigurationSuiteSortField, string> = {
    [EConfigurationSuiteSortField.FILE]: "File Name",
    [EConfigurationSuiteSortField.TITLE]: "Suite Title",
    [EConfigurationSuiteSortField.LAST_PLAYED_AT]: "Last Played",
};

const SortArrow: FC<{ order: EConfigurationSuiteSortOrder }> = ({ order }) => (
    <svg
        className={`h-5 w-5 ${order === EConfigurationSuiteSortOrder.DESC ? "rotate-180 transform" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
    </svg>
);

export const SearchPagination = (props: IParams) => {
    const {
        currentPage,
        totalPages,
        totalElements,
        defaultValue,
        sortField,
        sortOrder,
        onPageChange,
        onPageSizeChange,
        onSortFieldChange,
        onSortOrderChange,
    } = props;

    const pageSizeOptions = [5, 10, 20, 50, 100, 200];

    return (
        <div className="mx-8 my-8 flex items-center justify-between bg-white">
            <div className="text-sm text-gray-700">
                <span className="font-light">Total: {totalElements} results</span>
            </div>

            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex items-center space-x-2">
                    <select
                        value={sortField}
                        onChange={(e) => onSortFieldChange(e.target.value as EConfigurationSuiteSortField)}
                        className="h-9 w-32 rounded-md border-2 border-gray-200 pl-2 pr-2 text-sm"
                    >
                        {Object.values(EConfigurationSuiteSortField).map((field: EConfigurationSuiteSortField) => (
                            <option key={field} value={field}>
                                {sortFieldLabels[field]}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() =>
                            onSortOrderChange(
                                sortOrder === EConfigurationSuiteSortOrder.ASC
                                    ? EConfigurationSuiteSortOrder.DESC
                                    : EConfigurationSuiteSortOrder.ASC,
                            )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-gray-300 bg-white"
                    >
                        <SortArrow order={sortOrder} />
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <select
                    defaultValue={defaultValue}
                    id="pageSize"
                    name="pageSize"
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="mr-6 h-9 w-full rounded-md border-2 border-gray-300 pl-1"
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>

                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                            currentPage === 0 ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-50"
                        } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fillRule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                currentPage === page
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            } focus:z-20 focus:outline-offset-0`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                            currentPage === totalPages - 1
                                ? "cursor-not-allowed text-gray-400"
                                : "text-gray-700 hover:bg-gray-50"
                        } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    );
};
