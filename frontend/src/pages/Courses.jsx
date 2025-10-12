import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Star } from "lucide-react";

import course1 from "../assets/course1.png";
import course2 from "../assets/course2.png";
import course3 from "../assets/course3.png";
import course4 from "../assets/course4.png";

const coursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    instructor: "John Doe",
    category: "Web Development",
    hours: 40,
    rating: 4.8,
    description: "Learn to build complete web apps using React and Django.",
    image: course1,
  },
  {
    id: 2,
    title: "Data Science Essentials",
    instructor: "Emily Smith",
    category: "Data Science",
    hours: 35,
    rating: 4.6,
    description: "Understand data analysis, visualization, and machine learning basics.",
    image: course2,
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    instructor: "Ali Hassan",
    category: "Marketing",
    hours: 25,
    rating: 4.7,
    description: "Master SEO, social media marketing, and Google Ads.",
    image: course3,
  },
  {
    id: 4,
    title: "React Front-End Developer",
    instructor: "Sarah Johnson",
    category: "Web Development",
    hours: 30,
    rating: 4.9,
    description: "Master React, hooks, and UI design with best practices.",
    image: course4,
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const [selectedCourse, setSelectedCourse] = useState(null);

  
  let filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

 
  if (sortOption === "name") {
    filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "hours-asc") {
    filteredCourses.sort((a, b) => a.hours - b.hours);
  } else if (sortOption === "hours-desc") {
    filteredCourses.sort((a, b) => b.hours - a.hours);
  }

 
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} fill="currentColor" size={18} />
        ))}
        {halfStar && <Star fill="currentColor" size={18} className="opacity-50" />}
      </div>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Explore Our Courses
      </h1>

      {/* 🔎 Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search by course or instructor..."
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">Sort by</option>
          <option value="name">Name (A–Z)</option>
          <option value="hours-asc">Hours (Shortest → Longest)</option>
          <option value="hours-desc">Hours (Longest → Shortest)</option>
        </select>
      </div>

      {/* 📚 Courses Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="shadow-md hover:shadow-xl transition">
            <img
              src={course.image}
              alt={course.title}
              className="rounded-t-lg w-full h-40 object-cover"
            />
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
              <p className="text-gray-600 text-sm">Instructor: {course.instructor}</p>
              <Badge>{course.category}</Badge>
              <p className="text-gray-500 text-sm">{course.hours} hours</p>
              {renderStars(course.rating)}
              <Button className="w-full mt-2" onClick={() => setSelectedCourse(course)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 💬 Modal for Course Details */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-lg">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCourse.title}</DialogTitle>
              </DialogHeader>
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="rounded-lg w-full h-48 object-cover mb-4"
              />
              <p className="text-gray-600 mb-2">{selectedCourse.description}</p>
              <p className="text-sm text-gray-500 mb-1">
                Instructor: {selectedCourse.instructor}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Duration: {selectedCourse.hours} hours
              </p>
              {renderStars(selectedCourse.rating)}
              <Button className="mt-4 w-full">Enroll Now</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Courses;
