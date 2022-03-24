/* http://localhost:1337/api/comments?populate=*&sort[0]=createdAt&filters[bug][id][$eq]=${bugId} */
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { request } from 'lib/fetch'

const QUERY_KEY = "comments"

const getComments = async (id: string) => {
    const response = await request({ url: `/comments?populate=*&sort[0]=createdAt&filters[bug][id][$eq]=${id}` })
    return await response.data
}

const postComment = async (data) => {
    const response = await request({ url: "/comments?populate=*", method: 'post', data: { data } })
    return await response.data
}

export const useCommentsData = (id: string) => {
    return useQuery(
        QUERY_KEY, () => getComments(id)
    );
}

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (data) => await postComment(data), {
        onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
    }
    )
}
