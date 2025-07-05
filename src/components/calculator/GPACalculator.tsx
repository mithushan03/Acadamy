
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Plus, Trash2 } from 'lucide-react';

interface CalculatorCourse {
  name: string;
  credits: number;
  grade: string;
}

interface GPACalculatorProps {
  onBack: () => void;
}

const GPACalculator = ({ onBack }: GPACalculatorProps) => {
  const [courses, setCourses] = useState<CalculatorCourse[]>([
    { name: '', credits: 3, grade: '' }
  ]);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', credits: 3, grade: '' }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: keyof CalculatorCourse, value: string | number) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(c => c.grade && c.credits > 0);
    if (validCourses.length === 0) return 0;

    const totalPoints = validCourses.reduce((sum, course) => {
      return sum + (gradePoints[course.grade] * course.credits);
    }, 0);

    const totalCredits = validCourses.reduce((sum, course) => sum + course.credits, 0);
    
    return totalPoints / totalCredits;
  };

  const gpa = calculateGPA();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2"
        >
          <ArrowDown className="h-4 w-4 mr-2 rotate-90" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">GPA Calculator</h1>
        <p className="text-gray-600 mt-2">
          Calculate your potential GPA based on course grades and credits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>
                Enter your courses, credits, and expected/actual grades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.map((course, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <Input
                      placeholder="Course name (optional)"
                      value={course.name}
                      onChange={(e) => updateCourse(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      placeholder="Credits"
                      min="1"
                      max="6"
                      value={course.credits}
                      onChange={(e) => updateCourse(index, 'credits', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="w-32">
                    <Select
                      value={course.grade}
                      onValueChange={(value) => updateCourse(index, 'grade', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(gradePoints).map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade} ({gradePoints[grade].toFixed(1)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {courses.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCourse(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={addCourse}
                className="w-full border-dashed border-2 h-12"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Calculated GPA</CardTitle>
              <CardDescription>Your projected semester GPA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-900 mb-4">
                  {gpa.toFixed(2)}
                </div>
                <div className="space-y-2">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    gpa >= 3.5 ? 'bg-green-100 text-green-800' :
                    gpa >= 3.0 ? 'bg-blue-100 text-blue-800' :
                    gpa >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {gpa >= 3.5 ? 'Excellent' :
                     gpa >= 3.0 ? 'Good' :
                     gpa >= 2.5 ? 'Satisfactory' :
                     gpa > 0 ? 'Needs Improvement' : 'No Data'}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Total Credits:</span>
                      <span className="font-medium">
                        {courses.reduce((sum, c) => sum + (c.grade ? c.credits : 0), 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valid Courses:</span>
                      <span className="font-medium">
                        {courses.filter(c => c.grade && c.credits > 0).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
