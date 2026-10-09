import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function About() {
  return (
    <div className="animate-page">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold">About LocalMarket</h1>
          <p className="text-blue-100 text-sm mt-1">A platform built for local creators and learners.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-10">
        {/* Mission */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            LocalMarket is a simple, accessible digital marketplace built to connect Ethiopian creators
            with students, professionals, and learners who need quality digital resources at affordable prices.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            We believe that great study materials, e-books, templates, and digital tools should be
            accessible to everyone — no matter where you are in Ethiopia.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { emoji: '🇪🇹', title: 'Local First',      desc: 'Every product is created by talented Ethiopian creators who understand the local context and needs.' },
              { emoji: '💡', title: 'Accessibility',      desc: 'We keep prices affordable so that high-quality digital resources are within reach for everyone.' },
              { emoji: '⚡', title: 'Instant Delivery',   desc: 'Digital products are delivered instantly — no waiting, no shipping, no delays.' },
              { emoji: '🤝', title: 'Creator Support',    desc: 'We empower local creators to share their knowledge and earn from their expertise.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex gap-4">
                <span className="text-3xl shrink-0" aria-hidden="true">{emoji}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project note */}
        <section className="bg-blue-50 rounded-2xl border border-blue-100 p-8">
          <h2 className="text-lg font-extrabold text-blue-900 mb-3">About This Project</h2>
          <p className="text-blue-700 text-sm leading-relaxed mb-3">
            This project was built as part of the <strong>Codveda Front-End Development Internship — Level 2</strong>.
            It demonstrates a complete React Single Page Application using React Router, Context API for
            state management, and Tailwind CSS for responsive design.
          </p>
          <p className="text-blue-600 text-xs">
            All products, prices, and payment methods shown are for demonstration purposes only.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link to="/products">
            <Button size="lg">Browse All Products →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
