interface IParams {
    value: boolean;
    onChange: (newValue: boolean) => void;
}

export const CheckBox = (props: IParams) => {
    const { value, onChange } = props;
    return <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />;
};
