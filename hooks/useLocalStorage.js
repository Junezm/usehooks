import { useState } from 'react';

/*
 * you can copy this code in your project
 * params{}
 *
 */
function useLocalStorage(key, initialValue) {
    // 初始化 storeValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // 有key对应的值，用之前的值初始化，没有就用 initialValue （保证页面刷新的时候已经存的值不会被 initialValue 覆盖，返回当前正确的 localStorageValue ）
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // 错误的话返回 initialValue
            console.log(error);
            return initialValue;
        }
    });

    // 返回一个 setState 方法
    const setValue = value => {
        try {
            // 兼容回调函数赋值
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage

// Usage demo
function App() {
    // Similar to useState but first arg is key to the value in local storage.
    const [name, setName] = useLocalStorage('name', 'Bob');

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
    );
}

/**
 * localStorage 实现过期时间
 */
// const localStorageWithExpires = {
//     getItem: function (keyName) {
//         var expires = localStorage.getItem(keyName + '_expires')
//         if (expires && new Date() > new Date(Number(expires))) {
//             localStorage.removeItem(keyName)
//             localStorage.removeItem(keyName + '_expires')
//         }
//         return localStorage.getItem(keyName)
//     },
//     setItem: function (keyName, keyValue, expires) {
//         if (typeof expires !== 'undefined') {
//             var expiresDate = new Date(expires).valueOf()
//             localStorage.setItem(keyName + '_expires', expiresDate)
//         }
//         return localStorage.setItem(keyName, keyValue)
//     },
//     removeItem: function (keyName) {
//         localStorage.removeItem(keyName)
//     }
// }
//
// module.exports = localStorageWithExpires