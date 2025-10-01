import { useEffect, useState } from 'react';
import { useGetConversationHistoryMutation, useGetConversationsMutation } from '../hooks/useChat';
import chatStore from '../zustand/stores/chatStore';
import { MessageContent } from '../interfaces/chatInterface';
import Avatar from 'react-avatar';
import { BsStars } from 'react-icons/bs';
import ChartComponent from '../components/ChartComponent';

// import axios from 'axios';

const ChatHistory = () => {
  const chats = chatStore((state) => state.chats);
  const [selectedChat, setSelectedChat] = useState<number>(0);
  const [messages, setMessages] = useState<MessageContent[]>([]);
  const { mutate: getConversations, status } = useGetConversationsMutation();
  const { mutate: getConversationMessageHistory, status: conversationLoader } =
    useGetConversationHistoryMutation({
      onSuccess: (response) => {
        setMessages(response);
      },
    });

  useEffect(() => {
    getConversations();
  }, []);

  const chatHistory = async (conversation_id: number) => {
    console.log(conversation_id);
    setSelectedChat(conversation_id);
    getConversationMessageHistory(conversation_id);
  };

  return (
    <div className="flex flex-col py-8 pr-8 h-screen">
      <div className="h-full flex rounded-[20px] bg-white border border-blue-gray-100 dark:bg-maroon-400 dark:border-maroon-600 w-full">
        <div className="w-1/6 bg-yellow-gray-50 rounded-l-[20px] border-r border-l-blue-gray-100 flex flex-col h-full">
          {/* Fixed header */}
          <div className="sticky top-0 bg-yellow-gray-50 z-10">
            <p className="text-center font-medium font-yellow-gray-600 py-4 border-b-2">
              Chat history
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {status === 'pending'
              ? [...Array(5)].map((_, index) => (
                  <div className="border-b px-6 py-4 w-full animate-pulse" key={index}>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              : chats.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => chatHistory(chat?.id)}
                    className={`border-b px-6 py-4 truncate w-full hover:bg-yellow-gray-100/50 cursor-pointer font-normal font-yellow-gray-600 ${
                      selectedChat === chat?.id ? 'bg-yellow-gray-100' : ''
                    }`}
                  >
                    {chat?.title}
                  </div>
                ))}
          </div>
        </div>
        <div className="p-5">
          {conversationLoader === 'pending' ? (
            <p>Loading...</p>
          ) : (
            messages?.map((message, index) => {
              if (message?.question) {
                return (
                  <div className="mb-6 flex items-start" key={index}>
                    <Avatar
                      name="Spandan Joshi"
                      size="40"
                      className="h-8 w-8 mr-2 rounded-md flex-shrink-0"
                    />
                    <p className="text-md text-navy-600">{message?.question}</p>
                  </div>
                );
              } else {
                return message.answer?.map((data: any) => {
                  console.log([data.formatted_data_for_visualization]);
                  if (data?.answer) {
                    return (
                      <div className="mb-6 bg-blue-gray-50 rounded-lg p-4">
                        <div className="flex items-start mb-4">
                          <BsStars className="text-3xl text-navy-600 mr-2 flex-shrink-0" />
                          <p>{data?.answer}</p>
                        </div>
                      </div>
                    );
                  } else if (
                    data?.recommended_visualization &&
                    data?.formatted_data_for_visualization
                  ) {
                    return (
                      <div className="w-full h-[400px]">
                        <ChartComponent
                          type={data?.recommended_visualization || ''}
                          data={data?.formatted_data_for_visualization}
                        />
                      </div>
                    );
                  }
                });
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
