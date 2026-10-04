import React from 'react';
import { FaTree, FaRecycle, FaBicycle, FaTrophy, FaLock, FaCheckCircle } from 'react-icons/fa';

const iconLookup = {
  tree: FaTree,
  recycle: FaRecycle,
  travel: FaBicycle,
  warrior: FaTrophy,
};

const AchievementCard = ({ title, description, iconType, isUnlocked, requirementText }) => {
  const IconComponent = iconLookup[iconType] || FaTrophy;

  return (
    <div
      className={`rounded-2xl p-5 border transition ${
        isUnlocked
          ? 'bg-gradient-to-br from-white to-emerald-50/50 border-emerald-200/80 shadow-xs'
          : 'bg-slate-50/70 border-slate-200 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
            isUnlocked
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-xs'
              : 'bg-slate-200 text-slate-400'
          }`}
        >
          <IconComponent />
        </div>
        <div>
          {isUnlocked ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <FaCheckCircle className="text-emerald-600" />
              <span>Unlocked</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-200 text-slate-600">
              <FaLock className="text-slate-400" />
              <span>Locked</span>
            </span>
          )}
        </div>
      </div>

      <h4 className="font-bold text-slate-800 text-base mb-1">
        {title}
      </h4>
      <p className="text-slate-600 text-xs leading-relaxed mb-3">
        {description}
      </p>

      {requirementText && (
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
          Requirement: {requirementText}
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
