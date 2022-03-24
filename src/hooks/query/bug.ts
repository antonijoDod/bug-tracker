import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from 'lib/fetch'

const QUERY_KEY = "bug"

const getBug = async (id) => {
    const response = await request({ url: `/bugs/${id}?populate=*` })
    return await response.data
}

const postBug = async (data) => {
    return await request({ url: "/bugs", method: 'post', data: { data } })
}

const updateBug = async (id, data) => {
    const response = await request({ url: `/bugs/${id}`, data: { data }, method: "put" })
    return await response.data
}

const deleteBug = async (id) => {
    const response = await request({ url: `/bugs/${id}`, method: "delete" })
    return await response.data
}

const getAllBugProjects = async () => {
    const response = await request({ url: `/projects?&_limit=1` })
    return await response.data
}

export const useBugData = (id) => {
    return useQuery(
        QUERY_KEY, () => getBug(id)
    );
}

export const useUpdateBug = (id) => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => await updateBug(id, data), {
        onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
    }
    )
}

export const useDeleteBug = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => await deleteBug(data), {
        onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
    }
    )
}

export const useAddBug = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => postBug(data), {
        onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
    }
    )
}

export const useAllProjects = () => {
    return useQuery('allBugProjects', async () => await getAllBugProjects())
}