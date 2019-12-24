import { useState, useEffect } from 'react';
import useInterval from "./useInterval";

/*
 * provider two function for key or keyCode
 * you can copy this code in your project
 * params{} targetKey
 *
 */
function useKeyPressWithKey(targetKey) {
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

function useKeyPressWithKeyCode(targetKeyCode) {
    // State of keypress
    const [keyPressed, setKeyPressed] = useState(false);

    // pressed key =>  true
    const handleKeyDown = function ({ keyCode }) {
        if (keyCode === targetKeyCode) {
            setKeyPressed(true);
        }
    }

    // released key => false
    const handleKeyUp = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
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

export default useKeyPressWithKey
// export default useKeyPressWithKeyCode

// Usage demo
function App() {
    // Call your hook
    const hKey = useKeyPressWithKey('h');
    const fKey = useKeyPressWithKey('f');


    const enterKey = useKeyPressWithKeyCode(13);
    const escKey = useKeyPressWithKey(27);
    return (
        <div>
            <div>h, s, r, f</div>
            <div>
                {hKey && 'you pressed h'}
                {fKey && 'you pressed f'}

                {enterKey && 'you press enter'}
                {escKey && 'you press esc'}
            </div>
        </div>
    );
}
