import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {

    // Route path update
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            console.log('Location change');

            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };

    }, []);

    return currentPath === path
    ? children
    : null;
};

export default Route;

// User clicks on "List"

// 1. Change the URL, but don't do a full page refresh!
// 2. Each Route could detect the URL has changed
// 3. Route could update piece of state tracking the current pathname
// 4. Each Route rerenders, showing/hiding components appropriately