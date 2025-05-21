import React, { useState, useEffect } from 'react';
import Service from '../src/services/conf.js';

function EmailPage() {
  const [allSubscriberMail, setAllSubscriberMail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await Service.getAllSubmail();
        console.log('Fetched subscribers:', response.data || response);
        setAllSubscriberMail(response.data || response);
      } catch (error) {
        console.error('Failed to fetch subscriber emails:', error);
        setFetchError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

    console.log("allSubscriberMail:",allSubscriberMail);
    
  }, []);

  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p>Error: {fetchError}</p>;

  return (
    <div>
      <h1>Subscriber Emails</h1>
      {allSubscriberMail.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <ul>
          {allSubscriberMail.map((item) => (
            <li key={item._id}>{item.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmailPage;
