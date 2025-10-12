// src/pages/CourseDetails.jsx
import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";

import course1 from "../assets/course1.png";
import course2 from "../assets/course2.png";
import course3 from "../assets/course3.png";
import course4 from "../assets/course4.png";

/* ---------- Mock data (replace with API later) ---------- */
const coursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    instructor: "John Doe",
    category: "Web Development",
    hours: 40,
    rating: 4.8,
    price: 49.99,
    description: "Learn to build complete web apps using React and Django. Includes projects and quizzes.",
    image: course1,
    curriculum: [
      { id: "m1", title: "Introduction & Setup", lessons: ["Welcome", "Install tools", "Project init"], minutes: 20 },
      { id: "m2", title: "Frontend with React", lessons: ["JSX & Components", "State & Props", "Routing"], minutes: 240 },
      { id: "m3", title: "Backend with Django", lessons: ["Models & Migrations", "REST APIs", "Auth"], minutes: 300 },
      { id: "m4", title: "Deployment", lessons: ["Dockerize", "Deploy to VPS"], minutes: 60 },
    ],
    reviews: [
      { id: 1, name: "Ali", rating: 5, comment: "Excellent course! Clear explanations and great projects.", date: "2025-03-10" },
      { id: 2, name: "Sara", rating: 4, comment: "Very informative, could use more exercises.", date: "2025-05-02" },
    ],
  },
  {
    id: 2,
    title: "Data Science Essentials",
    instructor: "Emily Smith",
    category: "Data Science",
    hours: 35,
    rating: 4.6,
    price: 39.99,
    description: "Understand data analysis, visualization, and machine learning basics.",
    image: course2,
    curriculum: [
      { id: "m1", title: "Python for Data", lessons: ["Numpy", "Pandas"], minutes: 120 },
      { id: "m2", title: "Visualization", lessons: ["Matplotlib", "Seaborn"], minutes: 90 },
    ],
    reviews: [
      { id: 1, name: "Khaled", rating: 5, comment: "Great intro to DS.", date: "2024-12-01" },
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    instructor: "Ali Hassan",
    category: "Marketing",
    hours: 25,
    rating: 4.7,
    price: 29.99,
    description: "Master SEO, social media marketing, and Google Ads.",
    image: course3,
    curriculum: [
      { id: "m1", title: "SEO Basics", lessons: ["On-page", "Off-page"], minutes: 60 },
    ],
    reviews: [{ id: 1, name: "Mona", rating: 4, comment: "Useful and practical.", date: "2025-01-15" }],
  },
  {
    id: 4,
    title: "React Front-End Developer",
    instructor: "Sarah Johnson",
    category: "Web Development",
    hours: 30,
    rating: 4.9,
    price: 44.99,
    description: "Master React, hooks, and UI design with best practices.",
    image: course4,
    curriculum: [
      { id: "m1", title: "React Basics", lessons: ["Components", "Hooks"], minutes: 180 },
    ],
    reviews: [{ id: 1, name: "Omar", rating: 5, comment: "The best React course I've taken.", date: "2025-04-07" }],
  },
];
/* -------------------------------------------------------- */

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id, 10);
  const course = coursesData.find((c) => c.id === courseId);

  // local states
  const [openEnroll, setOpenEnroll] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // related courses (same category, exclude current)
  const related = useMemo(
    () => coursesData.filter((c) => c.category === course?.category && c.id !== course?.id).slice(0, 3),
    [course]
  );

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-center text-gray-600">Course not found.</p>
        <div className="text-center mt-4">
          <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  // compute average rating & total reviews
  const avgRating = course.reviews.length
    ? course.reviews.reduce((s, r) => s + r.rating, 0) / course.reviews.length
    : course.rating;

  const totalReviews = course.reviews.length;

  // helper: star display (SVG inline to avoid extra deps)
  const Stars = ({ value, size = 18 }) => {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    const stars = [];
    for (let i = 0; i < full; i++) {
      stars.push(
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
          <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.522L19.336 24 12 19.897 4.664 24l1.502-8.728L.5 9.75l7.832-1.732z" />
        </svg>
      );
    }
    if (half) {
      stars.push(
        <svg key="half" width={size} height={size} viewBox="0 0 24 24" className="text-yellow-400">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGrad)" d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.522L19.336 24 12 19.897 4.664 24l1.502-8.728L.5 9.75l7.832-1.732z" />
        </svg>
      );
    }
    const emptyCount = 5 - stars.length;
    for (let i = 0; i < emptyCount; i++) {
      stars.push(
        <svg key={`e${i}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-yellow-400">
          <path d="M12 .587l3.668 7.431L23.5 9.75l-5.666 5.522L19.336 24 12 19.897 4.664 24l1.502-8.728L.5 9.75l7.832-1.732z" />
        </svg>
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // fake payment handler (simulate)
  const handleConfirmEnroll = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      setOpenEnroll(false);
      alert(`Payment successful. You are enrolled in "${course.title}" — (simulated)`);
    }, 1400);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
      {/* Top / Hero */}
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{course.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3">
            <div className="flex items-center gap-3">
              <img src={course.image} alt={course.title} className="w-28 h-20 object-cover rounded-md shadow" />
              <div>
                <p className="text-sm text-gray-600">Instructor</p>
                <p className="font-medium text-gray-800">{course.instructor}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Stars value={avgRating} />
                <div className="text-sm text-gray-600 ml-2">{avgRating.toFixed(1)} · {totalReviews} reviews</div>
              </div>

              <Badge className="ml-2">{course.category}</Badge>

              <div className="text-sm text-gray-600 ml-4">{course.hours} hours</div>
            </div>
          </div>

          <p className="text-gray-700 mt-3 leading-relaxed">{course.description}</p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Button onClick={() => setOpenEnroll(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Enroll Now - ${course.price.toFixed(2)}
            </Button>
            <Link to="/courses" className="inline-block">
              <Button className="border border-blue-600 text-blue-600 bg-white hover:bg-blue-50">Back to Courses</Button>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-2xl font-bold text-gray-800">${course.price.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Level</div>
              <div className="text-sm font-medium text-gray-800">Intermediate</div>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li>✔ Lifetime access</li>
            <li>✔ Certificate of completion</li>
            <li>✔ Downloadable resources</li>
            <li>✔ Access on mobile and TV</li>
          </ul>
        </aside>
      </div>

      {/* Curriculum */}
      <section className="bg-white border rounded-lg p-5 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
        <div className="space-y-3">
          {course.curriculum.map((module) => (
            <div key={module.id} className="border rounded-md overflow-hidden">
              <button
                className="w-full text-left px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
              >
                <div>
                  <div className="font-medium">{module.title}</div>
                  <div className="text-sm text-gray-500">{module.lessons.length} lessons · {module.minutes} min</div>
                </div>
                <div className="text-gray-600">{activeModule === module.id ? "−" : "+"}</div>
              </button>

              {activeModule === module.id && (
                <div className="px-4 py-3 bg-white">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {module.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{lesson}</span>
                        <span className="text-gray-400">7:30</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white border rounded-lg p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Student reviews</h2>
          <div className="flex items-center gap-3">
            <Stars value={avgRating} size={20} />
            <div className="text-sm text-gray-600">{avgRating.toFixed(1)}</div>
            <div className="text-sm text-gray-500">· {totalReviews} reviews</div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {(showAllReviews ? course.reviews : course.reviews.slice(0, 2)).map((r) => (
            <Card key={r.id} className="p-3">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-sm text-gray-500">{r.date}</div>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Stars value={r.rating} />
                    </div>
                    <p className="text-gray-700 mt-2 text-sm">{r.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {course.reviews.length > 2 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-blue-600 hover:underline text-sm"
              >
                {showAllReviews ? "Show less" : "Read all reviews"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Related Courses */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Related Courses</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {related.length ? (
            related.map((c) => (
              <Card key={c.id} className="overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-36 object-cover" />
                <CardContent>
                  <h4 className="font-medium text-gray-800">{c.title}</h4>
                  <p className="text-sm text-gray-500">{c.instructor}</p>
                  <div className="mt-3 flex gap-2">
                    <Link to={`/course/${c.id}`}>
                      <Button className="text-sm">View</Button>
                    </Link>
                    <Button className="text-sm" onClick={() => { setOpenEnroll(true); }}>
                      Enroll
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No related courses found.</p>
          )}
        </div>
      </section>

      {/* Enroll Modal */}
      <Dialog open={openEnroll} onOpenChange={setOpenEnroll}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll in "{course.title}"</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={course.image} alt={course.title} className="w-28 h-20 object-cover rounded" />
              <div>
                <div className="font-semibold text-gray-800">{course.title}</div>
                <div className="text-sm text-gray-600">Instructor: {course.instructor}</div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-lg font-bold">${course.price.toFixed(2)}</div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>Secure Checkout</div>
                <div className="mt-1 text-green-600 font-medium">Simulated</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">Payment method (simulated)</div>
              <div className="flex gap-2">
                <button className="px-3 py-2 border rounded text-sm">Credit Card</button>
                <button className="px-3 py-2 border rounded text-sm">PayPal</button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="bg-gray-200" onClick={() => setOpenEnroll(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmEnroll} className="bg-blue-600 text-white">
                {processingPayment ? "Processing..." : `Confirm & Pay $${course.price.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
