import React,{ useState,useEffect} from 'react'
import Service from '../src/services/conf.js'


function EmailPage() {
  const [allSubscriberMail, setAllSubscriberMail] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await Service.getAllSubmail();
        setAllSubscriberMail(data);
      } catch (error) {
        console.error('Failed to fetch blog details:', error);
      }
    };

    fetchDetails();
    
    console.log("allSubscriberMail:",allSubscriberMail);
  }, []);

  

  return (
    <div>
      <h1>Subscribers</h1>
      {allSubscriberMail ? (
        allSubscriberMail.map((email, index) => (
          <div key={index}>{email}</div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EmailPage
