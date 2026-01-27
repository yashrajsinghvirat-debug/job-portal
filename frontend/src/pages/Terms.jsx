import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Users, Briefcase, AlertTriangle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Last updated: January 2024
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                Agreement to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using JobPortal, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                User Accounts
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must be at least 18 years old to create an account</li>
                    <li>You may not share your account credentials with others</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Creating false or misleading profiles</li>
                    <li>Posting fraudulent or illegal job listings</li>
                    <li>Harassing or discriminating against other users</li>
                    <li>Using automated tools to scrape or spam the platform</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                Job Listings and Applications
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">For Recruiters</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>All job postings must be accurate and truthful</li>
                    <li>You must comply with all applicable employment laws</li>
                    <li>JobPortal reserves the right to remove inappropriate listings</li>
                    <li>You are responsible for screening and hiring decisions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">For Job Seekers</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Provide accurate information in your profile and applications</li>
                    <li>Apply only to positions you are genuinely interested in</li>
                    <li>Communicate professionally with recruiters</li>
                    <li>Respect the intellectual property of job listings</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-blue-600" />
                Disclaimers and Limitations
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Availability</h3>
                  <p className="text-gray-600">
                    JobPortal is provided "as is" without warranties of any kind. We do not guarantee 
                    uninterrupted or error-free service.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Accuracy</h3>
                  <p className="text-gray-600">
                    We are not responsible for the accuracy, completeness, or legitimacy of job postings. 
                    Users should conduct their own due diligence.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-600">
                    JobPortal shall not be liable for any indirect, incidental, or consequential damages 
                    arising from your use of our platform.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All content on JobPortal, including logos, text, graphics, and software, is owned by 
                JobPortal or its licensors and is protected by intellectual property laws.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Users retain ownership of their content but grant JobPortal a license to use, display, 
                and distribute such content for the purpose of operating our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                JobPortal reserves the right to suspend or terminate accounts that violate these terms. 
                Users may terminate their accounts at any time through their account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these Terms of Service from time to time. Users will be notified of 
                significant changes via email or through our platform. Continued use of the platform 
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@jobportal.com<br />
                  <strong>Address:</strong> 123 Business St, Suite 100, NY 10001<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
