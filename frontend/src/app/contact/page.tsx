'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'research', label: 'Research Partnership' },
  { value: 'data', label: 'Data Licensing' },
  { value: 'media', label: 'Media Inquiry' },
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
    console.log('Form submitted:', formData);
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
      <section className="bg-white pt-24 lg:pt-36 pb-16 lg:pb-24">
        <Container>
          <p className="font-mono text-[16px] uppercase tracking-widest text-teal mb-6">Contact</p>
          <h1 className="text-h1 max-w-3xl mb-8">
            Every project starts with a conversation
          </h1>
          <p className="text-body-lg text-slate-600 max-w-2xl">
            Tell us about your challenge. We will outline how our team, methods, and data can help.
          </p>
        </Container>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <h2 className="text-h2 text-charcoal mb-8">Send us a message</h2>

              {submitted ? (
                <div className="bg-white border border-slate-200 p-10 text-center">
                  <div className="w-16 h-16 bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-teal"
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
                  <h3 className="text-h3 text-charcoal mb-2">Message received</h3>
                  <p className="text-body text-slate-600">
                    We typically respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="text-label block mb-2"
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
                        className="w-full px-4 py-3 border border-slate-300 bg-white focus:outline-none focus:border-charcoal transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="text-label block mb-2"
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
                        className="w-full px-4 py-3 border border-slate-300 bg-white focus:outline-none focus:border-charcoal transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Organization */}
                    <div>
                      <label
                        htmlFor="organization"
                        className="text-label block mb-2"
                      >
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 bg-white focus:outline-none focus:border-charcoal transition-colors"
                        placeholder="Your organization"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label
                        htmlFor="inquiryType"
                        className="text-label block mb-2"
                      >
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 bg-white focus:outline-none focus:border-charcoal transition-colors"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-label block mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 bg-white focus:outline-none focus:border-charcoal transition-colors resize-none"
                      placeholder="Tell us about your project or question"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-10 py-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info — Right */}
            <div className="lg:col-span-4 lg:col-start-9">
              <h2 className="text-h2 text-charcoal mb-8">Contact</h2>

              <dl className="space-y-8 mb-10">
                <div>
                  <dt className="text-label mb-2">Email</dt>
                  <dd>
                    <a
                      href="mailto:team@appliedeconomics.ai"
                      className="text-body text-teal hover:underline"
                    >
                      team@appliedeconomics.ai
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-label mb-2">Location</dt>
                  <dd className="text-body text-slate-600">
                    London, United Kingdom
                  </dd>
                </div>

                <div>
                  <dt className="text-label mb-2">Response Time</dt>
                  <dd className="text-body text-slate-600">
                    Typically within 24 hours
                  </dd>
                </div>
              </dl>

              {/* London map */}
              <div className="w-full aspect-[4/3] border border-slate-200 overflow-hidden">
                <iframe
                  title="London map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1800,51.4800,-0.0400,51.5500&layer=mapnik"
                  className="w-full h-full border-0 grayscale"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
