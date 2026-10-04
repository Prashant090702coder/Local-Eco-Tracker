import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf,
  FaCheckCircle,
  FaMedal,
  FaPlus,
  FaArrowRight,
  FaExclamationCircle,
} from 'react-icons/fa';
import StatCard from '../components/StatCard';
import ProgressCard from '../components/ProgressCard';
import ActivityCard from '../components/ActivityCard';
import AchievementCard from '../components/AchievementCard';
import { activityService } from '../services/api';

const Dashboard = ({ user, onUpdatePoints }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch activities from backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await activityService.getMyActivities();
      setActivities(data.activities || []);
      if (onUpdatePoints && data.ecoPoints !== undefined) {
        onUpdatePoints(data.ecoPoints);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load activities from server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute live user stats from MongoDB data
  const totalPoints = user?.ecoPoints ?? 0;
  const activityCount = activities.length;

  // Calculate Level (Level 1: 0-49, Level 2: 50-99, Level 3: 100-199, Level 4: 200+)
  const calculateLevel = (pts) => {
    if (pts >= 200) return 4;
    if (pts >= 100) return 3;
    if (pts >= 50) return 2;
    return 1;
  };

  // Determine Primary Badge
  const calculateBadge = (pts) => {
    if (pts >= 200) return 'Eco Warrior';
    if (pts >= 100) return 'Eco Champion';
    if (pts >= 50) return 'Green Advocate';
    return 'Green Starter';
  };

  const currentLevel = calculateLevel(totalPoints);
  const currentBadge = calculateBadge(totalPoints);

  // Compute Achievements based on real user actions
  const hasPlantedTree = activities.some((act) => act.activity === 'Planted a Tree');
  const hasRecycled = activities.some((act) =>
    act.activity.toLowerCase().includes('recycle')
  );
  const hasTravelledGreen = activities.some(
    (act) =>
      act.activity === 'Cycled to College' ||
      act.activity === 'Used Public Transport'
  );
  const hasReachedGoal = totalPoints >= 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* WELCOME BANNER */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase">
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {user?.name || 'Eco Champion'}! 👋
          </h1>
          <p className="text-emerald-100 text-sm max-w-xl">
            Track your environmental contribution and make the world greener.
          </p>
        </div>

        <Link
          to="/add-activity"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow-xs transition self-start md:self-auto cursor-pointer"
        >
          <FaPlus />
          <span>Add Activity</span>
        </Link>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Eco Points"
          value={totalPoints}
          subtitle="Total points earned"
          icon={FaLeaf}
          color="emerald"
        />
        <StatCard
          title="Activities"
          value={activityCount}
          subtitle="Actions completed"
          icon={FaCheckCircle}
          color="blue"
        />
        <StatCard
          title="Current Level"
          value={`Level ${currentLevel}`}
          subtitle="Progression tier"
          icon={FaMedal}
          color="amber"
        />
        <StatCard
          title="Primary Badge"
          value={currentBadge}
          subtitle="Current status"
          icon={FaMedal}
          color="purple"
        />
      </div>

      {/* ECO PROGRESS CARD */}
      <div>
        <ProgressCard points={totalPoints} goal={200} />
      </div>

      {/* ERROR BANNER IF FETCH FAILED */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FaExclamationCircle className="text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="text-xs font-bold underline hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* TWO COLUMN GRID: RECENT ACTIVITIES & ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* RECENT ACTIVITIES (8 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Recent Activities</h2>
              <p className="text-slate-500 text-xs">Your latest logged eco actions</p>
            </div>
            {activities.length > 0 && (
              <Link
                to="/activities"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>View All</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            )}
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center text-slate-400 space-y-2">
              <svg className="animate-spin h-6 w-6 text-emerald-600 mx-auto" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-xs">Loading activities...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                <FaLeaf />
              </div>
              <h3 className="font-bold text-slate-700 text-base">No Activities Yet</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Start adding eco-friendly activities to earn Eco Points and unlock badges.
              </p>
              <Link
                to="/add-activity"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition"
              >
                <FaPlus className="text-[10px]" />
                <span>Add Your First Activity</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.slice(0, 4).map((activity) => (
                <ActivityCard key={activity._id} activity={activity} />
              ))}
            </div>
          )}
        </div>

        {/* ACHIEVEMENTS (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Achievements</h2>
            <p className="text-slate-500 text-xs">Milestones unlocked through real activities</p>
          </div>

          <div className="space-y-3">
            <AchievementCard
              title="Tree Planter"
              description="Complete your first tree planting activity to help green our surroundings."
              iconType="tree"
              isUnlocked={hasPlantedTree}
              requirementText="Plant at least 1 Tree (+20 pts)"
            />
            <AchievementCard
              title="Recycling Hero"
              description="Contribute to neighborhood circularity by recycling plastic waste."
              iconType="recycle"
              isUnlocked={hasRecycled}
              requirementText="Log 1 Plastic Recycling action"
            />
            <AchievementCard
              title="Green Traveller"
              description="Reduce carbon footprint with zero-emission cycling or public transit."
              iconType="travel"
              isUnlocked={hasTravelledGreen}
              requirementText="Cycle to college or take public bus"
            />
            <AchievementCard
              title="Eco Warrior"
              description="Attain the premier student milestone of 200 verified Eco Points."
              iconType="warrior"
              isUnlocked={hasReachedGoal}
              requirementText="Accumulate 200 total Eco Points"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
