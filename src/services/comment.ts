import type { GetCommentApi } from '~/typings/comment'

export const getCommentApi: GetCommentApi = (episodeId, params) => axios.get(`/comment/${episodeId}`, { params })
export const getCommentUrl = (episodeId: number, params: Record<string, string>) =>
  `${axios.defaults.baseURL}/comment/${episodeId}?${new URLSearchParams(params).toString()}`
