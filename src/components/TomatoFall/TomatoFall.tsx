import clsx from "clsx";
import cls from './TomatoFall.module.scss';
import { useMemo } from "react";

interface TomatoFallProps {
    isRunning: boolean;
    active?: boolean;
    className?: string;
}

export const TomatoFalls = (props: TomatoFallProps) => {
    const { isRunning, active, className } = props;

    if (!active) return null;

    function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    };

    const tomatosArray = useMemo(() => {
        return Array.from({ length: 80 }, (_, index) => {
            const duration = getRndInteger(5, 25);
            const delay = getRndInteger(0, 5);
            const rotations = getRndInteger(5, 30) / 10;
            const startLeft = getRndInteger(0, 100);
            const startTop = getRndInteger(-20, -10);

            return {
                id: index,
                duration,
                delay,
                rotations,
                startLeft,
                startTop,
            };
        });
    }, []);

    return (
        <div className={clsx(cls.tomatofall, className)}>
            {
                tomatosArray.map((t) => (
                    <img
                        key={t.id}
                        className={clsx(cls.tomato, { [cls.paused]: !isRunning })}
                        src="src/assets/images/tomato.png"
                        alt="tomato"
                        style={{
                            top: `${t.startTop}%`,
                            left: `${t.startLeft}%`,
                            animationDuration: `${t.duration}s`,
                            animationDelay: `${t.delay}s`,
                            ['--rotations' as any]: t.rotations,
                        }}
                    />
                ))
            }
        </div>
    )
}