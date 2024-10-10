import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const NeuralNetwork = React.lazy(() => import("./NeuralNetwork"));
export const Three: any = ({ loading, answer }: any) => {
    return (
        <div
            className="mx-auto h-[410px] w-[410px] relative max-sm:w-[320px] max-sm:h-[320px]">
            <Canvas camera={{ position: [0, 0, 17.5] }}>
                <Suspense fallback={<></>}>
                    <NeuralNetwork loading={loading} answer={answer} />
                </Suspense>
            </Canvas>
        </div>
    );
};
