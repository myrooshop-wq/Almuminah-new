import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { PageMeta } from '../lib/PageMeta';
import { submitInquiry, fetchContactDetails } from '../services/googleSheets';

export const Contact = () => {

const [formData, setFormData] = useState({
firstName: '',
lastName: '',
email: '',
message: ''
});

const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
const [contactInfo, setContactInfo] = useState<any>(null);
const [loading, setLoading] = useState(true);

// ✅ FETCH DATA
useEffect(() => {
const load = async () => {
try {
const data = await fetchContactDetails();
if (Array.isArray(data) && data.length > 0) {
setContactInfo(data[0]);
}
} catch (e) {
console.error(e);
} finally {
setLoading(false);
}
};
load();
}, []);

// ✅ SAFE FIELD ACCESS (NO ERROR)
const getField = (obj: any, keys: string[]): string => {
if (!obj) return "";
for (let i = 0; i < keys.length; i++) {
const key = keys[i];
if (obj[key] !== undefined) return String(obj[key]);
}
return "";
};

const address = getField(contactInfo, ["address"]);
const phone = getField(contactInfo, ["primaryphone", "primaryPhone"]);
const phone2 = getField(contactInfo, ["secondaryphone", "secondaryPhone"]);
const email = getField(contactInfo, ["email"]);
const logo = getField(contactInfo, ["logo", "Logo"]);
const hours = getField(contactInfo, ["hours"]);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setStatus('loading');

```
try {
  await submitInquiry({
    parentName: formData.firstName + " " + formData.lastName,
    email: formData.email,
    mobile: 'N/A',
    branch: 'Contact Page',
    message: formData.message
  });

  setStatus('success');
  setFormData({ firstName: '', lastName: '', email: '', message: '' });

  setTimeout(() => setStatus('idle'), 3000);
} catch {
  setStatus('error');
  setTimeout(() => setStatus('idle'), 3000);
}
```

};

return (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20">

```
  <PageMeta 
    title="Contact Al-Muminah School Surat"
    description="Contact us for admissions and enquiries."
  />

  <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20">

    {/* LEFT */}
    <div>

      {logo && (
        <img src={logo} alt="logo" className="h-16 mb-6" />
      )}

      <h1 className="text-4xl mb-6">Contact Us</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">

          <div className="flex gap-3">
            <MapPin /> <p>{address}</p>
          </div>

          <div className="flex gap-3">
            <Phone />
            <div>
              <a href={`tel:${phone}`}>{phone}</a>
              {phone2 && <p>{phone2}</p>}
            </div>
          </div>

          <div className="flex gap-3">
            <Mail />
            <a href={`mailto:${email}`}>{email}</a>
          </div>

          <div className="flex gap-3">
            <Clock /> <p>{hours}</p>
          </div>

        </div>
      )}
    </div>

    {/* RIGHT FORM */}
    <div className="bg-white p-6 rounded shadow">

      <form onSubmit={handleSubmit} className="space-y-4">

        <input placeholder="First Name" required
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
        />

        <input placeholder="Last Name" required
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
        />

        <input type="email" placeholder="Email" required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <textarea placeholder="Message" required
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />

        <button type="submit">
          {status === 'loading' ? "Sending..." : "Send"}
        </button>

        {status === 'success' && <p>Sent successfully</p>}
        {status === 'error' && <p>Error</p>}

      </form>
    </div>

  </div>
</motion.div>
```

);
};
