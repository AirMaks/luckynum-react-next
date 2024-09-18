import React, { useRef, useEffect } from "react";

interface TireProps {
    width: number;
    diameter: number;
    profile: number;
}

interface TireCanvasProps {
    oldTire: TireProps;
    newTire: TireProps;
    tireImageSrc: string;
}

const TireCanvas: React.FC<TireCanvasProps> = ({ oldTire, newTire, tireImageSrc }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const inchToMm = 25.4;

    // Рассчитываем физический диаметр и профиль шины (в мм)
    const oldTireFullDiameter = oldTire.diameter * inchToMm + 2 * ((oldTire.profile / 100) * oldTire.width);
    const newTireFullDiameter = newTire.diameter * inchToMm + 2 * ((newTire.profile / 100) * newTire.width);

    const maxSize = Math.max(oldTireFullDiameter, newTireFullDiameter);
    const minSize = Math.min(oldTireFullDiameter, newTireFullDiameter);

    // Фиксированная ширина для самой большой шины — 230 пикселей
    const maxTireWidth = 230;

    // Рассчитываем пропорциональную ширину для меньшей шины
    const minTireWidth = (minSize / maxSize) * maxTireWidth;

    // Если старая шина больше или равна по размеру новой, она получает 230 пикселей, а новая — пропорциональную
    const oldTireWidth = oldTireFullDiameter >= newTireFullDiameter ? maxTireWidth : minTireWidth;

    // Если новая шина больше или равна по размеру старой, она получает 230 пикселей, а старая — пропорциональную
    const newTireWidth = newTireFullDiameter >= oldTireFullDiameter ? maxTireWidth : minTireWidth;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const image = new Image();
        image.src = tireImageSrc;
        image.onload = () => {
            const height = Math.max(oldTireWidth, newTireWidth);

            const profileHeightOld = (oldTire.profile / 100) * oldTireWidth * 0.25;
            const profileHeightNew = (newTire.profile / 100) * newTireWidth * 0.25;

            context.clearRect(0, 0, canvas.width, canvas.height);

            // Отрисовка старой и новой шины
            context.drawImage(image, 50, 0, oldTireWidth, oldTireWidth);
            context.drawImage(image, oldTireWidth + 130, 0, newTireWidth, newTireWidth);

            // Пунктирные линии для старой шины
            context.setLineDash([5, 5]);
            context.beginPath();

            // профиль старой шины
            context.moveTo(50, 1);
            context.lineTo(oldTireWidth + 50, 1);
            context.moveTo(50, profileHeightOld);
            context.lineTo(oldTireWidth + 50, profileHeightOld);
            context.stroke();

            // профиль новой шины
            context.moveTo(oldTireWidth + 130, 1);
            context.lineTo(oldTireWidth + newTireWidth + 130, 1);
            context.moveTo(oldTireWidth + 130, profileHeightNew - 6);
            context.lineTo(oldTireWidth + newTireWidth + 130, profileHeightNew - 6);
            context.stroke();

            // Текст для старой шины
            context.setLineDash([]);
            context.font = "12px Arial";
            context.fillStyle = "black";
            context.fillText(`Диаметр: ${oldTireFullDiameter.toFixed(2)} мм`, 5, height - profileHeightOld - 10);
            context.fillText(`Профиль: ${((oldTire.profile / 100) * oldTire.width).toFixed(2)} мм`, 5, height - profileHeightOld - 25);

            // Текст для новой шины
            context.fillText(`Диаметр: ${newTireFullDiameter.toFixed(2)} мм`, oldTireWidth + 135, height - profileHeightNew - 10);
            context.fillText(
                `Профиль: ${((newTire.profile / 100) * newTire.width).toFixed(2)} мм`,
                oldTireWidth + 135,
                height - profileHeightNew - 25
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tireImageSrc, newTireWidth, oldTireWidth]);

    const height = Math.max(oldTireWidth, newTireWidth);

    return <canvas ref={canvasRef} width={oldTireWidth + newTireWidth + 170} height={height}></canvas>;
};

export default TireCanvas;
