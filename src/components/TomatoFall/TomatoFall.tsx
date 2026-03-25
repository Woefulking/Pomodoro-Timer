import clsx from "clsx";
import cls from './TomatoFall.module.scss';

export const TomatoFalls = () => {
    function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    };

    const tomatosArray = Array.from({ length: 80 }, (_, index) => {
        const duration = getRndInteger(5, 25);
        const delay = getRndInteger(0, 5);
        const rotations = getRndInteger(5, 30) / 10;
        const startLeft = getRndInteger(0, 100);
        const startTop = getRndInteger(-20, -10);

        return (
            <img
                className={clsx(cls.tomato)}
                src="src/assets/images/tomato.png"
                alt="tomato"
                key={index}
                style={{
                    top: `${startTop}%`,
                    left: `${startLeft}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    ['--rotations' as any]: rotations,
                }}
            />
        );
    });

    return (
        <div className={clsx(cls.tomatofall)}>
            {tomatosArray}
        </div>
    )
}