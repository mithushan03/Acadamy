import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import LoginForm from '@/components/auth/LoginForm';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import SemesterResults from '@/components/results/SemesterResults';
import GPACalculator from '@/components/calculator/GPACalculator';
import { useToast } from '@/hooks/use-toast';

interface User {
  name: string;
  studentId: string;
  program: string;
}

interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
  status: 'Pass' | 'Fail' | 'Incomplete';
}

const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

// 1. Map semester numbers to their courses
const rawSemesterCourses: Record<number, Course[]> = {
  1: [
    { code: "CS1301", name: "Introduction to Computing", credits: 3, grade: "A+", gradePoints: 0, status: "Pass" },
    { code: "EE1301", name: "Principles of Electrical Engineering", credits: 3, grade: "B+", gradePoints: 0, status: "Pass" },
    { code: "ID1202", name: "English", credits: 2, grade: "C+", gradePoints: 0, status: "Pass" },
    { code: "ID1301", name: "Mathematics- I", credits: 3, grade: "B+", gradePoints: 0, status: "Pass" },
    { code: "ME1301", name: "Applied Mechanics ", credits: 3, grade: "B", gradePoints: 0, status: "Pass" },
    { code: "ME1302", name: "Engineering Drawing ", credits: 3, grade: "B", gradePoints: 0, status: "Pass" },
    // ...add more courses for semester 1
  ],
  2: [
    { code: "ME1303", name: "Engineering Materials and Processes  ", credits: 3, grade: "B", gradePoints: 0, status: "Pass" },
    { code: "EE1302", name: "Principles of Electronic Engineering  ", credits: 3, grade: "A-", gradePoints: 0, status: "Pass" },
    { code: "ID1303", name: "Mathematics- II  ", credits: 3, grade: "A", gradePoints: 0, status: "Pass" },
    { code: "ME1304", name: "Thermodynamics and Fluid Mechanics", credits: 3, grade: "B", gradePoints: 0, status: "Pass" },
    { code: "ID1204", name: "Communication Skills for Engineers ", credits: 2, grade: "C+", gradePoints: 0, status: "Pass" },
    { code: "CE1301", name: "Mechanics of Materials  ", credits: 3, grade: "B", gradePoints: 0, status: "Pass" },
    // ...add more courses for semester 2
  ],
  3: [
    { code: "EE2201", name: "Electromagnetics ", credits: 2, grade: "A-", gradePoints: 0, status: "Pass" },
    { code: "EE2202", name: "Electrical Circuit Analysis ", credits: 2, grade: "B", gradePoints: 0, status: "Pass" },
    { code: "EE2203", name: "Electrical Measurements ", credits: 2, grade: "B-", gradePoints: 0, status: "Pass" },
    { code: "EE2304", name: "Digital Electronics  ", credits: 3, grade: "C+", gradePoints: 0, status: "Pass" },
    { code: "EE2305", name: "Introduction to Telecommunications ", credits: 3, grade: "A-", gradePoints: 0, status: "Pass" },
    { code: "EE2306", name: "Theory of Electricity ", credits: 3, grade: "A", gradePoints: 0, status: "Pass" },
    { code: "ID2301", name: "Differential Equations ", credits: 3, grade: "B", gradePoints: 0, status: "Pass" }
  ],
  4: [
    { code: "CS2302", name: "Computer Architecture  ", credits: 3, grade: "C+", gradePoints: 0, status: "Pass" },
    { code: "EE2307", name: "Introduction to Electrical Machines and Power Systems  ", credits: 3, grade: "C", gradePoints: 0, status: "Pass" },
    { code: "EE2308", name: "Analogue Electronics ", credits: 3, grade: "B", gradePoints: 0, status: "Pass" },
    { code: "EE2309", name: "Signals and Systems  ", credits: 3, grade: "B-", gradePoints: 0, status: "Pass" },
    { code: "ID2302", name: "Probability and Statistics for Engineers ", credits: 3, grade: "B-", gradePoints: 0, status: "Pass" },
    { code: "ID2303", name: "Industrial Management I  ", credits: 3, grade: "B-", gradePoints: 0, status: "Pass" },
    { code: "ID5211", name: "Climate Change ", credits: 2, grade: "B+", gradePoints: 0, status: "Pass" }
  ]
};

// Assign gradePoints from gradePoints map
const semesterCourses: Record<number, Course[]> = Object.fromEntries(
  Object.entries(rawSemesterCourses).map(([sem, courses]) => [
    Number(sem),
    courses.map(course => ({
      ...course,
      gradePoints: gradePoints[course.grade] ?? 0
    }))
  ])
);

/**
 * Calculate CGPA from all semester courses.
 */
function calculateCGPA(semesterCourses: Record<number, Course[]>): number {
  let totalGradePoints = 0;
  let totalCredits = 0;
  Object.values(semesterCourses).forEach(courses => {
    courses.forEach(course => {
      totalGradePoints += course.gradePoints * course.credits;
      totalCredits += course.credits;
    });
  });
  return totalCredits > 0 ? +(totalGradePoints / totalCredits).toFixed(2) : 0;
}

/**
 * Calculate SGPA for a given semester's courses.
 */
function calculateSGPA(courses: Course[]): number {
  let totalGradePoints = 0;
  let totalCredits = 0;
  courses.forEach(course => {
    totalGradePoints += course.gradePoints * course.credits;
    totalCredits += course.credits;
  });
  return totalCredits > 0 ? +(totalGradePoints / totalCredits).toFixed(2) : 0;
}

// Move mockStudentData here, after semesterCourses and calculateCGPA are defined
const mockStudentData = {
  name: "Mithushan Sachchithananthan",
  studentId: "SEU/IS/20/EG/078",
  program: "Electrical and Electronics Engineering",
  currentSemester: 6,
  cgpa: calculateCGPA(semesterCourses),
  totalSemesters: 8,
  totalCredits: 150,
  completedCredits: Object.values(semesterCourses)
  .flat()
  .filter(course => course.status === "Pass")
  .reduce((sum, course) => sum + course.credits, 0),
  status: "Good Standing",
  recentResults: [4, 3, 2, 1].map(sem => {
    const sgpa = calculateSGPA(semesterCourses[sem]);
    const courses = semesterCourses[sem]?.length || 0;
    let status = "Just Pass";
    if (sgpa >= 3.7) status = "First Class";
    else if (sgpa >= 3.3) status = "Second Upper";
    else if (sgpa >= 3.0) status = "Second Lower";
    return { semester: sem, sgpa, courses, status };
  })
};

type ViewMode = 'login' | 'dashboard' | 'results' | 'calculator';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedSemester, setSelectedSemester] = useState(5);
  const { toast } = useToast();

  const handleLogin = (credentials: { studentId: string; password: string }) => {
    // Mock authentication - in real app, this would validate against backend
    if (credentials.studentId && credentials.password) {
      setUser({
        name: mockStudentData.name,
        studentId: credentials.studentId,
        program: mockStudentData.program
      });
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleViewResults = (semester: number) => {
    setSelectedSemester(semester);
    setCurrentView('results');
  };

  const handleDownloadTranscript = () => {
    toast({
      title: "Downloading Transcript",
      description: "Your academic transcript is being prepared for download.",
    });
  };

  const handleDownloadResult = () => {
    toast({
      title: "Downloading Results",
      description: `Semester ${selectedSemester} results are being downloaded.`,
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onLogin={handleLogin} />;
      
      case 'dashboard':
        return (
          <StudentDashboard
            studentData={mockStudentData}
            onViewResults={handleViewResults}
            onDownloadTranscript={handleDownloadTranscript}
            onOpenCalculator={() => setCurrentView('calculator')}
          />
        );
      
      case 'results':
        return (
          <SemesterResults
            semester={selectedSemester}
            courses={semesterCourses[selectedSemester] || []} // 2. Use correct courses
            sgpa={mockStudentData.recentResults.find(r => r.semester === selectedSemester)?.sgpa || 3.8}
            totalCredits={semesterCourses[selectedSemester]?.reduce((sum, c) => sum + c.credits, 0) || 0}
            onBack={() => setCurrentView('dashboard')}
            onDownloadResult={handleDownloadResult}
          />
        );
      
      case 'calculator':
        return (
          <GPACalculator
            onBack={() => setCurrentView('dashboard')}
          />
        );
      
      default:
        return <LoginForm onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'login' && user && (
        <Header user={user} onLogout={handleLogout} />
      )}
      {renderCurrentView()}
    </div>
  );
};

// Example usage:
const cgpa = calculateCGPA(semesterCourses);
// cgpa now holds the calculated CGPA value

export default Index;
