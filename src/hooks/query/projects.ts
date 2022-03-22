import { useQuery, useMutation, useQueryClient } from 'react-query';
import {request} from 'lib/fetch'
import axios from 'axios'

const PROJECT_QUERY_KEY = "projects"

const getProjects = async (query) => {
  const response = await request({url: `/projects?${query}`})
  return await response.data
}

const postProject = async (data) => {
 return await request({url: "/projects", method: 'post', data: {data}})
}

const deleteProject = async (id) => {
  const response = await request({url: `/projects/${id}`, method: "delete"})
  return await response.data
}

export const useProjectsData = (currentPaginationPage, query) => {
    return useQuery(
        [PROJECT_QUERY_KEY, currentPaginationPage],  async() => await getProjects(query)
      );
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => await deleteProject(id), {
      onSuccess: () => queryClient.invalidateQueries(PROJECT_QUERY_KEY),
    }
 )
}

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation( 
   (data) => postProject(data), {
      onSuccess: () => queryClient.invalidateQueries(PROJECT_QUERY_KEY),
    }
  )
}