import { Action } from "@ngrx/store";
import { DailyTopic } from "../../_models/DailyTopic";
import { TopicComment } from "../../_models/TopicComment";
import { TopicCommentFeel } from "../../_models/TopicCommentFeel";
import { importExpr } from "@angular/compiler/src/output/output_ast";

//====================================================
// Daily Topic Ranking
//====================================================
export const GET_TOPIC_LIST = 'GET_TOPIC_LIST';
export const SET_TOPIC_LIST = 'SET_TOPIC_LIST';
export const TRY_ADD_TOPIC = 'TRY_ADD_TOPIC';
export const ADD_TOPIC = 'ADD_TOPIC';
export const TRY_DELETE_TOPIC = 'TRY_DELETE_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';
export const LIKE_TOPIC = 'LIKE_TOPIC';

export class GetTopicList implements Action {
    readonly type = GET_TOPIC_LIST;
    constructor(public payload:string) {} //userId
}

export class SetTopicList implements Action {
    readonly type = SET_TOPIC_LIST;
    constructor(public payload: DailyTopic[]) {}
}

export class TryAddTopic implements Action {
    readonly type = TRY_ADD_TOPIC;
    constructor(public payload: {userId: string, title: string}){}
}

export class AddTopic implements Action {
    readonly type = ADD_TOPIC;
    constructor(public payload: DailyTopic){}
}

export class TryDeleteTopic implements Action {
    readonly type = TRY_DELETE_TOPIC;
    constructor(public payload: {userId: string, id: number}){}
}

export class DeleteTopic implements Action {
    readonly type = DELETE_TOPIC;
    constructor(public payload: number) {}
}

export class LikeTopic implements Action {
    readonly type = LIKE_TOPIC;
    constructor(public payload: {supportUserId: string, dailyTopicId:number}){}
}

//====================================================
// Daily Topic Comments
//====================================================
export const GET_TOPIC_COMMENTS = 'GET_TOPIC_COMMENTS';
export const SET_TOPIC_COMMENTS = 'SET_TOPIC_COMMENTS';
export const TRY_ADD_TOPIC_COMMENT = 'TRY_ADD_TOPIC_COMMENT';
export const ADD_TOPIC_COMMENT = 'ADD_TOPIC_COMMENT';
export const TRY_DELETE_TOPIC_COMMENT = 'TRY_DELETE_TOPIC_COMMENT';
export const DELETE_TOPIC_COMMENT = 'DELETE_TOPIC_COMMENT';

export const GET_TOPIC_REPLIES = 'GET_TOPIC_REPLIES';
export const SET_TOPIC_REPLIES = 'SET_TOPIC_REPLIES';
export const TRY_ADD_TOPIC_REPLY = 'TRY_ADD_TOPIC_REPLY';
export const ADD_TOPIC_REPLY = 'ADD_TOPIC_REPLY';
export const TRY_DELETE_TOPIC_REPLY = 'TRY_DELETE_TOPIC_REPLY';
export const DELETE_TOPIC_REPLY = 'DELETE_TOPIC_REPLY';

export const GET_COMMENT_FEELINGS = 'GET_COMMENT_FEELINGS';
export const SET_COMMENT_FEELINGS = 'SET_COMMENT_FEELINGS';
export const TRY_ADD_COMMENT_FEELING = 'TRY_ADD_COMMENT_FEELING';
export const ADD_COMMENT_FEELING = 'ADD_COMMENT_FEELING';

export class GetTopicComments implements Action {
    readonly type = GET_TOPIC_COMMENTS;
    constructor(public payload: number) {}// memberId
}

export class SetTopicComments implements Action {
    readonly type = SET_TOPIC_COMMENTS;
    constructor(public payload: {comments: TopicComment[], memberId: number}) {}
}

export class TryAddTopicComment implements Action {
    readonly type = TRY_ADD_TOPIC_COMMENT;
    constructor(public payload: {memberId: number, topicTitle: string, comment: string}){}
}

export class AddTopicComment implements Action {
    readonly type = ADD_TOPIC_COMMENT;
    constructor(public payload: TopicComment){}
}

export class TryDeleteTopicComment implements Action {
    readonly type = TRY_DELETE_TOPIC_COMMENT;
    constructor(public payload: number){} //CommentId
}

export class DeleteTopicComment implements Action {
    readonly type = DELETE_TOPIC_COMMENT;
    constructor(public payload: number) {}
}

export class GetCommentFeelings implements Action {
    readonly type = GET_COMMENT_FEELINGS;
    constructor(public payload: number){} //memberId
}

export class SetCommentFeelings implements Action {
    readonly type = SET_COMMENT_FEELINGS;
    constructor(public payload: TopicCommentFeel[]){}
}

export class TryAddCommentFeeling implements Action {
    readonly type = TRY_ADD_COMMENT_FEELING;
    constructor(public payload: TopicCommentFeel){}
}

export class AddCommentFeeling implements Action {
    readonly type = ADD_COMMENT_FEELING;
    constructor(public payload: TopicCommentFeel){}
}



export type DailyTopicActions = GetTopicList 
                          | SetTopicList
                          | TryAddTopic
                          | AddTopic
                          | TryDeleteTopic
                          | DeleteTopic
                          | LikeTopic
                          | GetTopicComments
                          | SetTopicComments
                          | TryAddTopicComment
                          | AddTopicComment
                          | TryDeleteTopicComment
                          | DeleteTopicComment
                          | GetCommentFeelings
                          | SetCommentFeelings
                          | TryAddCommentFeeling
                          | AddCommentFeeling;