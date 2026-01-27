import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Landing Your Dream Job",
      excerpt: "Discover the essential strategies that will help you stand out in today's competitive job market...",
      author: "Career Expert",
      date: "2024-01-15",
      category: "Career Advice"
    },
    {
      id: 2,
      title: "Remote Work: The Future of Employment",
      excerpt: "Explore how remote work is changing the landscape of modern employment and what it means for you...",
      author: "Industry Analyst",
      date: "2024-01-10",
      category: "Remote Work"
    },
    {
      id: 3,
      title: "Essential Skills for Tech Professionals in 2024",
      excerpt: "Stay ahead of the curve with these in-demand technical skills that employers are looking for...",
      author: "Tech Recruiter",
      date: "2024-01-05",
      category: "Technology"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Blog</h1>
          <p className="text-xl text-gray-600">
            Insights, tips, and trends to help you advance your career
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <button className="text-blue-600 hover:text-blue-500 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated with Career Insights
          </h2>
          <p className="text-blue-100 mb-6">
            Get the latest career advice and job market trends delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-6 py-2 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
