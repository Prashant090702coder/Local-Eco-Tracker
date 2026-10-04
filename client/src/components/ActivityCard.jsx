import React, { useState } from 'react';
import {
  FaTree,
  FaRecycle,
  FaBicycle,
  FaBus,
  FaTint,
  FaBolt,
  FaShoppingBag,
  FaLeaf,
  FaTrashAlt,
  FaTimes,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { getImageUrl } from '../services/api';

// Map activity titles to appropriate icons
const iconMap = {
  'Planted a Tree': FaTree,
  'Recycled Plastic': FaRecycle,
  'Cycled to College': FaBicycle,
  'Used Public Transport': FaBus,
  'Used Reusable Bottle': FaTint,
  'Saved Electricity': FaBolt,
  'Avoided Single-Use Plastic': FaShoppingBag,
};

const ActivityCard = ({ activity, onDelete }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const IconComponent = iconMap[activity.activity] || FaLeaf;
  const imageUrl = getImageUrl(activity.image);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center text-xl shrink-0 border border-emerald-200/60">
            <IconComponent />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-slate-800 text-base truncate">
                {activity.activity}
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                +{activity.points} pts
              </span>
            </div>
            <p className="text-slate-600 text-sm mt-0.5 break-words line-clamp-2">
              {activity.description}
            </p>
            <span className="text-[11px] text-slate-400 block mt-1">
              {formatDate(activity.createdAt)}
            </span>
          </div>
        </div>

        {/* Image Thumbnail & Actions */}
        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          {imageUrl && (
            <div
              onClick={() => setShowImageModal(true)}
              className="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden border border-emerald-200 shadow-2xs hover:opacity-90 transition"
              title="Click to view photo"
            >
              <img
                src={imageUrl}
                alt={activity.activity}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
                <FaExternalLinkAlt />
              </div>
            </div>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(activity._id)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition text-sm cursor-pointer"
              title="Delete activity record"
            >
              <FaTrashAlt />
            </button>
          )}
        </div>
      </div>

      {/* Full Resolution Photo Modal */}
      {showImageModal && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-slate-100"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">
                Proof of Action: {activity.activity}
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-3 bg-slate-950 flex items-center justify-center">
              <img
                src={imageUrl}
                alt="Proof"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="p-4 bg-slate-50 text-xs text-slate-600">
              <p><strong>Note:</strong> {activity.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityCard;
