"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function StatsPage() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে টাইমলাইনের ডাটা নিয়ে আসা
    const timeline = JSON.parse(localStorage.getItem("timeline")) || [];

    // কোন টাইপের ইন্টারঅ্যাকশন কতবার হয়েছে তার হিসাব বের করা
    let callCount = 0;
    let textCount = 0;
    let videoCount = 0;

    timeline.forEach((entry) => {
      if (entry.type === "Call") callCount++;
      if (entry.type === "Text") textCount++;
      if (entry.type === "Video") videoCount++;
    });

    // Recharts-এর জন্য ডাটা ফরম্যাট করা
    const formattedData = [
      { name: "Call", value: callCount },
      { name: "Text", value: textCount },
      { name: "Video", value: videoCount },
    ];

    // যদি কোনো ডাটা না থাকে, তাহলে চার্ট দেখানোর দরকার নেই
    setChartData(formattedData.filter(data => data.value > 0));
    setLoading(false);
  }, []);

  // চার্টের রং (ফিগমা এবং আমাদের আইকনের রঙের সাথে মিল রেখে)
  const COLORS = ["#1f4b3f", "#3b82f6", "#ef4444"]; 

  // কাস্টম লিজেন্ড (নিচের লেবেলগুলো) ডিজাইন করার জন্য
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
                  innerRadius={90}  // ভেতরের ফাঁকা অংশের সাইজ
                  outerRadius={130} // চার্টের সাইজ
                  paddingAngle={5}  // স্লাইসগুলোর মাঝের ফাঁকা জায়গা
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