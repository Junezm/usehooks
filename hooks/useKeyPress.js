import { useState, useEffect } from 'react';

/*
 * you can copy this code in your project
 * params{} targetKey
 *
 */
function useKeyPress(targetKey) {
    // State of keypress
    const [keyPressed, setKeyPressed] = useState(false);

    // pressed key =>  true
    const handleKeyDown = function ({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    // released key => false
    const handleKeyUp = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return keyPressed;
}

// Usage demo
function App() {
    // Call your hook
    const hKey = useKeyPress('h');
    const fKey = useKeyPress('f');

    return (
        <div>
            <div>h, s, r, f</div>
            <div>
                {hKey && 'you pressed h'}
                {fKey && 'you pressed f'}
            </div>
        </div>
    );
}
