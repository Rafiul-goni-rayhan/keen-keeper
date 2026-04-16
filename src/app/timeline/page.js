"use client";

import { useEffect, useState } from "react";
import { FiPhone, FiMessageSquare, FiVideo } from "react-icons/fi";

export default function TimelinePage() {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // পেজ লোড হলে লোকাল স্টোরেজ থেকে ডাটা নিয়ে আসব
    const savedTimeline = JSON.parse(localStorage.getItem('timeline')) || [];
    setTimeline(savedTimeline);
  }, []);

  // আইকন সেট করার ফাংশন
  const getIcon = (type) => {
    if (type === 'Call') return <FiPhone className="text-xl text-[#244D3F]" />;
    if (type === 'Text') return <FiMessageSquare className="text-xl text-blue-500" />;
    if (type === 'Video') return <FiVideo className="text-xl text-red-500" />;
  };

  // Challenge C2: ডাটা ফিল্টার করার লজিক
  const filteredTimeline = filter === "All" 
    ? timeline 
    : timeline.filter(item => item.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Timeline</h1>
        
        <select 
          className="select select-bordered w-full sm:w-xs bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Interactions</option>
          <option value="Call">Calls Only</option>
          <option value="Text">Texts Only</option>
          <option value="Video">Videos Only</option>
        </select>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {filteredTimeline.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No interactions found. Go to a friend's profile and check in!</p>
          </div>
        ) : (
          filteredTimeline.map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
              <div className="bg-gray-50 p-4 rounded-full">
                {getIcon(entry.type)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{entry.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}