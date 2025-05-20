
import { useParams } from 'react-router-dom';
import { AddUpdateBlog } from '../component';
import {useEffect,useState} from 'react';
import Service from '../src/services/conf.js';

function UpdateBlog() {
  const { id } = useParams();
  const [blogInformation, setBlogInformation] = useState(null);
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const data = await Service.getBlogsDetails(id);
          console.log('data:', data);
          setBlogInformation(data);
          
          
        } catch (error) {
          console.error('Failed to fetch blog details:', error);
        }
      };
  
      if (id) {
        fetchDetails();
      }
    }, [id]);

    console.log("blogInformation :",blogInformation);
    

  return (
    <div>
      <AddUpdateBlog isUpdateMode={true} blogData={blogInformation} />
    </div>
  )
}

export default UpdateBlog

