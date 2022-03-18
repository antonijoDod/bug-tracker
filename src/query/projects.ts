import {useQuery} from 'react-query'
import axios from 'axios'


export const useProjects = (currentPaginationPage, query) => {
    return useQuery(
        ["projects", currentPaginationPage],
        async () => {
          const res = await axios(`http://localhost:1337/api/projects?${query}`);
          const products = await res.data;
          return products;
        }
      );
    
}