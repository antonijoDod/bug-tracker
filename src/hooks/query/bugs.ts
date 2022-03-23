import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from 'lib/fetch'

const QUERY_KEY = "bugs"

const getBugs = async (query) => {
    const response = await request({ url: `/bugs?${query}` })
    return await response.data
}

const postBug = async (data) => {
    return await request({ url: "/bugs", method: 'post', data: { data } })
}

const deleteBug = async (id) => {
    const response = await request({ url: `/bugs/${id}`, method: "delete" })
    return await response.data
}

export const useBugsData = (currentPaginationPage, query) => {
    return useQuery(
        [QUERY_KEY, currentPaginationPage], async () => await getBugs(query)
    );
}

export const useDeleteBug = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (id) => await deleteBug(id), {
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