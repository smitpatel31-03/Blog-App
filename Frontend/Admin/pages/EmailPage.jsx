import React, { useState, useEffect } from 'react';
import Service from '../src/services/conf.js';

function EmailPage() {
  const [allSubscriberMail, setAllSubscriberMail] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await Service.getAllSubmail();
        setAllSubscriberMail(data);
      } catch (error) {
        console.error('Failed to fetch subscriber emails:', error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2">
          📧 Subscriber Emails
        </h1>
        {allSubscriberMail.length === 0 ? (
          <p className="text-gray-400">No subscriber emails found.</p>
        ) : (
          <ul className="space-y-2">
            {allSubscriberMail.map((subscriber) => (
              <li
                key={subscriber._id}
                className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition"
              >
                {subscriber.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EmailPage;
