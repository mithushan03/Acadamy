import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GPAChartProps {
  data: Array<{
    semester: number;
    sgpa: number;
  }>;
}

const GPAChart = ({ data }: GPAChartProps) => {
  // Sort semesters in ascending order
  const sortedData = [...data].sort((a, b) => a.semester - b.semester);
  const chartData = sortedData.map(item => ({
    semester: `Sem ${item.semester}`,
    SGPA: item.sgpa,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="semester" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            domain={[0, 4]}
            stroke="#666"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Line
            type="monotone"
            dataKey="SGPA"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#2563eb', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GPAChart;
