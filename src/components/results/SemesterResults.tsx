
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';

interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
  status: 'Pass' | 'Fail' | 'Incomplete';
}

interface SemesterResultsProps {
  semester: number;
  courses: Course[];
  sgpa: number;
  totalCredits: number;
  onBack: () => void;
  onDownloadResult: () => void;
}

const SemesterResults = ({ 
  semester, 
  courses, 
  sgpa, 
  totalCredits, 
  onBack, 
  onDownloadResult 
}: SemesterResultsProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': case 'A': return 'bg-green-100 text-green-800 border-green-300';
      case 'A-': case 'B+': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'B': case 'B-': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'C+': case 'C': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 -ml-2"
          >
            <ArrowDown className="h-4 w-4 mr-2 rotate-90" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Semester {semester} Results
          </h1>
          <p className="text-gray-600 mt-2">
            Detailed academic performance for Semester {semester}
          </p>
        </div>
        
        <Button
          onClick={onDownloadResult}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Results
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-800">Semester GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{sgpa.toFixed(2)}</div>
            <p className="text-sm text-blue-600 mt-1">
              {sgpa >= 3.5 ? 'Excellent' : sgpa >= 3.0 ? 'Good' : 'Satisfactory'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-800">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{totalCredits}</div>
            <p className="text-sm text-green-600 mt-1">Credits Enrolled</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-800">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{courses.length}</div>
            <p className="text-sm text-purple-600 mt-1">
              {courses.filter(c => c.status === 'Pass').length} Passed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Course Results</CardTitle>
          <CardDescription>Detailed breakdown of your semester performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Course Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Course Name</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Credits</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Grade</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Grade Points</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{course.code}</td>
                    <td className="py-4 px-4 text-gray-800">{course.name}</td>
                    <td className="py-4 px-4 text-center text-gray-800">{course.credits}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={getGradeColor(course.grade)}>
                        {course.grade}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-gray-900">
                      {course.gradePoints.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={course.status === 'Pass' ? 'default' : 'destructive'}>
                        {course.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SemesterResults;
