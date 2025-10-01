import { CHAT_ENDPOINTS } from './endPoints';
import { post, postStream } from './apiClient';
import {
    InitiateConversationRequestBody,
    InitiateConversationResponse,
    ChatRequestBody,
    ConversationsResponse,
    ConversationHistoryResponse
} from '../../interfaces/chatInterface';
import { ApiResponse } from '../../interfaces/globalInterfaces';

type ApiFunction<TInput, TOutput> = (data: TInput) => Promise<ApiResponse<TOutput>>;

export const initiateConversation:ApiFunction<InitiateConversationRequestBody, InitiateConversationResponse> = async (data) => {
    return await post(CHAT_ENDPOINTS.INITIATE_CONVERSATION, data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const askQuestion= async (data: ChatRequestBody,onDataChunk:any): Promise<Response> => {
    return await postStream(CHAT_ENDPOINTS.ASK_QUESTION, data,onDataChunk);
  };

  export const getConversations:ApiFunction<void, ConversationsResponse> = async () => {
    return await post(CHAT_ENDPOINTS.GET_CONVERSATIONS);
  };

  export const getConversationHistory:ApiFunction<number, ConversationHistoryResponse> = async (id:number) => {
    return await post(CHAT_ENDPOINTS.GET_CONVERSATION_HISTORY(id));
  };