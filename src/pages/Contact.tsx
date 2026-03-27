import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { PageMeta } from '../lib/PageMeta';
import { submitInquiry, fetchContactDetails } from '../services/googleSheets';

export const Contact = () => {
const [formData, setFormData] = React.useState({
firstName: '',
lastName: '',
email: '',
message: ''
});

const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
const [contactInfo, setContactInfo] = React.useState<any>(null);
const [loading, setLoading] = React.useState(true);

// 🔥 SAFE FETCH
React.useEffect(() => {
const loadContact = async () => {
try {
const data = await fetchContactDetails();
console.log("CONTACT DATA:", data);

```
    if (Array.isArray(data) && data.length > 0) {
      setContactInfo(data[0]);
    }
  } catch (err) {
    console.error("Error fetching contact:", err);
  } finally {
    setLoading(false);
  }
};

loadContact();
```

}, []);

// 🔥 SAFE FIELD ACCESS (case-insensitive)
const getField = (obj: any, keys: string[]) => {
if (!obj) return "";
for (let key of keys) {
if (obj[key] !== undefined) return obj[key];
}
return "";
};

const address = getField(contactInfo, ["address"]);
const primaryPhone = getField(contactInfo, ["primaryphone", "primaryPhone"]);
const secondaryPhone = getField(contactInfo, ["secondaryphone", "secondaryPhone"]);
const email = getField(contactInfo, ["email"]);
const logo = getField(contactInfo, ["logo", "Logo"]);
const hours = getField(contactInfo, ["hours"]);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setStatus('loading');

```
try {
  await submitInquiry({
    parentName: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    mobile: 'N/A',
    branch: 'Contact Page',
    message: formData.message
  });

  setStatus('success');
  setFormData({ firstName: '', lastName: '', email: '', message: '' });

  setTimeout(() => setStatus('idle'), 4000);
} catch {
  setStatus('error');
  setTimeout(() => setStatus('idle'), 4000);
}
```

};

return (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20">

```
  <PageMeta 
    title="Contact Al-Muminah School Surat | Admissions & Enquiry"
    description="Get in touch with Al-Muminah School Surat for admissions and enquiries."
  />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20">

    {/* LEFT SIDE */}
    <div>

      {/* Logo */}
      {logo && (
        <img 
          src={logo} 
          alt="School Logo" 
          className="h-16 mb-6"
        />
      )}

      <h1 className="text-5xl font-serif text-brand-green mb-6">
        Contact Us
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading contact details...</p>
      ) : (
        <div className="space-y-8">

          {/* Address */}
          <div className="flex items-start space-x-4">
            <MapPin />
            <p>{address || "Address not available"}</p>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <Phone />
            <div>
              {primaryPhone ? (
                <a href={`tel:${primaryPhone}`}>
                  {primaryPhone}
                </a>
              ) : (
                <p>Phone not available</p>
              )}

              {secondaryPhone && (
                <p>{secondaryPhone}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <Mail />
            {email ? (
              <a href={`mailto:${email}`}>
                {email}
              </a>
            ) : (
              <p>Email not available</p>
            )}
          </div>

          {/* Hours */}
          <div className="flex items-start space-x-4">
            <Clock />
            <p>{hours || "Timing not available"}</p>
          </div>

        </div>
      )}
    </div>

    {/* RIGHT SIDE FORM */}
    <div className="bg-white p-8 rounded-2xl shadow">

      <h3 className="text-2xl font-semibold mb-6">Send Message</h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="First Name"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Last Name"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Message"
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-brand-green text-white py-3 rounded"
        >
          {status === 'loading' ? "Sending..." : "Send Message"}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">Message sent successfully</p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-center">Error sending message</p>
        )}

      </form>
    </div>

  </div>
</motion.div>
```

);
};
