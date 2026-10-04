import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf,
  FaRecycle,
  FaTrashAlt,
  FaTrophy,
  FaSeedling,
  FaChartLine,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCheck,
} from 'react-icons/fa';

const Home = ({ user }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-16 pb-20 border-b border-emerald-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold tracking-wide uppercase shadow-xs">
                <FaSeedling />
                <span>Empowering Community Sustainability</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Make Your City <span className="text-emerald-600 underline decoration-emerald-300">Greener</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Track your eco-friendly actions, earn Eco Points, and contribute to a cleaner and greener community.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to={user ? "/dashboard" : "/signup"}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{user ? "View Dashboard" : "Get Started"}</span>
                  <FaArrowRight className="text-xs" />
                </Link>
                <Link
                  to="/report-waste"
                  className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-300 shadow-xs transition"
                >
                  Report Waste
                </Link>
                <Link
                  to="/recycling-centers"
                  className="px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl border border-emerald-200 transition"
                >
                  Find Recycling Centers
                </Link>
              </div>
            </div>

            {/* Right CSS Environmental Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Concentric Decorative Rings */}
                <div className="absolute inset-0 bg-emerald-200/30 rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-emerald-100/50 rounded-full border border-emerald-200/70" />
                
                {/* Central Emblem */}
                <div className="relative z-10 w-44 h-44 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-3xl shadow-xl flex flex-col items-center justify-center text-white transform -rotate-3 hover:rotate-0 transition duration-300">
                  <FaLeaf className="text-6xl mb-2 drop-shadow-md" />
                  <span className="text-sm font-bold tracking-wider uppercase">Local Eco</span>
                  <span className="text-xs text-emerald-100">Action Tracker</span>
                </div>

                {/* Floating Orbiting Badges */}
                <div className="absolute top-2 right-4 bg-white p-3 rounded-2xl shadow-md border border-emerald-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg"><FaRecycle /></span>
                  <span>Recycle Everyday</span>
                </div>
                <div className="absolute bottom-4 left-2 bg-white p-3 rounded-2xl shadow-md border border-emerald-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg"><FaTrophy /></span>
                  <span>Earn Eco Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUICK ACTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Quick Actions
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">
            Take immediate steps to log actions or locate local environmental resources
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to={user ? "/add-activity" : "/login"}
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition">
                <FaLeaf />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-600 transition">
                Track Activities
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Log actions like tree planting, cycling, saving electricity, or recycling.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span>Log Action</span>
              <FaArrowRight className="text-[10px]" />
            </div>
          </Link>

          <Link
            to="/recycling-centers"
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition">
                <FaRecycle />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-600 transition">
                Recycling Centers
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Find authorized municipal and verified neighborhood drop-off locations.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>Find Centers</span>
              <FaArrowRight className="text-[10px]" />
            </div>
          </Link>

          <Link
            to="/report-waste"
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition">
                <FaTrashAlt />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-600 transition">
                Report Waste
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Document uncollected trash, plastic debris, or hazardous garbage.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-amber-600">
              <span>Submit Report</span>
              <FaArrowRight className="text-[10px]" />
            </div>
          </Link>

          <Link
            to={user ? "/dashboard" : "/signup"}
            className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition">
                <FaTrophy />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-600 transition">
                Earn Eco Points
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Accumulate points, unlock badges, and track your milestone progress.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-purple-600">
              <span>View Milestones</span>
              <FaArrowRight className="text-[10px]" />
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 3 — WHY LOCAL ECO TRACKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Why Local Eco Tracker?
            </h2>
            <p className="text-emerald-200 text-sm mt-2">
              Transforming small personal choices into structured environmental momentum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-emerald-800/60 p-6 rounded-2xl border border-emerald-700/60">
              <div className="text-emerald-300 text-2xl mb-3"><FaChartLine /></div>
              <h3 className="font-bold text-lg mb-1 text-white">Track Your Impact</h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Log real activities and observe quantified points reflecting your personal conservation effort.
              </p>
            </div>

            <div className="bg-emerald-800/60 p-6 rounded-2xl border border-emerald-700/60">
              <div className="text-emerald-300 text-2xl mb-3"><FaSeedling /></div>
              <h3 className="font-bold text-lg mb-1 text-white">Build Eco Habits</h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Foster sustainable routines by replacing single-use items with durable, reusable practices.
              </p>
            </div>

            <div className="bg-emerald-800/60 p-6 rounded-2xl border border-emerald-700/60">
              <div className="text-emerald-300 text-2xl mb-3"><FaMapMarkerAlt /></div>
              <h3 className="font-bold text-lg mb-1 text-white">Discover Recycling</h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Access a dedicated directory of local centers accepting plastic, e-waste, and scrap materials.
              </p>
            </div>

            <div className="bg-emerald-800/60 p-6 rounded-2xl border border-emerald-700/60">
              <div className="text-emerald-300 text-2xl mb-3"><FaLeaf /></div>
              <h3 className="font-bold text-lg mb-1 text-white">Cleaner Community</h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Highlight local waste hotspots to raise civic awareness and encourage clean neighborhood spots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            How It Works
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">
            A simple 4-step workflow designed to encourage sustainable living
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
            <div className="text-3xl font-extrabold text-emerald-600 mb-2">01</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Register</h3>
            <p className="text-slate-600 text-sm">
              Create your free student account with email and password in under a minute.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
            <div className="text-3xl font-extrabold text-emerald-600 mb-2">02</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Add Activity</h3>
            <p className="text-slate-600 text-sm">
              Select an eco-friendly task completed today—from planting a tree to cycling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
            <div className="text-3xl font-extrabold text-emerald-600 mb-2">03</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Earn Points</h3>
            <p className="text-slate-600 text-sm">
              The backend securely evaluates your action and credits verified Eco Points.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative">
            <div className="text-3xl font-extrabold text-emerald-600 mb-2">04</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Track Progress</h3>
            <p className="text-slate-600 text-sm">
              Watch your progress bar advance towards the 200 Points milestone and unlock badges.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-8 sm:p-12 text-center shadow-md">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Start Your Green Journey Today
          </h2>
          <p className="text-emerald-100 text-base max-w-xl mx-auto mb-6">
            Join students and community members taking accountable steps for a healthier environment.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm"
          >
            <span>Get Started</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
