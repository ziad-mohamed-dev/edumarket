import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CourseDetails from "./pages/CourseDetails";


function App() {
  return (
    <Router>
      <Navbar />

      {/* ✅ هنا لازم نضيف الـ main-content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/course/:id" element={<CourseDetails/>} />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}


export default App;
