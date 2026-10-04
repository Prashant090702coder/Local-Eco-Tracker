import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaLeaf,
  FaCheckCircle,
  FaExclamationCircle,
  FaPlus,
  FaArrowLeft,
  FaCamera,
  FaTimes,
  FaImage,
} from 'react-icons/fa';
import { activityService, ECO_ACTIVITIES } from '../services/api';

const AddActivity = ({ onActivityAdded }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedActivity, setSelectedActivity] = useState(ECO_ACTIVITIES[0].title);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Find points for the selected activity
  const currentActivityData = ECO_ACTIVITIES.find(
    (item) => item.title === selectedActivity
  ) || ECO_ACTIVITIES[0];

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Selected image exceeds the 5MB size limit.');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    setError('');
    setImageFile(file);

    // Generate local preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submissions

    setError('');
    setSuccess('');

    if (!selectedActivity || !description.trim()) {
      setError('Please select an activity and provide a brief description.');
      return;
    }

    try {
      setLoading(true);

      // Construct multipart FormData payload
      const formData = new FormData();
      formData.append('activity', selectedActivity);
      formData.append('description', description.trim());
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await activityService.addActivity(formData);

      setSuccess(res.message || 'Activity logged successfully!');
      setDescription('');
      handleRemoveImage();

      if (onActivityAdded && res.totalEcoPoints !== undefined) {
        onActivityAdded(res.totalEcoPoints);
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Failed to record activity. Please check your network connection.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 mb-6 transition cursor-pointer"
      >
        <FaArrowLeft className="text-xs" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-2xl shrink-0">
            <FaLeaf />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Add Eco Activity</h1>
            <p className="text-slate-500 text-sm">
              Record your sustainable action to earn verified Eco Points
            </p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-start gap-2.5">
            <FaExclamationCircle className="text-red-500 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-start gap-2.5">
            <FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Activity Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Select Eco Action
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            >
              {ECO_ACTIVITIES.map((act) => (
                <option key={act.id} value={act.title}>
                  {act.title} (+{act.points} pts)
                </option>
              ))}
            </select>
          </div>

          {/* Points Highlight Banner */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between text-sm">
            <span className="text-emerald-800 font-medium">Points to be earned:</span>
            <span className="font-extrabold text-emerald-700 bg-white px-3 py-1 rounded-lg border border-emerald-200 text-sm">
              +{currentActivityData.points} Eco Points
            </span>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Description / Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe where and how you performed this activity (e.g., Planted a sapling in the community garden)..."
              maxLength={500}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              required
            />
            <span className="text-[11px] text-slate-400 block text-right mt-1">
              {description.length}/500 characters
            </span>
          </div>

          {/* Image Upload Functionality */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Photo / Proof <span className="text-slate-400 font-normal normal-case">(Optional)</span>
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-emerald-200 bg-slate-50 p-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-xs"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      {imageFile?.name || 'Selected photo'}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-medium">
                      {(imageFile?.size / 1024).toFixed(1)} KB — Ready to upload
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition mr-1 cursor-pointer"
                  title="Remove image"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-slate-50/60 hover:bg-emerald-50/30 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
                  <FaCamera />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Click to attach photo evidence
                </p>
                <p className="text-xs text-slate-400">
                  Supports JPG, PNG, WEBP up to 5MB
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Logging Activity with Photo...</span>
              </>
            ) : (
              <>
                <FaPlus className="text-sm" />
                <span>Save Eco Activity</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
