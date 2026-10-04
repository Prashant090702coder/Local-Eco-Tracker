import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf,
  FaFilter,
  FaPlus,
  FaArrowLeft,
  FaExclamationCircle,
} from 'react-icons/fa';
import ActivityCard from '../components/ActivityCard';
import { activityService, ECO_ACTIVITIES } from '../services/api';

const Activities = ({ onUpdatePoints }) => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await activityService.getMyActivities();
      setActivities(data.activities || []);
      setFilteredActivities(data.activities || []);
      if (onUpdatePoints && data.ecoPoints !== undefined) {
        onUpdatePoints(data.ecoPoints);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to fetch your activity records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Filter effect
  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(
        activities.filter((act) => act.activity === selectedFilter)
      );
    }
  }, [selectedFilter, activities]);

  // Handle Delete
  const handleDeleteActivity = async (id) => {
    if (!window.confirm('Are you sure you want to remove this activity record? Associated points will be deducted.')) {
      return;
    }

    try {
      const res = await activityService.deleteActivity(id);
      setDeleteMsg(res.message || 'Activity removed successfully.');
      setTimeout(() => setDeleteMsg(''), 3000);
      fetchActivities();
    } catch (err) {
      console.error(err);
      alert('Failed to delete activity. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-slate-500 text-xs font-semibold">
            <Link to="/dashboard" className="hover:text-emerald-600 flex items-center gap-1">
              <FaArrowLeft className="text-[10px]" />
              <span>Dashboard</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800">Activity History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Activity History
          </h1>
          <p className="text-slate-500 text-sm">
            Complete record of your logged sustainable actions and earned points
          </p>
        </div>

        <Link
          to="/add-activity"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-xs transition self-start sm:self-auto cursor-pointer"
        >
          <FaPlus className="text-xs" />
          <span>Add New Activity</span>
        </Link>
      </div>

      {/* Delete Feedback Toast */}
      {deleteMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl">
          {deleteMsg}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
          <FaFilter className="text-emerald-600" />
          <span>Filter by type:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              selectedFilter === 'All'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({activities.length})
          </button>
          {ECO_ACTIVITIES.map((act) => (
            <button
              key={act.id}
              onClick={() => setSelectedFilter(act.title)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedFilter === act.title
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {act.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area: Loading / Error / Empty / List */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 border border-slate-200/80 text-center text-slate-400 space-y-3">
          <svg className="animate-spin h-8 w-8 text-emerald-600 mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-sm">Retrieving your activity log...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaExclamationCircle className="text-red-500 text-xl shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button
            onClick={fetchActivities}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
          >
            Retry
          </button>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <FaLeaf />
          </div>
          <h3 className="font-bold text-slate-700 text-lg">
            {selectedFilter === 'All' ? 'No Activities Recorded Yet' : `No records for "${selectedFilter}"`}
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            {selectedFilter === 'All'
              ? 'Start contributing to a greener community by logging your first eco-friendly action.'
              : 'Try clearing the filter to see all your logged activities.'}
          </p>
          {selectedFilter === 'All' ? (
            <Link
              to="/add-activity"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition"
            >
              <FaPlus className="text-xs" />
              <span>Record Activity</span>
            </Link>
          ) : (
            <button
              onClick={() => setSelectedFilter('All')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition"
            >
              Clear Filter
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredActivities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              onDelete={handleDeleteActivity}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;
