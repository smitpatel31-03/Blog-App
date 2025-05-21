import React, { useState, useEffect } from 'react';
import Service from '../src/services/conf.js';

function EmailPage() {
  const [allSubscriberMail, setAllSubscriberMail] = useState(null);

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
    <div>
      <h1>Subscriber Emails:</h1>
      <ul>
        {allSubscriberMail?.map((subscriber) => (
          <li key={subscriber._id}>{subscriber.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmailPage;
