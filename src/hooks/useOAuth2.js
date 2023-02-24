import { useCallback, useState, useRef } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { objectToQuery, queryToObject } from './tools';
const { default: apiClient } = require('~/services/axios');

const OAUTH_STATE_KEY = 'react-use-oauth2-state-key';
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;
const OAUTH_RESPONSE = 'react-use-oauth2-response';

const generateState = () => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let array = new Uint8Array(40);
    window.crypto.getRandomValues(array);
    array = array.map((x) => validChars.codePointAt(x % validChars.length));
    const randomState = String.fromCharCode.apply(null, array);
    return randomState;
};

const saveState = (state) => {
    sessionStorage.setItem(OAUTH_STATE_KEY, state);
};

const removeState = () => {
    sessionStorage.removeItem(OAUTH_STATE_KEY);
};

const openPopup = (url) => {
    // To fix issues with window.screen in multi-monitor setups, the easier option is to
    // center the pop-up over the parent window.
    const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
    const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
    return window.open(url, 'OAuth2 Popup', `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`);
};

const closePopup = (popupRef) => {
    popupRef.current?.close();
};

const cleanup = (intervalRef, popupRef, handleMessageListener) => {
    clearInterval(intervalRef.current);
    closePopup(popupRef);
    removeState();
    window.removeEventListener('message', handleMessageListener);
};

const enhanceAuthorizeUrl = (authorizeUrl, clientId, redirectUri, scope, state, responseType) => {
    return `${authorizeUrl}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
};

const formatExchangeCodeForTokenServerURL = (serverUrl, clientId, code, redirectUri) => {
    return `${serverUrl}?${objectToQuery({
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    })}`;
};

const useOAuth2 = (props) => {
    const popupRef = useRef();
    const intervalRef = useRef();
    const { authorizeUrl, clientId, clientSecret, redirectUri, responseType, scope = '' } = props;
    const [{ loading, error }, setUI] = useState({ loading: false, error: null });

    const [data, setData] = useLocalStorageState(`${responseType}-${authorizeUrl}-${clientId}-${scope}`, {
        defaultValue: null,
    });

    const getAuth = useCallback(() => {
        setUI({
            loading: true,
            error: null,
        });

        const state = generateState();
        saveState(state);

        popupRef.current = openPopup(
            enhanceAuthorizeUrl(authorizeUrl, clientId, redirectUri, scope, state, responseType),
        );

        async function handleMessageListener(message) {
            try {
                const type = message && message.data && message.data.type;
                if (type === OAUTH_RESPONSE) {
                    const errorMaybe = message && message.data && message.data.error;
                    if (errorMaybe) {
                        setUI({
                            loading: false,
                            error: errorMaybe || 'Unknown Error',
                        });
                    } else {
                        const code = message && message.data && message.data.payload && message.data.payload.code;

                        const response = await apiClient
                            .post('/oauth2/token', {
                                client_id: clientId,
                                client_secret: clientSecret,
                                code,
                                redirect_uri: redirectUri,
                            })
                            .then((response) => response.data)
                            .catch((error) => {
                                throw error;
                            });
                        if (!response.ok) {
                            setUI({
                                loading: false,
                                error: 'Failed to exchange code for token',
                            });
                        } else {
                            let payload = await response.json();
                            setUI({
                                loading: false,
                                error: null,
                            });
                            setData(payload);
                            // Lines above will cause 2 rerenders but it's fine for this tutorial :-)
                        }
                    }
                }
            } catch (genericError) {
                console.error(genericError);
                setUI({
                    loading: false,
                    error: genericError.toString(),
                });
            } finally {
                // Clear stuff ...
                cleanup(intervalRef, popupRef, handleMessageListener);
            }
        }
        window.addEventListener('message', handleMessageListener);

        // 4. Begin interval to check if popup was closed forcefully by the user
        intervalRef.current = setInterval(() => {
            const popupClosed = !popupRef.current || !popupRef.current.window || popupRef.current.window.closed;
            if (popupClosed) {
                // Popup was closed before completing auth...
                setUI((ui) => ({
                    ...ui,
                    loading: false,
                }));
                console.warn('Warning: Popup was closed before completing authentication.');
                clearInterval(intervalRef.current);
                removeState();
                window.removeEventListener('message', handleMessageListener);
            }
        }, 250);

        // Remove listener(s) on unmount
        return () => {
            window.removeEventListener('message', handleMessageListener);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [authorizeUrl, clientId, redirectUri, scope, responseType, setUI, setData]);

    return { data, loading, error, getAuth };
};

export default useOAuth2;
