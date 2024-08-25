export const DifferenceBar = ({ width }: any) => {
    return (
        <div className="mt-[10px] flex w-full h-[10px] bg-[#5ac300] rounded">
            <div
                className="rounded-l"
                style={{
                    width: `${width}%`,
                    backgroundColor: "#0168af"
                }}></div>
        </div>
    );
};
