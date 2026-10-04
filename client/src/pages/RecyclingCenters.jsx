import React, { useState } from 'react';
import {
  FaRecycle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaSearch,
  FaInfoCircle,
} from 'react-icons/fa';

// Structured Demo Directory Data (Easily extendable or connectable to a database)
const RECYCLING_CENTERS = [
  {
    id: 1,
    name: 'GreenEarth Community Recycling Hub',
    location: 'Sector 4, Main Market Complex, Central District',
    acceptedMaterials: ['Plastic Bottles', 'Cardboard & Paper', 'Aluminium Cans'],
    timings: 'Mon - Sat: 9:00 AM - 6:00 PM',
    contact: '+91 98765 43210 (Demo Contact)',
    category: 'Mixed Recyclables',
  },
  {
    id: 2,
    name: 'EcoCycle E-Waste Collection Point',
    location: 'Tech Park Avenue, Gate 3, Electronic City Zone',
    acceptedMaterials: ['Computers & Laptops', 'Mobile Phones', 'Batteries & Cables'],
    timings: 'Tue - Sun: 10:00 AM - 5:00 PM',
    contact: '+91 98765 12345 (Demo Contact)',
    category: 'E-Waste',
  },
  {
    id: 3,
    name: 'Municipal Glass & Metal Drop-Off Depot',
    location: 'Industrial Estate Road, Opposite Civic Utility Center',
    acceptedMaterials: ['Glass Bottles & Jars', 'Scrap Metal', 'Steel Cans'],
    timings: 'Mon - Fri: 8:00 AM - 4:00 PM',
    contact: '+91 98765 67890 (Demo Contact)',
    category: 'Glass & Metals',
  },
  {
    id: 4,
    name: 'Campus Compost & Organic Yard',
    location: 'University North Gate, Botanical Department Enclosure',
    acceptedMaterials: ['Dry Leaves', 'Kitchen Compostable Waste', 'Garden Clippings'],
    timings: 'Mon - Sat: 7:30 AM - 1:30 PM',
    contact: 'campus.eco@demo.edu',
    category: 'Organic',
  },
  {
    id: 5,
    name: 'RePack Cardboard & Paper Recyclers',
    location: 'Warehouse District, Old Station Road',
    acceptedMaterials: ['Corrugated Boxes', 'Newspapers', 'Office Paper', 'Books'],
    timings: 'Mon - Sat: 9:00 AM - 7:00 PM',
    contact: '+91 98765 99887 (Demo Contact)',
    category: 'Paper',
  },
];

const RecyclingCenters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Mixed Recyclables', 'E-Waste', 'Glass & Metals', 'Organic', 'Paper'];

  const filteredCenters = RECYCLING_CENTERS.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.acceptedMaterials.some((m) =>
        m.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'All' || center.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          Recycling Centers Directory
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          Locate neighborhood drop-off points, municipal collection centers, and material-specific recyclers.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5">
        <FaInfoCircle className="text-emerald-600 text-base mt-0.5 shrink-0" />
        <span>
          <strong>Directory Demo Note:</strong> The sample centers displayed below represent illustrative local recycling facilities for demonstration and academic evaluation. Real regional facilities can be plugged in directly via API.
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FaSearch />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by center name, location, or accepted material (e.g. plastic, batteries)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-500 font-medium">
        Showing <strong>{filteredCenters.length}</strong> recycling {filteredCenters.length === 1 ? 'center' : 'centers'}
      </div>

      {/* Centers Directory Grid */}
      {filteredCenters.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-xl">
            <FaRecycle />
          </div>
          <h3 className="font-bold text-slate-700">No Centers Found</h3>
          <p className="text-slate-500 text-xs">
            No recycling facilities matched your current search filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                    <FaRecycle />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {center.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {center.name}
                </h3>

                <p className="text-slate-500 text-xs flex items-start gap-1.5 mb-4">
                  <FaMapMarkerAlt className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>{center.location}</span>
                </p>

                {/* Accepted Materials Badges */}
                <div className="mb-4">
                  <span className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                    Accepted Materials:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {center.acceptedMaterials.map((mat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details & Timings */}
              <div className="pt-4 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <FaClock className="text-slate-400" />
                  <span>{center.timings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-slate-400" />
                  <span>{center.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecyclingCenters;
