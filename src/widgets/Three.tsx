import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const NeuralNetwork = React.lazy(() => import("./NeuralNetwork"));
export const Three: any = ({ loading, answer, stop, setStop }: any) => {
    return (
        <div
            className="mx-auto h-[410px] w-[410px] relative max-sm:w-[320px] max-sm:h-[320px] cursor-pointer"
            onClick={() => setStop((prev: boolean) => !prev)}>
            <Canvas camera={{ position: [0, 0, 17.5] }}>
                <Suspense fallback={<></>}>
                    <NeuralNetwork loading={loading} answer={answer} stop={stop} />
                </Suspense>
            </Canvas>
            {!loading && (
                <p className="text-[40px] max-sm:text-[30px] z-[9] text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    {answer}
                </p>
            )}
        </div>
    );
};
