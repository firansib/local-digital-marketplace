import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const PAYMENT_METHODS = [
  { id: 'telebirr', label: 'Telebirr',  icon: '📱', desc: 'Pay with your Telebirr mobile wallet' },
  { id: 'cbe',      label: 'CBE Birr',  icon: '🏦', desc: 'Pay via Commercial Bank of Ethiopia' },
  { id: 'chapa',    label: 'Chapa',     icon: '💳', desc: 'Pay securely via Chapa gateway' },
];

function FormField({ label, id, type = 'text', required, value, onChange, placeholder, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
          error ? 'border-red-400' : 'border-gray-200'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1" role="alert">{error}</p>
      )}
    </div>
  );
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [payMethod, setPayMethod] = useState('telebirr');
  const [errors, setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 1600);
  };

  /* ── Success ── */
  if (success) {
    return (
      <div className="animate-page min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4" aria-hidden="true">🎉</div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Demo payment successful. Your digital products are ready for download.
            A confirmation has been sent to{' '}
            <span className="font-semibold text-gray-700">{form.email}</span>.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-bold text-green-700 mb-1">✅ Demo transaction only</p>
            <p className="text-xs text-green-600">
              No real payment was processed. This is a simulated checkout for demonstration purposes.
            </p>
          </div>
          <Link to="/products">
            <Button size="lg" fullWidth>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ── Empty cart ── */
  if (items.length === 0) {
    return (
      <div className="animate-page min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <p className="text-6xl mb-4" aria-hidden="true">🛒</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Nothing to checkout</h2>
          <p className="text-gray-400 text-sm mb-6">Add some products to your cart first.</p>
          <Link to="/products"><Button size="lg">Browse Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-page">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold">Checkout</h1>
          <p className="text-blue-100 text-sm mt-1">Complete your order below.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-7"
            aria-label="Checkout form"
          >
            {/* Contact info */}
            <fieldset className="flex flex-col gap-4">
              <legend className="text-base font-extrabold text-gray-900 mb-1">
                Customer Information
              </legend>
              <FormField
                label="Full Name" id="name" required
                value={form.name} onChange={handleChange}
                placeholder="e.g. Dawit Bekele"
                error={errors.name}
              />
              <FormField
                label="Email Address" id="email" type="email" required
                value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
              />
              <FormField
                label="Phone Number" id="phone" type="tel" required
                value={form.phone} onChange={handleChange}
                placeholder="+251 9XX XXX XXX"
                error={errors.phone}
              />
            </fieldset>

            {/* Payment */}
            <fieldset>
              <legend className="text-base font-extrabold text-gray-900 mb-1">
                Payment Method
              </legend>
              <p className="text-xs text-gray-400 mb-3">Demo only — no real transaction will be processed.</p>
              <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map(({ id, label, icon, desc }) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      payMethod === id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-100 bg-white hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio" id={id} name="paymentMethod"
                      value={id} checked={payMethod === id}
                      onChange={() => setPayMethod(id)}
                      className="accent-blue-600"
                    />
                    <span className="text-2xl" aria-hidden="true">{icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Demo notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
              ⚠️ <strong>Demo payment only</strong> — no real transaction will be processed and no money will be charged.
            </div>

            <Button type="submit" size="lg" fullWidth disabled={loading}>
              {loading ? 'Processing…' : 'Place Order'}
            </Button>
          </form>

          {/* Order summary */}
          <aside
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit sticky top-20"
            aria-label="Order summary"
          >
            <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>
            <ul className="space-y-3 mb-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span className="text-2xl shrink-0" aria-hidden="true">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.qty} × {item.price} ETB
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-700 shrink-0">
                    {item.price * item.qty} ETB
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 pt-4 flex justify-between text-base font-extrabold text-gray-900">
              <span>Total</span>
              <span>{total} ETB</span>
            </div>
            <Link to="/cart" className="block text-center text-xs text-blue-600 hover:underline mt-3">
              ← Edit cart
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
