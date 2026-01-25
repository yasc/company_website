'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Hero } from '@/components/sections';

const offices = [
  {
    city: 'Washington, DC',
    address: '1200 K Street NW, Suite 800',
    phone: '+1 (202) 555-0100',
    email: 'dc@appliedeconomics.com',
  },
  {
    city: 'New York, NY',
    address: '350 Fifth Avenue, Suite 4500',
    phone: '+1 (212) 555-0100',
    email: 'ny@appliedeconomics.com',
  },
  {
    city: 'San Francisco, CA',
    address: '101 California Street, Suite 2800',
    phone: '+1 (415) 555-0100',
    email: 'sf@appliedeconomics.com',
  },
];

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'research', label: 'Research Partnership' },
  { value: 'media', label: 'Media Inquiry' },
  { value: 'careers', label: 'Career Opportunities' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Log form data to console (for now)
    console.log('Form submitted:', formData);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero */}
      <Hero
        headline="Get in Touch"
        subheadline="Whether you have a question about our services, research, or career opportunities, we'd love to hear from you."
        variant="dark"
      />

      {/* Contact Form and Info */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-h2 text-navy-800 mb-6">Send us a message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-h3 text-navy-800 mb-2">Thank you!</h3>
                  <p className="text-body text-gray-600">
                    We've received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-small font-medium text-gray-700 mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-small font-medium text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Organization */}
                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-small font-medium text-gray-700 mb-2"
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      placeholder="Your organization (optional)"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-small font-medium text-gray-700 mb-2"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-small font-medium text-gray-700 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-h2 text-navy-800 mb-6">Our Offices</h2>

              <div className="space-y-8">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="border-l-4 border-teal-500 pl-6"
                  >
                    <h3 className="text-h4 text-navy-800 mb-2">{office.city}</h3>
                    <div className="space-y-1 text-body text-gray-600">
                      <p>{office.address}</p>
                      <p>
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-teal-600 transition-colors"
                        >
                          {office.phone}
                        </a>
                      </p>
                      <p>
                        <a
                          href={`mailto:${office.email}`}
                          className="hover:text-teal-600 transition-colors"
                        >
                          {office.email}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* General Contact */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-h4 text-navy-800 mb-4">General Inquiries</h3>
                <p className="text-body text-gray-600 mb-2">
                  <a
                    href="mailto:info@appliedeconomics.com"
                    className="hover:text-teal-600 transition-colors"
                  >
                    info@appliedeconomics.com
                  </a>
                </p>
                <p className="text-body text-gray-600">
                  <a
                    href="tel:+12025550100"
                    className="hover:text-teal-600 transition-colors"
                  >
                    +1 (202) 555-0100
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
