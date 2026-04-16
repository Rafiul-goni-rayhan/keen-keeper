"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function StatsPage() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeline = JSON.parse(localStorage.getItem("timeline")) || [];

    let callCount = 0;
    let textCount = 0;
    let videoCount = 0;

    timeline.forEach((entry) => {
      if (entry.type === "Call") callCount++;
      if (entry.type === "Text") textCount++;
      if (entry.type === "Video") videoCount++;
    });

    const formattedData = [
      { name: "Call", value: callCount },
      { name: "Text", value: textCount },
      { name: "Video", value: videoCount },
    ];

    setChartData(formattedData.filter(data => data.value > 0));
    setLoading(false);
  }, []);

  const COLORS = ["#1f4b3f", "#3b82f6", "#ef4444"]; 

  const renderLegendText = (value, entry) => {
    return <span className="text-gray-700 font-medium ml-1">{value}</span>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Friendship Analytics</h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-8">By Interaction Type</h2>

        {chartData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No interaction data available. Make some calls or texts to see the analytics!
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90} 
                  outerRadius={130} 
                  paddingAngle={5}  
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={renderLegendText}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

    </div>
  );
}