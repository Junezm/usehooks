import React, { useState, useEffect, useRef } from 'react'

/*
 * you can copy this code in your project
 * params{} intervalCallback, delay
 *
 */
function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

export default useInterval

// usage demo
function Counter() {
    let [count, setCount] = useState(0);

    useInterval(() => {
        // 定时器回调
        setCount(count + 1);
    }, 1000);

    return (<h1>{count}</h1>);
}
