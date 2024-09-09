import cn from "classnames";

export const FormFieldWrapper = (props: any) => {
    const { children, label, className, htmlFor, labelClassName, labelOutside } = props;
    return (
        <div className={cn("text-[16px] relative", { "mb-[10px]": labelOutside }, [className])}>
            <label
                htmlFor={htmlFor || ""}
                className={cn(
                    "block rounded truncate max-w-[-webkit-fill-available]",
                    {
                        "leading-none bg-[#f7f7f7] px-[2px] max-sm:text-[9px] absolute top-[-5px] left-[7px]": !labelOutside,
                        "mb-[5px]": labelOutside
                    },
                    [labelClassName]
                )}>
                {label}
            </label>
            {children}
        </div>
    );
};
