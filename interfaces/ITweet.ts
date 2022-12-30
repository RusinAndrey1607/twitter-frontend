
export interface ITweet extends TweetCreationAttributes{
    blocked: boolean,
    likes: number[],
    id: number,
    author: string,
    author_username: string,
    avatar: string,
    updatedAt: string,
    createdAt: string,
    reply: number | null,
}
export interface TweetCreationAttributes {
    text: string,
    hashTags?: string[],
    image?:string,

}