import React, { useState, useEffect, useRef } from 'react';
import {
  FaTrashAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaCamera,
  FaTimes,
  FaClock,
} from 'react-icons/fa';
import { wasteService, authService, getImageUrl } from '../services/api';

const wasteOptions = [
  'Plastic',
  'Garbage',
  'E-Waste',
  'Glass',
  'Construction Waste',
  'Other',
];

const ReportWaste = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    wasteType: 'Plastic',
    location: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  const currentUser = authService.getCurrentUser();

  const fetchReports = async () => {
    try {
      setLoadingReports(true);
      const data = await wasteService.getReports();
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  // Image Selection Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Selected image exceeds the 5MB size limit.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    setError('');
    setImageFile(file);

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
    if (loading) return;

    setError('');
    setSuccess('');

    if (!formData.location.trim() || !formData.description.trim()) {
      setError('Please provide both the location and description of the waste.');
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append('wasteType', formData.wasteType);
      payload.append('location', formData.location.trim());
      payload.append('description', formData.description.trim());
      if (currentUser?.id) {
        payload.append('userId', currentUser.id);
      }
      if (imageFile) {
        payload.append('image', imageFile);
      }

      const res = await wasteService.submitReport(payload);

      setSuccess(
        res.message ||
          'Waste report submitted successfully to the community registry.'
      );

      // Reset form
      setFormData({
        wasteType: 'Plastic',
        location: '',
        description: '',
      });
      handleRemoveImage();
      fetchReports();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Failed to submit waste report. Please check your network connection.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Submission Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl shrink-0">
            <FaTrashAlt />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Report Waste</h1>
            <p className="text-slate-500 text-sm">
              Log neighborhood waste accumulation or illegal dumping in the community registry
            </p>
          </div>
        </div>

        {/* Responsible Disclaimer */}
        <div className="mb-6 p-3.5 bg-blue-50/80 border border-blue-200 text-blue-800 text-xs rounded-xl flex items-start gap-2.5">
          <FaInfoCircle className="text-blue-500 text-base mt-0.5 shrink-0" />
          <span>
            <strong>Community Awareness Notice:</strong> Reports logged here are maintained in our student community database to document local problem areas and promote student clean-up drives. This is not directly dispatched to municipal emergency services.
          </span>
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
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Waste Type
            </label>
            <select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            >
              {wasteOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Location / Landmark
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Near North Campus Gate 2, Behind Library"
                maxLength={200}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Description & Details
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide specific details about the waste problem (e.g. Broken glass bottles and plastic bags accumulated beside footpath)..."
              maxLength={1000}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              required
            />
            <span className="text-[11px] text-slate-400 block text-right mt-1">
              {formData.description.length}/1000 characters
            </span>
          </div>

          {/* Waste Image Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Photo of Waste Hotspot <span className="text-slate-400 font-normal normal-case">(Optional)</span>
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-amber-200 bg-slate-50 p-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Waste preview"
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-xs"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      {imageFile?.name || 'Selected waste photo'}
                    </p>
                    <p className="text-[11px] text-amber-600 font-medium">
                      {(imageFile?.size / 1024).toFixed(1)} KB — Ready to attach
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition mr-1 cursor-pointer"
                  title="Remove photo"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-200 hover:border-amber-400 bg-slate-50/60 hover:bg-amber-50/20 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
                  <FaCamera />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Click to attach photo of the waste problem
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
                <span>Submitting Report with Photo...</span>
              </>
            ) : (
              'Submit Report'
            )}
          </button>
        </form>
      </div>

      {/* Community Registry Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            Community Waste Registry
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Recent submissions ({reports.length})
          </span>
        </div>

        {loadingReports ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-400 text-xs">
            Loading logged reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-sm">
            No waste reports logged yet. Your neighborhood is currently clean!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => {
              const photoUrl = getImageUrl(report.image);
              return (
                <div
                  key={report._id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {report.wasteType}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <FaClock className="text-[10px]" />
                      {formatDate(report.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-emerald-600 shrink-0" />
                    <span>{report.location}</span>
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {report.description}
                  </p>

                  {photoUrl && (
                    <div className="mt-1 rounded-xl overflow-hidden border border-slate-200 h-36 bg-slate-100">
                      <img
                        src={photoUrl}
                        alt="Hotspot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportWaste;
