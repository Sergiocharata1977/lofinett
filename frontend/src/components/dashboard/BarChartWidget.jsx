import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const BarChartWidget = ({ 
  title, 
  data, 
  dataKey,
  xAxisKey = "name",
  barColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
  height = 300,
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-soft p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }}
            />
            <Legend />
            {Array.isArray(dataKey) ? (
              dataKey.map((key, index) => (
                <Bar 
                  key={index}
                  dataKey={key.key} 
                  name={key.name}
                  fill={key.fill || barColors[index % barColors.length]} 
                  radius={[4, 4, 0, 0]}
                />
              ))
            ) : (
              <Bar 
                dataKey={dataKey} 
                fill={barColors[0]} 
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartWidget;
