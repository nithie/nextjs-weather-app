interface Props {
    temperature: number;
    windSpeed: number;
    humidity: number;
    visibility: number;
    date: string;
    time: string;
}

export const Card: React.FunctionComponent<Props> = ({ humidity, temperature, visibility, windSpeed, date, time }: Props) => {
    return (
        <div className="flex flex-col gap-2 justify-between mt-6 bg-white m-2 rounded-xl text-black p-6">
            <h6 className="text-center block">{date}</h6>
            <h1 className="text-center block">{time}</h1>
            <Metric
                label="Temperature"
                value={`${temperature.toFixed(1)} C`}
            />
            <Metric
                label="Wind"
                value={`${windSpeed.toFixed(1)} km / h`}
            />
            <Metric
                label="Humidity"
                value={`${humidity.toFixed(1)} %`}
            />
            <Metric
                label="Visibility"
                value={`${Math.floor(visibility / 1000) } km`}
            />
    </div>
    );
}

interface MetricProps {
    label: string;
    value: string;
}

const Metric: React.FunctionComponent<MetricProps> = ({label, value}: MetricProps) => {
    return <div className="flex flex-col items-center justify-center m-0">
        <div className="font-medium text-sm">{label}</div>
            <div className="text-sm text-gray-500">{value}</div>
    </div>
}