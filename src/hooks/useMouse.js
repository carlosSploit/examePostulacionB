import { useEffect, useState } from "react";


export function useMouse() {
    const [positionMouse, setpositionMouse] = useState({ x: 0, y: 0 });

    useEffect(()=>{

        const handler = (event) => {
            // callback(event);
            const mousePos = { x: event.clientX, y: event.clientY };
            // console.log(mousePos)
            setpositionMouse(mousePos)
        }
        window.addEventListener('mousemove', handler);

        return () => window.removeEventListener('mousemove', handler);
    },[])

    return positionMouse
}   