import cn from "classnames";

export const FormFieldWrapper = (props: any) => {
    const { children, label, className, htmlFor, labelClassName, labelOutside, labelNone } = props;
    return (
        <div className={cn("text-[16px] relative", { "mb-[10px]": labelOutside }, [className])}>
            {!labelNone && (
                <label
                    htmlFor={htmlFor || ""}
                    className={cn(
                        "block rounded truncate max-w-[-webkit-fill-available]",
                        {
                            "leading-none bg-[#fbfbfb] px-[2px] text-[14px] max-sm:top-[-7px] max-sm:text-[12px] absolute top-[-8px] left-[7px]":
                                !labelOutside,
                            "mb-[5px]": labelOutside
                        },
                        [labelClassName]
                    )}>
                    {label}
                </label>
            )}
            {children}
        </div>
    );
};
