import { ChangeEvent } from "react";
import { SelectWithSearch } from "../../Common/SelectWithSearch/SelectWithSearch.tsx";
import { getStatusViewer } from "../../../utils/statusUtils.ts";
import { useGetSearchSelects } from "../../../services/useGetSearchSelects.ts";
import { EConfigurationStatus } from "../../../constants.ts";
import { ISelectOption } from "../../../interfaces/ISelectOption.tsx";
import {
    EConfigurationSuiteSortField,
    EConfigurationSuiteSortOrder,
} from "../../../interfaces/domain/IConfigurationSuite.tsx";

interface IParams {
    formValues: {
        configurationSuiteId: string;
        configurationTestId: string;
        configurationTestTag: string;
        status: string;
        file: string;
        allNotSuccess: boolean;
        page: number;
        size: number;
        sortField: EConfigurationSuiteSortField;
        sortOrder: EConfigurationSuiteSortOrder;
    };
    setFormValues: (newValues: Partial<IParams["formValues"]>) => void;
}

export const SearchBar = (props: IParams) => {
    const { formValues, setFormValues } = props;

    const {
        tagsData,
        tagsError,
        tagsLoading,
        filesData,
        filesError,
        filesLoading,
        suitesData,
        suitesError,
        suitesLoading,
        testsData,
        testsError,
        testsLoading,
    } = useGetSearchSelects();

    const handleAllNotSuccessChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setFormValues({
            configurationTestId: "",
            configurationSuiteId: "",
            file: "",
            configurationTestTag: "",
            allNotSuccess: checked,
            status: "",
            page: 0,
        });
    };

    const handleTagChange = (selectedOption: ISelectOption | null) => {
        setFormValues({
            configurationTestId: "",
            configurationSuiteId: "",
            file: "",
            configurationTestTag: selectedOption ? selectedOption.value.toString() : "",
            allNotSuccess: false,
            page: 0,
        });
    };

    const handleFileChange = (selectedOption: ISelectOption | null) => {
        setFormValues({
            file: selectedOption ? selectedOption.value.toString() : "",
            configurationTestId: "",
            configurationSuiteId: "",
            configurationTestTag: "",
            allNotSuccess: false,
            page: 0,
        });
    };

    const handleSuiteChange = (selectedOption: ISelectOption | null) => {
        setFormValues({
            configurationSuiteId: selectedOption ? selectedOption.value.toString() : "",
            configurationTestId: "",
            file: "",
            configurationTestTag: "",
            allNotSuccess: false,
            page: 0,
        });
    };

    const handleTestChange = (selectedOption: ISelectOption | null) => {
        setFormValues({
            configurationTestId: selectedOption ? selectedOption.value.toString() : "",
            configurationSuiteId: "",
            file: "",
            configurationTestTag: "",
            allNotSuccess: false,
            page: 0,
        });
    };

    const handleStatusChange = (selectedOption: ISelectOption | null) => {
        setFormValues({
            status: selectedOption ? selectedOption.value.toString() : "",
            allNotSuccess: false,
            page: 0,
        });
    };

    const tagsOptions =
        tagsData?.map((tag) => ({
            value: tag,
            label: tag,
        })) || [];
    const filesOptions =
        filesData?.map((file) => ({
            value: file,
            label: file,
        })) || [];
    const suitesOptions =
        suitesData?.map((suite) => ({
            value: suite.id.toString(),
            label: suite.title,
        })) || [];
    const testsOptions =
        testsData?.map((test) => ({
            value: test.id.toString(),
            label: test.title,
        })) || [];
    const statusOptions = Object.entries(EConfigurationStatus)
        .filter(([, value]) => value !== EConfigurationStatus.NEW)
        .map(([, value]) => ({
            value,
            label: getStatusViewer(value),
        }));

    return (
        <div className="mb-8 rounded-2xl bg-gray-50 p-2 pt-4 shadow-sm">
            <div className="mb-2 flex w-full justify-center">
                <div className="flex items-center">
                    <label className="relative mr-2 inline-block w-10">
                        <input
                            type="checkbox"
                            name="allNotSuccess"
                            checked={formValues.allNotSuccess}
                            onChange={handleAllNotSuccessChange}
                            className="toggle-checkbox absolute block h-5 w-5 cursor-pointer appearance-none rounded-full border-4 bg-white"
                            style={{
                                right: formValues.allNotSuccess ? "0" : "auto",
                                left: formValues.allNotSuccess ? "auto" : "0",
                            }}
                        />
                        <span
                            className="toggle-label block h-5 cursor-pointer overflow-hidden rounded-full bg-blue-300"
                            style={{ backgroundColor: formValues.allNotSuccess ? "#9db4da" : "#D1D5DB" }}
                        ></span>
                    </label>
                    <span className="text-sm font-medium text-gray-400">Only show unsuccessful tests</span>
                </div>
            </div>
            <div className="flex w-full justify-center space-x-8 p-4">
                <div className="w-2/12">
                    <SelectWithSearch
                        options={tagsOptions}
                        value={tagsOptions.find((opt) => opt.value === formValues.configurationTestTag)}
                        onChange={handleTagChange}
                        placeholder="Select tag..."
                        isLoading={tagsLoading}
                        isError={tagsError}
                    />
                </div>

                <div className="w-3/12">
                    <SelectWithSearch
                        options={suitesOptions}
                        value={suitesOptions.find((opt) => opt.value === formValues.configurationSuiteId)}
                        onChange={handleSuiteChange}
                        placeholder="Select Suite..."
                        isLoading={suitesLoading}
                        isError={suitesError}
                    />
                </div>

                <div className="w-3/12">
                    <SelectWithSearch
                        options={testsOptions}
                        value={testsOptions.find((opt) => opt.value === formValues.configurationTestId)}
                        onChange={handleTestChange}
                        placeholder="Select Test..."
                        isLoading={testsLoading}
                        isError={testsError}
                    />
                </div>

                <div className="w-2/12">
                    <SelectWithSearch
                        options={filesOptions}
                        value={filesOptions.find((opt) => opt.value === formValues.file)}
                        onChange={handleFileChange}
                        placeholder="Select File..."
                        isLoading={filesLoading}
                        isError={filesError}
                    />
                </div>

                <div className="w-2/12">
                    <SelectWithSearch
                        options={statusOptions}
                        value={statusOptions.find((opt) => opt.value === formValues.status)}
                        onChange={handleStatusChange}
                        placeholder="Select Suite Status..."
                    />
                </div>
            </div>
        </div>
    );
};
