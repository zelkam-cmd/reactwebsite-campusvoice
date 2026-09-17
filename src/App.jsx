import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import StudentTable from './components/StudentTable';
import StudentEdit from './components/StudentEdit';
import StudentAdd from './components/StudentAdd';
import StudentDetail from './components/StudentDetail';
import StudentPrint from './components/StudentPrint';
import { INITIAL_STUDENTS } from './data/initialStudents';
import './App.css';

const STORAGE_KEY = 'campusvoice_student_records_v7';

export default function App() {
  // Load students from localStorage or authentic initial records
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading saved students:', e);
    }
    return INITIAL_STUDENTS;
  });

  // Current view: 'list' | 'add' | 'edit' | 'detail' | 'print'
  const [viewMode, setViewMode] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [previousView, setPreviousView] = useState('list');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [students]);

  // Toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Full-Page Edit
  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setViewMode('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Full-Page Add
  const handleOpenAdd = () => {
    setSelectedStudent(null);
    setViewMode('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Full-Page Detail / View
  const handleOpenView = (student) => {
    setSelectedStudent(student);
    setViewMode('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Full-Page Print Preview matching Image 2
  const handleOpenPrint = (student) => {
    setSelectedStudent(student);
    setPreviousView(viewMode);
    setViewMode('print');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Native Delete Confirmation (Works identically to the original website)
  const handleOpenDelete = (student) => {
    const studentId = student.accountNumber || student.id;
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete student ${student.name} (${studentId})? This cannot be undone.`
    );
    if (confirmed) {
      handleConfirmDelete(student.id || student.accountNumber);
    }
  };

  // Delete student logic (matching delete.php)
  const handleConfirmDelete = (studentId) => {
    const studentToDelete = students.find((s) => (s.id === studentId || s.accountNumber === studentId || s.studentNumber === studentId));
    const stuNum = studentToDelete?.studentNumber || studentToDelete?.accountNumber || studentId;
    setStudents(students.filter((s) => s.id !== studentId && s.accountNumber !== studentId && s.studentNumber !== studentId));
    if (viewMode === 'detail' || viewMode === 'edit' || viewMode === 'print') {
      setViewMode('list');
      setSelectedStudent(null);
    }
    showToast(`Student record for ${stuNum} was deleted successfully.`);
  };

  // Reset password handler (matching reset_password.php)
  const handleResetPassword = (student) => {
    const studentId = student.accountNumber || student.studentNumber || student.id;
    const confirmed = window.confirm(`Reset password for ${student.name} to Student ID?`);
    if (confirmed) {
      setStudents((prev) =>
        prev.map((s) => {
          const match = (s.id && s.id === student.id) || (s.accountNumber && s.accountNumber === studentId);
          return match ? { ...s, mustChangePassword: true } : s;
        })
      );
      showToast(`Password reset successfully! Default password is set to Student ID: ${studentId}`);
    }
  };

  // Save student (Add or Edit)
  const handleSaveStudent = (studentData) => {
    if (viewMode === 'add') {
      const newStudent = {
        ...studentData,
        id: studentData.accountNumber || studentData.studentNumber || `STU-2024-${String(Date.now()).slice(-3)}`,
        accountNumber: studentData.accountNumber || studentData.studentNumber,
        studentNumber: studentData.studentNumber || studentData.accountNumber,
        mustChangePassword: true,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        updatedAt: 'Just now',
        lastUpdated: 'Just now'
      };
      setStudents([newStudent, ...students]);
      showToast(`Student ${newStudent.name} added! Default password is set to their Student ID.`);
      setSelectedStudent(newStudent);
      setViewMode('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (viewMode === 'edit') {
      const updatedList = students.map((s) => {
        const matchId = (s.id && s.id === studentData.id) || (s.accountNumber && s.accountNumber === studentData.accountNumber);
        return matchId ? { ...s, ...studentData, lastUpdated: 'Just now', updatedAt: 'Just now' } : s;
      });
      setStudents(updatedList);
      showToast('Student record updated successfully!');
      const updatedStudent = updatedList.find((s) => (s.id && s.id === studentData.id) || (s.accountNumber && s.accountNumber === studentData.accountNumber)) || studentData;
      setSelectedStudent(updatedStudent);
      setViewMode('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setViewMode('list');
    setSelectedStudent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated full-screen Print Preview view matching Image 2
  if (viewMode === 'print' && selectedStudent) {
    return (
      <StudentPrint
        student={selectedStudent}
        onBack={() => {
          setViewMode(previousView === 'detail' ? 'detail' : 'list');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // Dynamic top navbar title matching screenshots
  const getNavTitle = () => {
    if (viewMode === 'edit' && selectedStudent) {
      return `Edit Student: ${selectedStudent.name}`;
    }
    if (viewMode === 'add') {
      return 'Add New Student Record';
    }
    if (viewMode === 'detail' && selectedStudent) {
      return `Student Dossier: ${selectedStudent.name}`;
    }
    return 'Student Records & Demographics Registry';
  };

  const handleNavigateStudents = () => {
    setViewMode('list');
    setSelectedStudent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="ambient-blob-center"></div>
      <div className="app-layout admin-console-layout">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="toast-notification">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Left Sidebar (Only Students active) */}
        <Sidebar onNavigateStudents={handleNavigateStudents} />

        {/* Main Content Area */}
        <main className="app-main main-content">
          {/* Floating Glass Top Navbar Header from CampusVoice */}
          <AppHeader title={getNavTitle()} />

          {/* Dynamic Full-Page Views matching original CampusVoice */}
          <div className="app-content content-container">
            {viewMode === 'list' && (
              <StudentTable
                students={students}
                onView={handleOpenView}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
                onAdd={handleOpenAdd}
                onPrint={handleOpenPrint}
                onResetPassword={handleResetPassword}
              />
            )}

            {viewMode === 'edit' && (
              <StudentEdit
                student={selectedStudent}
                onSave={handleSaveStudent}
                onCancel={handleNavigateStudents}
              />
            )}

            {viewMode === 'add' && (
              <StudentAdd
                onSave={handleSaveStudent}
                onCancel={handleNavigateStudents}
                existingStudents={students}
              />
            )}

            {viewMode === 'detail' && (
              <StudentDetail
                student={selectedStudent}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
                onPrint={handleOpenPrint}
                onResetPassword={handleResetPassword}
                onBack={handleNavigateStudents}
              />
            )}
          </div>

          {/* Authentic CampusVoice Footer */}
          <footer className="app-footer">
            <div className="footer-content">
              <span>© 2026 CampusVoice — Bulacan State University</span>
              <span>
                v1.0.0 | <a href="mailto:support@campusvoice.edu">support@campusvoice.edu</a>
              </span>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
