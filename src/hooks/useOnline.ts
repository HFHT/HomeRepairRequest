import { useEffect, useState } from 'react';

interface useOnlineInterface {
    offline: [() => void]
    online: [() => void]
}

export const useOnline = (funcObj: useOnlineInterface) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Functions to be called when offline or online event occurs
        const offlineEventListenerFunction = () => {
            setIsOnline(false);
            funcObj?.offline?.map((e: any) => e()); // Callback(s)
        };
        const onlineEventListenerFunction = () => {
            setIsOnline(true);
            funcObj?.online?.map((e: any) => e()); // Callback(s)
        };

        // Adding event listeners for online and offline events
        addEventListener('offline', offlineEventListenerFunction);
        addEventListener('online', onlineEventListenerFunction);

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            removeEventListener('offline', offlineEventListenerFunction);
            removeEventListener('online', onlineEventListenerFunction);
        };
    }, []); 

    return isOnline; 
};
