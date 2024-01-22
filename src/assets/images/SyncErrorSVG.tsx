interface IParams {
    pointer: boolean;
    errorsCount: number;
}

export const SyncErrorSVG = (props: IParams) => {
    const { pointer, errorsCount } = props;

    return (
        <svg
            fill="currentColor"
            className={`ml-12 mt-0 h-6 w-6 ${pointer ? "cursor-pointer" : ""} ${
                errorsCount > 0 ? "text-red-100" : "text-gray-100"
            } hover:text-white`}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                    <path d="M44,5.1V14a2,2,0,0,1-2,2H33a2,2,0,0,1-2-2.3A2.1,2.1,0,0,1,33.1,12h4.3A18,18,0,0,0,6.1,22.2a2,2,0,0,1-2,1.8h0a2,2,0,0,1-2-2.2A22,22,0,0,1,40,8.9V5a2,2,0,0,1,2.3-2A2.1,2.1,0,0,1,44,5.1Z" />
                    <path d="M4,42.9V34a2,2,0,0,1,2-2h9a2,2,0,0,1,2,2.3A2.1,2.1,0,0,1,14.9,36H10.6A18,18,0,0,0,41.9,25.8a2,2,0,0,1,2-1.8h0a2,2,0,0,1,2,2.2A22,22,0,0,1,8,39.1V43a2,2,0,0,1-2.3,2A2.1,2.1,0,0,1,4,42.9Z" />
                    <path d="M24,28a2,2,0,0,0,2-2V16a2,2,0,0,0-4,0V26A2,2,0,0,0,24,28Z" />
                    <circle cx="24" cy="32" r="2" />
                </g>
            </g>
        </svg>
    );
};
