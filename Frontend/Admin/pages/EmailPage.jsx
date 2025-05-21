import React,{ useState,useEffect} from 'react'
import Service from '../src/services/conf.js'


function EmailPage() {
const [allSubscriberMail, setAllSubscriberMail] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await Service.getBlogsDetails(id);
        console.log('data:', data);
        setAllSubscriberMail(data);
      } catch (error) {
        console.error('Failed to fetch blog details:', error);
      }
    };

 
      fetchDetails();
    
      console.log("allSubscriberMail :",allSubscriberMail);
      
  }, []);
  return (
    <div>
      hii
    </div>
  )
}

export default EmailPage
