import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp, Download, Calculator } from 'lucide-react';
import GPAChart from './GPAChart';

interface StudentData {
  name: string;
  studentId: string;
  program: string;
  currentSemester: number;
  cgpa: number;
  totalCredits: number;
  completedCredits: number;
  status: string;
  recentResults: Array<{
    semester: number;
    sgpa: number;
    courses: number;
    status: string;
  }>;
}

interface StudentDashboardProps {
  studentData: StudentData;
  onViewResults: (semester: number) => void;
  onDownloadTranscript: () => void;
  onOpenCalculator: () => void;
}

const StudentDashboard = ({ 
  studentData, 
  onViewResults, 
  onDownloadTranscript,
  onOpenCalculator 
}: StudentDashboardProps) => {
  const progressPercentage = (studentData.completedCredits / studentData.totalCredits) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {studentData.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-600">Here's your academic overview for the current semester.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Current CGPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{studentData.cgpa.toFixed(2)}</div>
            <p className="text-xs text-blue-600 mt-1">
              {studentData.cgpa >= 3.5 ? 'Excellent Performance' : 
               studentData.cgpa >= 3.0 ? 'Good Performance' : 'Needs Improvement'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Academic Status</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              {studentData.status}
            </Badge>
            <p className="text-xs text-green-600 mt-2">Semester {studentData.currentSemester}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Credits Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {studentData.completedCredits}/{studentData.totalCredits}
            </div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-purple-600 mt-1">{progressPercentage.toFixed(1)}% Complete</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Last Semester</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {studentData.recentResults[0]?.sgpa.toFixed(2) || 'N/A'}
            </div>
            <p className="text-xs text-yellow-600 mt-1">
              SGPA - Semester {studentData.recentResults[0]?.semester || 'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* GPA Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Performance Trend</CardTitle>
            <CardDescription>Your SGPA progression across semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <GPAChart data={studentData.recentResults} />
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Semester Results</CardTitle>
            <CardDescription>Your latest academic performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentData.recentResults.slice(0, 4).map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onViewResults(result.semester)}
              >
                <div>
                  <p className="font-semibold">Semester {result.semester}</p>
                  <p className="text-sm text-gray-600">{result.courses} courses completed</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{result.sgpa.toFixed(2)}</p>
                  <Badge
                    className={
                      result.status === "Second Lower"
                        ? "bg-green-100 text-green-800"
                        : undefined
                    }
                    variant={
                      result.status === "Second Lower"
                        ? undefined
                        : result.sgpa >= 3.5
                          ? "default"
                          : result.sgpa >= 3.0
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {result.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={() => onViewResults(studentData.currentSemester)}
            >
              <div className="flex flex-col items-center space-y-1">
                <BookOpen className="h-5 w-5" />
                <span>View Current Results</span>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-16 border-2 hover:bg-gray-50"
              onClick={onDownloadTranscript}
            >
              <div className="flex flex-col items-center space-y-1">
                <Download className="h-5 w-5" />
                <span>Download Transcript</span>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-16 border-2 hover:bg-gray-50"
              onClick={onOpenCalculator}
            >
              <div className="flex flex-col items-center space-y-1">
                <Calculator className="h-5 w-5" />
                <span>GPA Calculator</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
