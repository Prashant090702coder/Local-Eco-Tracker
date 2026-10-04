import React from 'react';
import { FaTrophy } from 'react-icons/fa';

const ProgressCard = ({ points = 0, goal = 200 }) => {
  const safePoints = Math.max(0, points);
  const percentage = Math.min(100, Math.round((safePoints / goal) * 100));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-base">
            <FaTrophy />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base">Eco Goal Progress</h3>
            <p className="text-xs text-slate-500">Target milestone: {goal} Points</p>
          </div>
        </div>
        <span className="text-lg font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/60 my-3">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Numerical Metrics */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Current: <strong className="text-slate-800">{safePoints} pts</strong></span>
        <span>Goal: <strong className="text-slate-800">{goal} pts</strong></span>
      </div>
      
      {percentage >= 100 ? (
        <p className="text-xs text-emerald-700 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 mt-3 font-medium text-center">
          🎉 Congratulations! You reached the 200 Eco Points Milestone!
        </p>
      ) : (
        <p className="text-xs text-slate-500 mt-3 text-center">
          {goal - safePoints} more points to reach your milestone. Keep going!
        </p>
      )}
    </div>
  );
};

export default ProgressCard;
