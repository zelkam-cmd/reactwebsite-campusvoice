import React, { useState } from 'react';

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Midterm Campus Climate & Facilities Survey Open',
    content: 'All undergraduate and postgraduate students are requested to complete the semester evaluation before the closing deadline.',
    target: 'all',
    is_active: true,
    created_at: '2026-08-20'
  },
  {
    id: 2,
    title: 'Wi-Fi Coverage Expansion in Main Building',
    content: 'IT Infrastructure unit has completed access point installations in floors 2 and 3 of the engineering wing.',
    target: 'students',
    is_active: true,
    created_at: '2026-08-15'
  },
  {
    id: 3,
    title: 'Faculty Evaluation Protocol Update',
    content: 'Administrative department heads please review the updated rubrics in your portal before next Friday.',
    target: 'admins',
    is_active: false,
    created_at: '2026-08-10'
  }
];

const INITIAL_SURVEYS = [
  {
    id: 1,
    title: 'Semester Student Satisfaction & Welfare Survey',
    category: 'Student Affairs',
    question_count: 14,
    response_count: 18,
    status: 'active',
    close_date: '2026-10-15'
  },
  {
    id: 2,
    title: 'Campus Food & Cafeteria Services Evaluation',
    category: 'Facilities',
    question_count: 8,
    response_count: 12,
    status: 'active',
    close_date: '2026-09-30'
  },
  {
    id: 3,
    title: 'Library Resources & Digital Databases Feedback',
    category: 'Academic',
    question_count: 10,
    response_count: 24,
    status: 'closed',
    close_date: '2026-08-31'
  }
];

export default function Dashboard({ students = [], onNavigateAddStudent, onNavigateStudents }) {
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [surveys] = useState(INITIAL_SURVEYS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [modalForm, setModalForm] = useState({
    title: '',
    target: 'all',
    content: ''
  });

  const totalStudents = students.length || 24;
  const activeSurveysCount = surveys.filter(s => s.status === 'active').length;
  const totalRespondents = 18;
  const overallParticipationRate = Math.round((totalRespondents / totalStudents) * 100);
  const avgCampusRating = 4.2;

  // Department breakdown stats
  const departments = [
    { name: 'College of Industrial Technology (CIT)', respondents: 8, total: 10 },
    { name: 'College of Information and Communications Technology (CICT)', respondents: 6, total: 8 },
    { name: 'College of Business Education and Accountancy (CBEA)', respondents: 4, total: 6 }
  ];

  // System activity feed
  const activityLogs = [
    { action: 'Student record registered', desc: 'Registered STU-2024-027 (Yujin Ahn)', time: '2 hours ago' },
    { action: 'Survey published', desc: 'Published Midterm Campus Climate Survey', time: '1 day ago' },
    { action: 'Announcement posted', desc: 'Broadcasted Wi-Fi coverage update', time: '3 days ago' },
    { action: 'Profile update', desc: 'Updated demographic details for Ana Marie Reyes', time: '4 days ago' }
  ];

  // Flagged concerns
  const flaggedConcerns = [
    { message: 'Intermittent Wi-Fi disconnects reported in CIT Lab 3', survey: 'Facilities Survey' },
    { message: 'Vegetarian and halal meal selections needed in cafeteria', survey: 'Cafeteria Services' }
  ];

  // Open modal for create
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingId(null);
    setModalForm({ title: '', target: 'all', content: '' });
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEditModal = (ann) => {
    setModalMode('edit');
    setEditingId(ann.id);
    setModalForm({ title: ann.title, target: ann.target, content: ann.content });
    setIsModalOpen(true);
  };

  // Toggle announcement publish status
  const handleTogglePublish = (id) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, is_active: !a.is_active } : a));
  };

  // Delete announcement
  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  // Save announcement
  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (!modalForm.title.trim() || !modalForm.content.trim()) return;

    if (modalMode === 'create') {
      const newAnn = {
        id: Date.now(),
        title: modalForm.title.trim(),
        content: modalForm.content.trim(),
        target: modalForm.target,
        is_active: true,
        created_at: new Date().toISOString().split('T')[0]
      };
      setAnnouncements([newAnn, ...announcements]);
    } else {
      setAnnouncements(announcements.map(a => a.id === editingId ? {
        ...a,
        title: modalForm.title.trim(),
        content: modalForm.content.trim(),
        target: modalForm.target
      } : a));
    }
    setIsModalOpen(false);
  };

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="admin-dashboard-page">
      {/* Premium Glass Hero Banner */}
      <div className="hero-card mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.22)',
                padding: '5px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px'
              }}
            >
              <span>Administrator Command Center • {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Welcome back, Dr. Maria!
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '14px', marginBottom: '16px', maxWidth: '680px', lineHeight: 1.6 }}>
              Track real-time student satisfaction, launch new campus surveys, manage announcements, and inspect automated feedback analytics.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '6px 14px', borderRadius: '16px', backdropFilter: 'blur(10px)', fontSize: '13px' }}>
                Active Response Rate: <strong style={{ color: 'white' }}>{overallParticipationRate}%</strong>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '6px 14px', borderRadius: '16px', backdropFilter: 'blur(10px)', fontSize: '13px' }}>
                Campus Satisfaction: <strong style={{ color: '#fef08a' }}>{avgCampusRating} / 5.0</strong>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              className="btn"
              onClick={onNavigateAddStudent}
              style={{ background: 'white', color: '#0284c7', fontWeight: 800, padding: '12px 24px', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
            >
              + Add Student
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleOpenCreateModal}
              style={{ background: 'rgba(255,255,255,0.25)', color: 'white', fontWeight: 800, padding: '12px 24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              Create Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Stat Cards (Modular SaaS Row) */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        {/* Active Students */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-value">{totalStudents}</div>
            <div className="stat-card-label">Active Students</div>
            <div className="stat-card-trend up">
              <span>Verified Accounts</span>
            </div>
          </div>
        </div>

        {/* Active Surveys */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-value">{activeSurveysCount}</div>
            <div className="stat-card-label">Active Surveys</div>
            <div className="stat-card-trend up">
              <span>Accepting Responses</span>
            </div>
          </div>
        </div>

        {/* Participation Rate */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-value">{overallParticipationRate}%</div>
            <div className="stat-card-label">Participation Rate</div>
            <div className="stat-card-trend up">
              <span>{totalRespondents} Respondents</span>
            </div>
          </div>
        </div>

        {/* Flagged Concerns */}
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="stat-card-content">
            <div className="stat-card-value">{flaggedConcerns.length}</div>
            <div className="stat-card-label">Flagged Concerns</div>
            <div className="stat-card-trend warning">
              <span>Requires Attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, width: '100%' }}>
          {/* ANNOUNCEMENT MANAGEMENT GLASS CARD */}
          <div className="card glass-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Announcement Management</h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>
                  Create, publish, edit, and target broadcast messages for campus users.
                </p>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleOpenCreateModal}>
                + Create Announcement
              </button>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {announcements.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                  <p>No announcements created yet.</p>
                </div>
              ) : (
                <div className="data-table-responsive">
                  <table className="data-table" style={{ minWidth: '620px' }}>
                    <thead>
                      <tr>
                        <th>Announcement</th>
                        <th>Audience</th>
                        <th>Status</th>
                        <th>Date Published</th>
                        <th style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {announcements.map((ann) => (
                        <tr key={ann.id}>
                          <td>
                            <div className="font-bold text-primary">{ann.title}</div>
                            <div style={{ fontSize: '12px', color: '#64748b', maxWidth: '340px' }} className="truncate">
                              {ann.content}
                            </div>
                          </td>
                          <td>
                            <span className="badge badge-info" style={{ textTransform: 'capitalize' }}>
                              {ann.target}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleTogglePublish(ann.id)}
                              className={`badge ${ann.is_active ? 'badge-success' : 'badge-secondary'}`}
                              style={{ cursor: 'pointer', border: 'none' }}
                            >
                              {ann.is_active ? 'Published' : 'Draft'}
                            </button>
                          </td>
                          <td style={{ fontSize: '12px', color: '#64748b' }}>
                            {formatDate(ann.created_at)}
                          </td>
                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', justifyContent: 'flex-end' }}>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleOpenEditModal(ann)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteAnnouncement(ann.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* CAMPUS IMPROVEMENT INSIGHTS */}
          <div className="card glass-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Campus Improvement Insights</h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>
                  Automated rating breakdowns and high-priority feedback areas.
                </p>
              </div>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Wi-Fi Performance</span>
                    <span className="badge badge-warning">2.5 / 5.0</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(226, 232, 240, 0.7)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: '9999px' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Library &amp; Main Building coverage needs expansion</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Cafeteria Services</span>
                    <span className="badge badge-primary">3.5 / 5.0</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(226, 232, 240, 0.7)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #0284c7, #06b6d4)', borderRadius: '9999px' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Vegetarian &amp; healthy options requested</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Library Operating Hours</span>
                    <span className="badge badge-success">4.8 / 5.0</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(226, 232, 240, 0.7)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: '96%', height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '9999px' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Study space availability highly rated</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Campus Safety</span>
                    <span className="badge badge-info">4.2 / 5.0</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(226, 232, 240, 0.7)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: '84%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)', borderRadius: '9999px' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Daytime protocols well understood</div>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT SURVEY MANAGEMENT TABLE */}
          <div className="card glass-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Recent Survey Management</h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>
                  Track active and recently created campus surveys.
                </p>
              </div>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="data-table-responsive">
                <table className="data-table" style={{ minWidth: '620px' }}>
                  <thead>
                    <tr>
                      <th>Title &amp; Category</th>
                      <th>Status</th>
                      <th>Responses</th>
                      <th>Closing Date</th>
                      <th style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveys.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <div className="font-bold">{s.title}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {s.category} • {s.question_count} questions
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td>
                          <span className="font-bold text-primary">{s.response_count}</span>
                          <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '4px' }}>
                            ({Math.round((s.response_count / totalStudents) * 100)}%)
                          </span>
                        </td>
                        <td style={{ fontSize: '12px', color: '#64748b' }}>
                          {formatDate(s.close_date)}
                        </td>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => alert(`Opening analytics for ${s.title}`)}
                            >
                              Results
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => alert(`Editing survey: ${s.title}`)}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* VIBRANT ANALYTICS CHARTS */}
          <div className="chart-grid">
            <div className="card glass-card">
              <div className="card-header">
                <h3 className="card-title">Overall Participation Rate</h3>
              </div>
              <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '12px' }}>
                {/* SVG Semi-Circle Gauge */}
                <svg width="200" height="150" viewBox="0 0 200 130">
                  <path
                    d="M 20 110 A 80 80 0 0 1 180 110"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 110 A 80 80 0 0 1 180 110"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={`${251.2 * (1 - overallParticipationRate / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                  <text x="100" y="85" textAnchor="middle" fontSize="26" fontWeight="800" fill="#0f172a">
                    {overallParticipationRate}%
                  </text>
                  <text x="100" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="#64748b">
                    Total Turnout
                  </text>
                </svg>
              </div>
            </div>

            <div className="card glass-card">
              <div className="card-header">
                <h3 className="card-title">Responses by Category</h3>
              </div>
              <div style={{ height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', padding: '16px 24px' }}>
                {[
                  { label: 'Wi-Fi & Tech', count: 18, color: '#0284c7' },
                  { label: 'Cafeteria', count: 14, color: '#06b6d4' },
                  { label: 'Library Services', count: 22, color: '#10b981' },
                  { label: 'Campus Safety', count: 16, color: '#8b5cf6' }
                ].map(cat => (
                  <div key={cat.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '3px' }}>
                      <span style={{ color: '#334155' }}>{cat.label}</span>
                      <span style={{ color: cat.color }}>{cat.count} responses</span>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${(cat.count / 25) * 100}%`, height: '100%', background: cat.color, borderRadius: '9999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, width: '100%' }}>
          {/* ADMINISTRATIVE ACTIONS GLASS CARD */}
          <div className="card glass-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Administrative Actions</h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', margin: 0 }}>
                  Quick shortcuts to manage surveys, users, and reports.
                </p>
              </div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' }}>
              <button
                type="button"
                className="action-btn primary"
                onClick={() => alert('Create New Survey wizard')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Create New Survey</span>
              </button>

              <button
                type="button"
                className="action-btn"
                onClick={handleOpenCreateModal}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span>Publish Announcement</span>
              </button>

              <button
                type="button"
                className="action-btn"
                onClick={onNavigateAddStudent}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="17" y1="11" x2="23" y2="11" />
                </svg>
                <span>Add Student Account</span>
              </button>

              <button
                type="button"
                className="action-btn"
                onClick={onNavigateStudents}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Student Registry Directory</span>
              </button>
            </div>
          </div>

          {/* FLAGGED CONCERNS PANEL */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">Flagged Concerns</h3>
            </div>
            <div className="card-body" style={{ padding: '16px 20px' }}>
              {flaggedConcerns.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '14px',
                    paddingBottom: '12px',
                    borderBottom: idx === flaggedConcerns.length - 1 ? 'none' : '1px solid rgba(226, 232, 240, 0.5)'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
                      {c.message}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                      Survey: {c.survey}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEPARTMENT ENGAGEMENT */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">Department Engagement</h3>
            </div>
            <div className="card-body" style={{ padding: '16px 20px' }}>
              {departments.map((dept, idx) => (
                <div key={idx} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                    <span style={{ maxWidth: '200px' }} className="truncate">{dept.name}</span>
                    <span style={{ color: '#0284c7' }}>{dept.respondents} / {dept.total}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(226, 232, 240, 0.7)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${(dept.respondents / dept.total) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #0284c7, #06b6d4)',
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM ACTIVITY FEED */}
          <div className="card glass-card">
            <div className="card-header">
              <h3 className="card-title">Live System Activity</h3>
            </div>
            <div className="card-body" style={{ padding: '16px 20px' }}>
              <div className="activity-feed">
                {activityLogs.map((log, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.7)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: '#0284c7'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                        {log.desc}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {log.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: CREATE / EDIT ANNOUNCEMENT */}
      {isModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsModalOpen(false)}>
          <div className="modal glass-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{modalMode === 'create' ? 'Create Announcement' : 'Edit Announcement'}</h3>
              <button type="button" className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveAnnouncement}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Title <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. New Campus Safety Survey Open"
                    value={modalForm.title}
                    onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Audience <span className="required">*</span></label>
                  <select
                    className="form-select"
                    value={modalForm.target}
                    onChange={(e) => setModalForm({ ...modalForm, target: e.target.value })}
                    required
                  >
                    <option value="all">All Campus Users</option>
                    <option value="students">Students Only</option>
                    <option value="admins">Administrators Only</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Content <span className="required">*</span></label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="Write announcement details for users..."
                    value={modalForm.content}
                    onChange={(e) => setModalForm({ ...modalForm, content: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {modalMode === 'create' ? 'Publish Announcement' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
