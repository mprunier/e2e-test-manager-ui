interface IParams {
    toggleChartModal(): void;
}

export const ChartSVG = (props: IParams) => {
    const { toggleChartModal } = props;
    return (
        <svg
            onClick={toggleChartModal}
            id="Layer_1"
            data-name="Layer 1"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 135.42 122.88"
            className="mr-6 mt-2 h-7 w-7 cursor-pointer text-cyan-800 hover:text-cyan-600"
        >
            <title>bar-chart</title>
            <path d="M65.62,14.08H85.85a2,2,0,0,1,2,2V95.56a2,2,0,0,1-2,2H65.62a2,2,0,0,1-2-2V16a2,2,0,0,1,2-2Zm69.8,108.8H9.93v0A9.89,9.89,0,0,1,0,113H0V0H12.69V110.19H135.42v12.69ZM103.05,53.8h20.23a2,2,0,0,1,2,2V95.56a2,2,0,0,1-2,2H103.05a2,2,0,0,1-2-2V55.75a2,2,0,0,1,2-2ZM28.19,29.44H48.42a2,2,0,0,1,1.95,1.95V95.56a2,2,0,0,1-1.95,2H28.19a2,2,0,0,1-2-2V31.39a2,2,0,0,1,2-1.95Z" />
        </svg>
    );
};
