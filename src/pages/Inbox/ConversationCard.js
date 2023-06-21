import './ConversationCard.css';

export default function ConversationCard(props) {
    const { id, participants, start_at, subject, last_message, isSelected, message_count, onClick } = props;
    const handleClick = () => {
        onClick(id);
    };
    return (
        <div
            className={`${
                isSelected ? 'bg-[#E5F2F8]' : ''
            } flex flex-row py-5 px-2 hover:bg-gradient-to-br cursor-pointer w-full`}
            onClick={handleClick}
        >
            <div className={`w-12 h-10 mt-3 rounded-xl bg-red-100`}></div>
            <div className="flex flex-col w-full ml-3">
                <div className="flex items-center mt-2">
                    <span className="text-xs text-light-500 font-medium mr-auto">{participants[0].name}</span>
                    {message_count > 0 ? (
                        <span className="text-light-500 bg-red-300 text-xs font-medium px-3 py-1 rounded-xl">
                            {message_count}
                        </span>
                    ) : null}
                    <span className="text-light-500 bg-dark-400 text-xs font-medium px-3 py-1 rounded-xl">
                        {start_at}
                    </span>
                </div>
                <span className="text-sm text-light-200 font-medium mt-2">{subject}</span>
                <span className="clamp text-xs font-normal text-light-500 mt-4 w-full">{last_message}</span>
            </div>
        </div>
    );
}
