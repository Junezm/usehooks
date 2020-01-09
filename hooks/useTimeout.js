import { useState, useRef, useEffect } from "react";

function useTimeout(cb, timeoutDelayMs = 0) {
    const [isTimeoutActive, setIsTimeoutActive] = useState(false);
    const savedRefCallback = useRef();

    useEffect(() => {
        savedRefCallback.current = cb;
    }, [cb]);

    function callback() {
        savedRefCallback.current && savedRefCallback.current();
        clear();
    }

    function clear() {
        setIsTimeoutActive(false);
    }
    function start() {
        setIsTimeoutActive(true);
    }

    useEffect(() => {
        if (isTimeoutActive) {
            const timeout = window.setTimeout(callback, timeoutDelayMs);
            return () => {
                window.clearTimeout(timeout);
            };
        }
    }, [isTimeoutActive]);
    return {
        clear,
        start,
        stop: clear,
        isActive: isTimeoutActive
    };
}

export default useTimeout;

const Component = function() {

    const { start, clear } = useTimeout(() => {console.log(11111)}, 2000);
    return (
        <div>
            <button onClick={start} />
            <button onClick={clear} />
        </div>
    );
};
