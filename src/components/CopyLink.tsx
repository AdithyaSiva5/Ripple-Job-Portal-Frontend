import { useState } from 'react';
import { BASE_URL, DOMIAN_URL } from '../constants/baseUrls';
import { useSelector } from 'react-redux';

const CopyLink = ({ interview }: any) => {
    const selectUser = (state: any) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(document.getElementById('phone-numbers')?.value);
        setCopied(true);
    };

    return (
        <form>

            <div className="flex items-center">
                <div className="relative w-full">
                    <input
                        id="phone-numbers"
                        type="text"
                        value={`${DOMIAN_URL}/interview-call/${interview?.interviewLink}/${userId}`}
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-100 border border-e-0 border-white text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled
                    />
                </div>
                <button
                    id="copy-number"
                    onClick={handleCopy}
                    className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-gray-500 dark:text-gray-400 hover:text-gray-900 bg-gray-100 rounded-e-lg hover:bg-gray-200"
                    type="button"
                >
                    <svg
                        id="copy-icon"
                        className={`w-4 h-4 ${!copied ? '' : 'hidden'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                    >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    <svg
                        id="copy-icon-success"
                        className={`w-4 h-4 ${copied ? '' : 'hidden'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                    >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg>
                </button>

                <div
                    id="tooltip-phone"
                    role="tooltip"
                    className={`absolute  inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ${copied ? 'visible' : 'invisible'
                        } dark:bg-gray-700`}
                >
                    <span id="tooltip-text">{copied ? 'Copied!' : 'Copy number'}</span>
                </div>
            </div>
        </form>
    );
};

export default CopyLink;
