import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former HR tech executive with 15+ years experience"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Full-stack engineer passionate about building scalable platforms"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "Product expert focused on user experience and innovation"
    },
    {
      name: "David Kim",
      role: "Head of Sales",
      description: "Building relationships with companies and job seekers"
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Job Seekers" },
    { number: "10K+", label: "Partner Companies" },
    { number: "50K+", label: "Jobs Posted Monthly" },
    { number: "85%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About JobPortal</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Connecting talented professionals with their dream opportunities since 2024. 
            We're revolutionizing the job search experience with technology and human touch.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="text-center mb-8">
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To make job searching and recruiting more efficient, transparent, and rewarding for everyone involved. 
              We believe the right opportunity can change lives, and we're here to make those connections happen.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">People First</h3>
              <p className="text-gray-600">
                We prioritize the needs and experiences of both job seekers and recruiters in everything we do.
              </p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Diversity & Inclusion</h3>
              <p className="text-gray-600">
                We're committed to creating an inclusive platform that welcomes talent from all backgrounds.
              </p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in our technology, service, and the results we deliver to our users.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 rounded-full h-24 w-24 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed mb-6">
            JobPortal was born from a simple observation: the traditional job search process is broken. 
            Job seekers struggle to find relevant opportunities, while recruiters waste time sifting through 
            unqualified applicants. Our founders, experienced professionals from both sides of the hiring process, 
            decided to build a better way.
          </p>
          <p className="text-lg leading-relaxed">
            Since our launch in 2024, we've helped hundreds of thousands of people find their dream jobs 
            and thousands of companies build amazing teams. But we're just getting started. Our commitment to 
            innovation and user-centric design drives us to continuously improve and expand our platform.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-md p-8">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Whether you're looking for your next opportunity or seeking top talent, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
