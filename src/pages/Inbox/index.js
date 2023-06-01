import React, { useState, useEffect } from 'react';
import ContentHeader from './ContentHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConversationCard from './ConversationCard';
import ConversationBody from './ConversationBody';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineInbox } from 'react-icons/ai';
import './ConversationList.css';

import { ConversationApi } from '~/services/api';

async function getData() {
    try {
        const data = await ConversationApi.getConversations();
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

function Inbox() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    const handleSelectConversation = (conversationId) => {
        setSelectedConversation(conversationId);
    };

    useEffect(() => {
        getData().then((data) => {
            setConversations(data);
        });
    }, []);
    console.log(conversations);
    return (
        <div className="w-10/12 h-screen flex h-[90vh] w-full">
            <main className="flex flex-col w-full bg-dark-600 h-full">
                <ContentHeader />
                <div className="flex flex-row" style={{ height: 'calc(100% - 84px)' }}>
                    <div className="flex flex-col bg-dark-500 w-1/4 mr-1 px-0 h-full border-r">
                        <div className="flex items-center py-6 px-10">
                            <span className="font-light text-xl text-light-200">Inbox</span>
                            <div className="ml-2 w-5 h-4 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-2xs font-normal text-light-200">
                                3
                            </div>
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="px-3 py-3 rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 text-light-200 drop-shadow-3xl ml-auto"
                            />
                        </div>
                        <div className="px-10 pb-5 border-b">
                            <span className="text-xs text-light-200">Recent</span>
                            <FontAwesomeIcon icon={faCaretDown} className="text-light-200 text-xs ml-2" />
                        </div>
                        <div className="flex flex-col pb-10 overflow-y-auto">
                            {conversations.map((convesation, index) => (
                                <ConversationCard
                                    key={convesation.id}
                                    isSelected={selectedConversation === convesation.id}
                                    onClick={handleSelectConversation}
                                    {...convesation}
                                />
                            ))}
                        </div>
                    </div>
                    {selectedConversation ? (
                        <ConversationBody id={selectedConversation} />
                    ) : (
                        <div className="flex flex-col bg-dark-500 w-3/4 mx-auto px-auto text-center mt-16">
                            <AiOutlineInbox className="text-[124px] mx-auto" />
                            No conversation selected
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Inbox;
