import cn from "classnames";

export const FormFieldWrapper = (props: any) => {
    const { children, label, className, htmlFor } = props;
    return (
        <div className={cn("text-[16px] mb-[10px] relative", [className])}>
            <label htmlFor={htmlFor || ""} className="block mb-[5px]">
                {label}
            </label>
            {children}
        </div>
    );
};
