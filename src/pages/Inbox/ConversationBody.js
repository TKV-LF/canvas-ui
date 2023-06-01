import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ConversationApi } from '~/services/api';
import { ConvertDate } from '~/utils/heplers';

async function getData(payload) {
    try {
        const data = await ConversationApi.getConversation(payload);
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

const ConversationBody = ({ id }) => {
    const [messages, setMessages] = useState([]);
    const [listAuthor, setListAuthor] = useState([]);

    useEffect(() => {
        getData({ conversationId: id }).then((data) => {
            setMessages(data.messages);
            setListAuthor(data.participants);
        });
    }, [id]);

    const author = (id) => {
        const author = listAuthor.find((author) => author.id === id);
        return author;
    };
    return (
        <div className="flex flex-col bg-dark-500 w-3/4">
            {messages.map((message) => (
                <div className="mb-5 border-b border-gray-300 pb-5" key={message.id}>
                    <div className="flex items-center px-10">
                        <div className="w-10 h-10 rounded-xl bg-red-200 mr-4"></div>
                        <span className="text-sm text-light-500 font-medium">{author(message.author_id).name}</span>
                        <div className="flex ml-auto">
                            <FontAwesomeIcon icon={faReply} className="mx-2 text-light-200" />
                            <FontAwesomeIcon icon={faTrashCan} className="mx-2 text-light-200" />
                            <FontAwesomeIcon icon={faEllipsisH} className="mx-2 text-light-200" />
                        </div>
                    </div>
                    <div className="px-10 text-sm text-light-200 font-medium mt-2">
                        {ConvertDate(message.created_at)}
                    </div>
                    <div className="px-10 text-sm text-light-200 font-medium mt-2">{message.subject}</div>
                    <div className="px-10 text-sm text-light-200 font-medium mt-2">{message.body}</div>
                </div>
            ))}
        </div>
    );
};
export default ConversationBody;
