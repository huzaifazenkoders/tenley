"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

// ── Data ────────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Properties",
    value: "32",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 22.75H5C2.58 22.75 1.25 21.42 1.25 19V11C1.25 8.58 2.58 7.25 5 7.25H10C10.41 7.25 10.75 7.59 10.75 8V19C10.75 20.58 11.42 21.25 13 21.25C13.41 21.25 13.75 21.59 13.75 22C13.75 22.41 13.41 22.75 13 22.75ZM5 8.75C3.42 8.75 2.75 9.42 2.75 11V19C2.75 20.58 3.42 21.25 5 21.25H9.79999C9.43999 20.66 9.25 19.91 9.25 19V8.75H5Z"
          fill="#DB3E31"
        />
        <path
          d="M10 8.75H5C4.59 8.75 4.25 8.41 4.25 8V6C4.25 4.48 5.48 3.25 7 3.25H10.11C10.34 3.25 10.56 3.35998 10.7 3.53998C10.84 3.72998 10.89 3.97 10.83 4.19C10.77 4.41 10.75 4.66 10.75 5V8C10.75 8.41 10.41 8.75 10 8.75ZM5.75 7.25H9.25V5C9.25 4.91 9.25 4.83 9.25 4.75H7C6.31 4.75 5.75 5.31 5.75 6V7.25Z"
          fill="#DB3E31"
        />
        <path
          d="M14 13.75C13.59 13.75 13.25 13.41 13.25 13V8C13.25 7.59 13.59 7.25 14 7.25C14.41 7.25 14.75 7.59 14.75 8V13C14.75 13.41 14.41 13.75 14 13.75Z"
          fill="#DB3E31"
        />
        <path
          d="M18 13.75C17.59 13.75 17.25 13.41 17.25 13V8C17.25 7.59 17.59 7.25 18 7.25C18.41 7.25 18.75 7.59 18.75 8V13C18.75 13.41 18.41 13.75 18 13.75Z"
          fill="#DB3E31"
        />
        <path
          d="M18 22.75H14C13.59 22.75 13.25 22.41 13.25 22V18C13.25 17.04 14.04 16.25 15 16.25H17C17.96 16.25 18.75 17.04 18.75 18V22C18.75 22.41 18.41 22.75 18 22.75ZM14.75 21.25H17.25V18C17.25 17.86 17.14 17.75 17 17.75H15C14.86 17.75 14.75 17.86 14.75 18V21.25Z"
          fill="#DB3E31"
        />
        <path
          d="M6 17.75C5.59 17.75 5.25 17.41 5.25 17V13C5.25 12.59 5.59 12.25 6 12.25C6.41 12.25 6.75 12.59 6.75 13V17C6.75 17.41 6.41 17.75 6 17.75Z"
          fill="#DB3E31"
        />
        <path
          d="M19 22.75H13C10.58 22.75 9.25 21.42 9.25 19V5C9.25 2.58 10.58 1.25 13 1.25H19C21.42 1.25 22.75 2.58 22.75 5V19C22.75 21.42 21.42 22.75 19 22.75ZM13 2.75C11.42 2.75 10.75 3.42 10.75 5V19C10.75 20.58 11.42 21.25 13 21.25H19C20.58 21.25 21.25 20.58 21.25 19V5C21.25 3.42 20.58 2.75 19 2.75H13Z"
          fill="#DB3E31"
        />
      </svg>
    )
  },
  {
    label: "Active Staff",
    value: "60",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 18C22 18.75 21.79 19.46 21.42 20.06C21.21 20.42 20.94 20.74 20.63 21C19.93 21.63 19.01 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.74 14.58 15.61 15.5 14.88C16.19 14.33 17.06 14 18 14C20.21 14 22 15.79 22 18Z"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.4414 18.0005L17.4314 18.9905L19.5614 17.0205"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    label: "Active Tenants",
    value: "160",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.15859 10.87C9.05859 10.86 8.93859 10.86 8.82859 10.87C6.44859 10.79 4.55859 8.84 4.55859 6.44C4.55859 3.99 6.53859 2 8.99859 2C11.4486 2 13.4386 3.99 13.4386 6.44C13.4286 8.84 11.5386 10.79 9.15859 10.87Z"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.4112 4C18.3512 4 19.9112 5.57 19.9112 7.5C19.9112 9.39 18.4113 10.93 16.5413 11C16.4613 10.99 16.3713 10.99 16.2812 11"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.15875 14.56C1.73875 16.18 1.73875 18.82 4.15875 20.43C6.90875 22.27 11.4188 22.27 14.1688 20.43C16.5888 18.81 16.5888 16.17 14.1688 14.56C11.4288 12.73 6.91875 12.73 4.15875 14.56Z"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    label: "Active Emergencies",
    value: "4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 22H22"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6C7.03 6 3 10.03 3 15V22H21V15C21 10.03 16.97 6 12 6Z"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 2V3"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 4L5 5"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 4L19 5"
          stroke="#DB3E31"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

const requestTrendsData = [
  { month: "Jan", open: 10, inProgress: 8, completed: 14 },
  { month: "Feb", open: 12, inProgress: 10, completed: 16 },
  { month: "Mar", open: 8, inProgress: 9, completed: 18 },
  { month: "Apr", open: 14, inProgress: 11, completed: 17 },
  { month: "May", open: 15, inProgress: 12, completed: 20 },
  { month: "Jun", open: 11, inProgress: 9, completed: 22 },
  { month: "Jul", open: 9, inProgress: 7, completed: 19 },
  { month: "Aug", open: 13, inProgress: 10, completed: 21 },
  { month: "Sept", open: 16, inProgress: 13, completed: 24 },
  { month: "Oct", open: 12, inProgress: 11, completed: 20 },
  { month: "Nov", open: 10, inProgress: 8, completed: 18 },
  { month: "Dec", open: 7, inProgress: 6, completed: 15 }
];

const responseTimeData = [
  { week: "Week 1", responseTime: 22, completionTime: 48 },
  { week: "Week 2", responseTime: 18, completionTime: 42 },
  { week: "Week 3", responseTime: 25, completionTime: 50 },
  { week: "Week 4", responseTime: 20, completionTime: 45 }
];

const staffDistributionData = [
  { name: "Manager Supervisor", value: 20, color: "#10b981" },
  { name: "Maintenance Supervisor", value: 15, color: "#dc2626" },
  { name: "Maintenance Technician", value: 5, color: "#3b82f6" },
  { name: "Property Manager", value: 20, color: "#f59e0b" }
];

const ticketDistributionData = [
  { name: "Plumbing", value: 20, color: "#10b981" },
  { name: "Electrical", value: 15, color: "#dc2626" },
  { name: "Safety", value: 5, color: "#3b82f6" },
  { name: "General", value: 20, color: "#f59e0b" }
];

// ── Sub-components ───────────────────────────────────────────────────────────

const cardShadow =
  "shadow-[0px_5px_22px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(0,0,0,0.06)]";

const RequestTrendsTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 bg-white rounded-lg shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] flex flex-col gap-2">
      <span className="text-gray-800 text-xs font-semibold leading-4">
        {label}
      </span>
      <span className="text-brand-primary-red-600-d text-xs font-medium leading-4">
        Open: {payload[0]?.value}
      </span>
      <span className="text-Warning-Yellow-60 text-xs font-medium leading-4">
        In Progress: {payload[1]?.value}
      </span>
      <span className="text-Primary-Green-50 text-xs font-medium leading-4">
        Completed: {payload[2]?.value}
      </span>
    </div>
  );
};

const ResponseTimeTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2 bg-white rounded-lg shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] flex flex-col gap-2">
      <span className="text-gray-800 text-xs font-semibold leading-4">
        {label}
      </span>
      <span className="text-brand-primary-red-600-d text-xs font-medium leading-4">
        Response Time: {payload[0]?.value} hours
      </span>
      <span className="text-Primary-Green-50 text-xs font-medium leading-4">
        Completion Time: {payload[1]?.value} hours
      </span>
    </div>
  );
};

const PieLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
  color
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
      fontSize={11}
    >
      {value}
    </text>
  );
};

// ── Main component ───────────────────────────────────────────────────────────

const DashboardDataView = () => (
  <div className="flex flex-col gap-5">
    {/* Stat cards */}
    <div className="grid grid-cols-4 gap-5">
      {stats.map(({ label, value, icon }) => (
        <div
          key={label}
          className={`p-6 bg-brand-base-white rounded-xl ${cardShadow} flex flex-col gap-2.5`}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-brand-Text-500 text-xs font-normal leading-4">
                {label}
              </span>
              <span className="text-brand-Text-950-d text-2xl font-bold leading-8">
                {value}
              </span>
            </div>
            <div className="p-3 bg-brand-primary-red-50 rounded-full flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Charts row 1 */}
    <div className="grid grid-cols-2 gap-5">
      {/* Request Trends */}
      <div
        className={`p-5 bg-brand-base-white rounded-xl ${cardShadow} flex flex-col gap-5`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-brand-Text-950-d text-base font-semibold leading-5">
            Request Trends 2025
          </span>
          <span className="text-brand-Text-500 text-xs font-normal leading-4">
            Track requests over time for better planning
          </span>
        </div>
        <ResponsiveContainer width="100%" height={224}>
          <AreaChart
            data={requestTrendsData}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradOpen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DB3E31" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#DB3E31" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="rgba(15,23,42,0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "rgba(0,0,0,0.7)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              ticks={[0, 15, 30, 45]}
              tick={{ fontSize: 11, fill: "rgba(0,0,0,0.7)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<RequestTrendsTooltip />} />
            <Area
              type="monotone"
              dataKey="open"
              stroke="#DB3E31"
              strokeWidth={2}
              fill="url(#gradOpen)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="inProgress"
              stroke="#F59E0B"
              strokeWidth={2}
              fill="none"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#21AB70"
              strokeWidth={2}
              fill="none"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Response & Completion Time Trends */}
      <div
        className={`p-5 bg-brand-base-white rounded-xl ${cardShadow} flex flex-col gap-5`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-brand-Text-950-d text-base font-semibold leading-5">
            Response &amp; Completion Time Trends
          </span>
          <span className="text-brand-Text-500 text-xs font-normal leading-4">
            Average times in hours over the last 4 weeks
          </span>
        </div>
        <ResponsiveContainer width="100%" height={224}>
          <AreaChart
            data={responseTimeData}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradCompletion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="rgba(15,23,42,0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "rgba(0,0,0,0.7)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              ticks={[0, 15, 30, 45]}
              tick={{ fontSize: 11, fill: "rgba(0,0,0,0.7)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ResponseTimeTooltip />} />
            <Area
              type="monotone"
              dataKey="responseTime"
              stroke="#DB3E31"
              strokeWidth={2}
              fill="none"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="completionTime"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="url(#gradCompletion)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Charts row 2 */}
    <div className="grid grid-cols-2 gap-5">
      {/* Staff Distribution */}
      <div
        className={`p-5 bg-brand-base-white rounded-xl ${cardShadow} flex flex-col gap-2.5`}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-brand-Text-950-d text-base font-semibold leading-5">
            Staff Distribution by Role
          </span>
          <span className="text-brand-Text-500 text-xs font-normal leading-4">
            Team composition breakdown
          </span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={staffDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
            >
              {staffDistributionData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="44%"
              textAnchor="middle"
              dominantBaseline="central"
              className="font-semibold"
              fontSize={24}
              fill="rgba(0,0,0,0.9)"
            >
              60
            </text>
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color, fontSize: 11 }}>
                  {value}: {entry.payload.value}
                </span>
              )}
            />
            <Tooltip formatter={(value, name) => [value, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Ticket Distribution */}
      <div
        className={`p-5 bg-brand-base-white rounded-xl ${cardShadow} flex flex-col gap-2.5`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <span className="text-brand-Text-950-d text-base font-semibold leading-5">
              Ticket Distribution by Category
            </span>
            <span className="text-brand-Text-500 text-xs font-normal leading-4">
              Category composition breakdown
            </span>
          </div>
          <div className="min-h-9 px-3 py-1.5 bg-brand-base-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] outline outline-1 -outline-offset-1 outline-brand-Text-200 flex items-center gap-2">
            <span className="text-brand-Text-600 text-base font-normal leading-5">
              January
            </span>
            <svg className="size-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-Text-600"
              />
            </svg>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={ticketDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
            >
              {ticketDistributionData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="central"
              className="font-semibold"
              fontSize={24}
              fill="rgba(0,0,0,0.9)"
            >
              60
            </text>
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color, fontSize: 11 }}>
                  {value}: {entry.payload.value}
                </span>
              )}
            />
            <Tooltip formatter={(value, name) => [value, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default DashboardDataView;
