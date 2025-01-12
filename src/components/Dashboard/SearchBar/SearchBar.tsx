import { ChangeEvent } from "react";
import { SelectWithSearch } from "../../Common/SelectWithSearch/SelectWithSearch";
import { getStatusViewer } from "../../../utils/statusUtils";
import { useGetSearchSelects } from "../../../services/useGetSearchSelects";
import {
    ConfigurationStatus,
    SearchSuiteConfigurationSortField,
    SearchSuiteConfigurationSortOrder,
} from "../../../api";
import { ISelectOption } from "../../../interfaces/ISelectOption.tsx";

interface IParams {
    formValues: {
        configurationSuiteId: string;
        configurationTestId: string;
        tag: string;
        status: string;
        file: string;
        allNotSuccess: boolean;
        page: number;
        size: number;
        sortField: SearchSuiteConfigurationSortField;
        sortOrder: SearchSuiteConfigurationSortOrder;
    };
    setFormValues: (newValues: Partial<IParams["formValues"]>) => void;
}

export const SearchBar = (props: IParams) => {
    const { formValues, setFormValues } = props;

    const { criteriaData, criteriaError, criteriaLoading } = useGetSearchSelects();

    const handleAllNotSuccessChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setFormValues({
            configurationTestId: "",
            configurationSuiteId: "",
            file: "",
            tag: "",
            allNotSuccess: checked,
            status: "",
            page: 0,
        });
    };

    const handleSelectChange = (field: keyof typeof formValues) => (selectedOption: ISelectOption | null) => {
        setFormValues({
            ...(field !== "status" && {
                configurationTestId: "",
                configurationSuiteId: "",
                file: "",
                tag: "",
            }),
            [field]: selectedOption ? selectedOption.value.toString() : "",
            allNotSuccess: false,
            page: 0,
        });
    };

    const tagsOptions: ISelectOption[] =
        criteriaData?.tags?.reduce<ISelectOption[]>((acc, tag) => {
            if (tag.value) {
                acc.push({ value: tag.value, label: tag.value });
            }
            return acc;
        }, []) ?? [];

    const filesOptions: ISelectOption[] =
        criteriaData?.files?.reduce<ISelectOption[]>((acc, file) => {
            if (file.value) {
                acc.push({ value: file.value, label: file.value });
            }
            return acc;
        }, []) ?? [];

    const suitesOptions: ISelectOption[] =
        criteriaData?.suites?.reduce<ISelectOption[]>((acc, suite) => {
            if (suite.value && suite.label) {
                acc.push({ value: suite.value, label: suite.label });
            }
            return acc;
        }, []) ?? [];

    const testsOptions: ISelectOption[] =
        criteriaData?.tests?.reduce<ISelectOption[]>((acc, test) => {
            if (test.value && test.label) {
                acc.push({ value: test.value, label: test.label });
            }
            return acc;
        }, []) ?? [];

    const statusOptions: ISelectOption[] = Object.values(ConfigurationStatus).map((value) => ({
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
                        value={tagsOptions.find((opt) => opt.value === formValues.tag) ?? null}
                        onChange={handleSelectChange("tag")}
                        placeholder="Select tag..."
                        noOptionPlaceholder="No tags found..."
                        isLoading={criteriaLoading}
                        isError={criteriaError}
                    />
                </div>

                <div className="w-3/12">
                    <SelectWithSearch
                        options={suitesOptions}
                        value={suitesOptions.find((opt) => opt.value === formValues.configurationSuiteId) ?? null}
                        onChange={handleSelectChange("configurationSuiteId")}
                        placeholder="Select Suite..."
                        noOptionPlaceholder="No suite found..."
                        isLoading={criteriaLoading}
                        isError={criteriaError}
                    />
                </div>

                <div className="w-3/12">
                    <SelectWithSearch
                        options={testsOptions}
                        value={testsOptions.find((opt) => opt.value === formValues.configurationTestId) ?? null}
                        onChange={handleSelectChange("configurationTestId")}
                        placeholder="Select Test..."
                        noOptionPlaceholder="No test found..."
                        isLoading={criteriaLoading}
                        isError={criteriaError}
                    />
                </div>

                <div className="w-2/12">
                    <SelectWithSearch
                        options={filesOptions}
                        value={filesOptions.find((opt) => opt.value === formValues.file) ?? null}
                        onChange={handleSelectChange("file")}
                        placeholder="Select File..."
                        noOptionPlaceholder="No file found..."
                        isLoading={criteriaLoading}
                        isError={criteriaError}
                    />
                </div>

                <div className="w-2/12">
                    <SelectWithSearch
                        options={statusOptions}
                        value={statusOptions.find((opt) => opt.value === formValues.status) ?? null}
                        onChange={handleSelectChange("status")}
                        placeholder="Select Status..."
                        isLoading={criteriaLoading}
                        isError={criteriaError}
                    />
                </div>
            </div>
        </div>
    );
};
