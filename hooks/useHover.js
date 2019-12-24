import { useRef, useState, useEffect } from 'react';

/*
 * you can copy this code in your project
 * params{}
 *
 */
function useHover() {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        },
        [ref.current] // Recall only if ref changes
    );

    return [ref, value];
}

export default useHover

// Usage demo
function App() {
    const [hoverRef, isHovered] = useHover();

    return (
        <div ref={hoverRef}>
            {isHovered ? 'hovered' : 'none hover'}
        </div>
    );
}