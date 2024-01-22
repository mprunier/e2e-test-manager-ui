import { Fragment, useEffect, useState } from "react";
import { useSnackbarStore } from "../../../stores/useSnackbarStore.ts";
import { HiCheckCircle, HiExclamation, HiInformationCircle, HiOutlineX } from "react-icons/hi";

export const Snackbar = () => {
    const { snackbarMessage, snackbarMessageType, clearSnackbarMessage } = useSnackbarStore();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (snackbarMessage) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [snackbarMessage]);

    useEffect(() => {
        if (!show && snackbarMessage) {
            const timer = setTimeout(() => {
                clearSnackbarMessage();
            }, 500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [show, snackbarMessage, clearSnackbarMessage]);

    if (!snackbarMessage) return null;

    const messageTypeAttributes = {
        success: { icon: HiCheckCircle, color: "text-green-500 hover:text-green-600" },
        info: { icon: HiInformationCircle, color: "text-blue-500 hover:text-blue-600" },
        error: { icon: HiExclamation, color: "text-red-500 hover:text-red-600" },
        warning: { icon: HiExclamation, color: "text-yellow-500 hover:text-yellow-600" },
    };

    const { icon: MessageIcon, color } = messageTypeAttributes[snackbarMessageType ?? "info"];

    const messageSegments = snackbarMessage.split(". ").map((segment, index, array) => (
        <Fragment key={index}>
            {segment}
            {index < array.length - 1 ? "." : ""}
            <br />
        </Fragment>
    ));

    return (
        <div
            onClick={() => setShow(false)}
            className={`fixed bottom-6 right-0 transform transition-transform duration-1000 ${
                show ? "translate-x-0" : "translate-x-[150%]"
            } mx-6 flex max-w-md cursor-pointer items-center justify-between rounded-xl bg-gray-50 p-3 font-medium shadow-lg ${color}`}
        >
            <div className="mr-2 inline-flex items-center">
                <MessageIcon size="1.5em" />
            </div>
            <div className="mr-2 flex-1">{messageSegments}</div>
            <div className="pl-2">
                <HiOutlineX
                    size="1.5em"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShow(false);
                    }}
                />
            </div>
        </div>
    );
};
