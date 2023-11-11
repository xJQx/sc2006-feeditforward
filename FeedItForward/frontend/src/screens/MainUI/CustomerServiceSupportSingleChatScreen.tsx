import React, { useState, useEffect } from "react";
import {IoSend, IoCallOutline} from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import {
  FormButton,
  FormContainer,
  FormInput,
  HorizontalDivider,
  Logo
} from "../../components";
import { ButtonBackNavigation } from "../../components";
import { useParams } from 'react-router-dom';
import { CustomerServiceSupportHistory } from "../../schemas/customerServiceSupportHistory";
import { messagesData, historyWithMessages } from "../../data/messagesData";


//havent add  websocket connection 

export const CustomerServiceSupportSingleChatScreen = () => {
  const { css_history_id } = useParams();
  const [selectedChat, setSelectedChat] = useState<CustomerServiceSupportHistory | null>(null);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    setInputMessage('');
  };

  useEffect(() => {
    // Fetch from backend, using mock data for noww
    const fetchData = async () => {
      try {
        // Simulating delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSelectedChat(historyWithMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [css_history_id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '10px', borderBottom: '1px solid #ccc', marginBottom:'10px' }}>
        <ButtonBackNavigation />
        {selectedChat && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div className="text-[28px] font-nunito font-bold text-left">{selectedChat.admin.user.name}</div>
            <div style={{display: 'flex'}}>
            <IoCallOutline style={{ marginLeft: '10px', fontSize: '24px', color: '#333' }} />
            <BsThreeDotsVertical style={{ marginLeft: '10px', fontSize: '24px', color: '#333' }} /></div>
          </div>
        )}
      </div>
  
      {/* Chat */}
      {selectedChat?.messages && (
        <div style={{overflowY: 'auto', height: '550px'}}>
          {selectedChat.messages.map((message) => (
            <div
              key={message.css_message_id}
              style={{
                display: 'flex',
                justifyContent: message.sender_user_id === selectedChat.admin.user.user_id ? 'flex-start' : 'flex-end',
               
              }}
            >
              {message.sender_user_id === selectedChat.admin.user.user_id && (
                <div style={{ margin: '5px' }}>
                  
                  <img
                      src={selectedChat.admin.user.profile_picture}
                      alt={selectedChat.admin.user.name}
                      className="w-10 h-10 rounded-lg object-cover object-center"
                    />
                </div>
              )}
              <div
                style={{
                  backgroundColor: message.sender_user_id === selectedChat.admin.user.user_id ? '#E5E5EA' : '#BAE8E8',
                  color: message.sender_user_id === selectedChat.admin.user.user_id ? '#000000' : 'black',
                  padding: '8px',
                  borderRadius: '10px',
                  margin: '5px',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1, borderRadius: '8px', padding: '8px', border: '2px solid #BAE8E8' }}
      />
      <button onClick={sendMessage} style={{ border: 'none', background: 'transparent', marginLeft: '5px' }}>
        <IoSend style={{ color: '#1BCCCC' }} />
      </button>
    </div>
    </div>
  );
  
  
};

