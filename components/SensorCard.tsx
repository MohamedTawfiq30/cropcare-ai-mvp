type SensorCardProps = {
    title: string;
    value: string;
    status: string;
    statusColor?: string;
  };
  
  export default function SensorCard({
    title,
    value,
    status,
    statusColor = "text-green-600",
  }: SensorCardProps) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="  text-gray-600  text-3xl font-bold mt-2 ">{value}</p>
        <p className={`${statusColor} mt-1`}>
          Status: {status}
        </p>
      </div>
    );
  }
  