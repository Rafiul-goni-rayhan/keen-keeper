"use client";

import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interactionsThisMonth, setInteractionsThisMonth] = useState(0);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("/friends.json");
        const data = await response.json();
        setTimeout(() => {
          setFriends(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching friends data:", error);
        setLoading(false);
      }
    };
    fetchFriends();

    const timeline = JSON.parse(localStorage.getItem('timeline')) || [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const recentInteractions = timeline.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });

    setInteractionsThisMonth(recentInteractions.length);
  }, []);

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case "overdue": return "bg-red-500 text-white";
      case "almost due": return "bg-amber-400 text-white";
      case "on-track": return "bg-primary text-white";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status.toLowerCase() === "on-track").length;
  const needAttentionCount = friends.filter(f => 
    f.status.toLowerCase() === "overdue" || f.status.toLowerCase() === "almost due"
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="btn bg-[#244D3F] text-white hover:bg-[#15352c] border-none rounded-md px-6">
          <FiPlus className="text-lg" /> Add a Friend
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <h3 className="text-4xl font-bold text-[#244D3F] mb-2">
            {loading ? "-" : totalFriends}
          </h3>
          <p className="text-sm text-gray-500 font-medium">Total Friends</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <h3 className="text-4xl font-bold text-[#244D3F] mb-2">
            {loading ? "-" : onTrackCount}
          </h3>
          <p className="text-sm text-gray-500 font-medium">On Track</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <h3 className="text-4xl font-bold text-[#244D3F] mb-2">
            {loading ? "-" : needAttentionCount}
          </h3>
          <p className="text-sm text-gray-500 font-medium">Need Attention</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
          <h3 className="text-4xl font-bold text-[#244D3F] mb-2">
            {interactionsThisMonth}
          </h3>
          <p className="text-sm text-gray-500 font-medium">Interactions This Month</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Friends</h2>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-[#244D3F]"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <Link 
                href={`/friend/${friend.id}`} 
                key={friend.id}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
              >
                <img src={friend.picture} alt={friend.name} className="w-20 h-20 rounded-full object-cover mb-4 shadow-sm" />
                <h3 className="font-bold text-gray-900 mb-1">{friend.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{friend.days_since_contact}d ago</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {friend.tags.map((tag, index) => (
                    <span key={index} className="text-[10px] uppercase font-bold tracking-wider bg-[#e6f4ea] text-primary px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${getStatusConfig(friend.status)}`}>
                  {friend.status}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}