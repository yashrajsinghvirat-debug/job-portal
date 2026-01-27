import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Mail, Phone, MessageSquare, Book, Users, Shield } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign In' button and then 'Create Account'. Fill in your details and choose whether you're a job seeker or recruiter."
    },
    {
      question: "How do I apply for a job?",
      answer: "Browse jobs on the Jobs page, click on a job to view details, then click the 'Apply' button. You can track your applications in the dashboard."
    },
    {
      question: "How do recruiters post jobs?",
      answer: "Recruiters can post jobs by logging in and going to 'Post Job' in their dashboard. Fill in the job details and submit for approval."
    },
    {
      question: "Is JobPortal free to use?",
      answer: "Yes, JobPortal is free for job seekers. Recruiters can post a limited number of jobs for free, with premium plans available for additional features."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via email at support@jobportal.com or use the contact form below."
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions and get support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-3">
                <Link
                  to="/jobs"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Book className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Create Account
                </Link>
                <Link
                  to="/privacy"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  support@jobportal.com
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat (9 AM - 6 PM EST)
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Still Need Help?
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
