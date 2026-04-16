"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiPhone, FiMessageSquare, FiVideo, FiClock, FiArchive, FiTrash2 } from "react-icons/fi";
import { Toaster, toast } from 'react-hot-toast';

export default function FriendDetailsPage() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendDetails = async () => {
      try {
        const response = await fetch("/friends.json");
        const data = await response.json();
        // ইউআরএল থেকে পাওয়া আইডি দিয়ে নির্দিষ্ট বন্ধুকে খুঁজে বের করা
        const foundFriend = data.find((f) => f.id.toString() === id);
        setFriend(foundFriend);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friend data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchFriendDetails();
    }
  }, [id]);

  const getStatusConfig = (status) => {
    if (!status) return "bg-gray-200 text-gray-700";
    switch (status.toLowerCase()) {
      case "overdue":
        return "bg-red-500 text-white";
      case "almost due":
        return "bg-amber-400 text-white";
      case "on-track":
        return "bg-primary text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // বাটন ক্লিক হ্যান্ডলার ও টোস্ট নোটিফিকেশন
   // বাটন ক্লিক হ্যান্ডলার, টোস্ট নোটিফিকেশন এবং লোকাল স্টোরেজে সেভ করা
  const handleInteraction = (type) => {
    // ১. টোস্ট দেখানো
    toast.success(`${type} with ${friend?.name} recorded!`, {
      style: {
        border: '1px solid #1f4b3f',
        padding: '16px',
        color: '#1f4b3f',
      },
      iconTheme: {
        primary: '#1f4b3f',
        secondary: '#FFFAEE',
      },
    });

    // ২. নতুন টাইমলাইন এন্ট্রি তৈরি করা
    const newEntry = {
      id: Date.now(), // ইউনিক আইডি
      friendId: friend.id,
      type: type, // Call, Text, or Video
      title: `${type} with ${friend.name}`,
      date: new Date().toISOString(),
    };

    // ৩. লোকাল স্টোরেজে সেভ করা (যাতে টাইমলাইন পেজে দেখাতে পারি)
    const existingTimeline = JSON.parse(localStorage.getItem('timeline')) || [];
    const updatedTimeline = [newEntry, ...existingTimeline]; // নতুনটা সবার উপরে থাকবে
    localStorage.setItem('timeline', JSON.stringify(updatedTimeline));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-500">Friend not found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Toaster position="top-right" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Friend Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm"
            />
            <h2 className="text-xl font-bold text-gray-900 mb-2">{friend.name}</h2>
            
            <div className={`text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4 ${getStatusConfig(friend.status)}`}>
              {friend.status}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {friend.tags?.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-[10px] uppercase font-bold tracking-wider bg-[#e6f4ea] text-primary px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500 italic mb-2">"{friend.bio}"</p>
            <p className="text-xs text-gray-400 mb-8">Preferred: {friend.email}</p>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
              <button className="w-full py-2.5 flex justify-center items-center gap-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <FiClock /> Snooze 2 Weeks
              </button>
              <button className="w-full py-2.5 flex justify-center items-center gap-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <FiArchive /> Archive
              </button>
              <button className="w-full py-2.5 flex justify-center items-center gap-2 border border-red-100 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Quick Check-in */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{friend.days_since_contact}</h3>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Days Since Contact</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{friend.goal}</h3>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Goal (Days)</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {new Date(friend.next_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h3>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Next Due</p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Relationship Goal</h3>
              <p className="text-sm text-gray-500">Connect every <span className="font-bold text-gray-900">{friend.goal} days</span></p>
            </div>
            <button className="px-4 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Edit
            </button>
          </div>

          {/* Quick Check-In Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleInteraction('Call')}
                className="py-4 flex flex-col justify-center items-center gap-2 border border-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all"
              >
                <FiPhone className="text-xl text-gray-500" /> Call
              </button>
              <button 
                onClick={() => handleInteraction('Text')}
                className="py-4 flex flex-col justify-center items-center gap-2 border border-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all"
              >
                <FiMessageSquare className="text-xl text-gray-500" /> Text
              </button>
              <button 
                onClick={() => handleInteraction('Video')}
                className="py-4 flex flex-col justify-center items-center gap-2 border border-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all"
              >
                <FiVideo className="text-xl text-gray-500" /> Video
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}