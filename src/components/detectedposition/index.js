import { Children, useEffect, useState } from "react";
import { useMouse } from "../../hooks/useMouse";

export function DetectedPosition(props) {

    const {children,onMouseMoveCapture, onMouseLeave} = props;
    const [sizeChildrem, setSizeChildrem] = useState(
        {
            size:{
                width: 0, 
                height: 0
            },
            position:{
                x: 0, 
                y: 0
            }
        }
    )
    const [isSalio, setIsSalio] = useState(false);
    // el callback permite ejecutar operaciones en tiempo que se mueve el mouse
    const position = useMouse();

    useEffect(() => {
        (()=>{
            const widthC = Children.map(children, (item)=>{
                console.log(item.ref.current.getBoundingClientRect())
                const Rect = item.ref.current.getBoundingClientRect()
                return {
                    size:{
                        width: Rect.width, 
                        height: Rect.height
                    },
                    position:{
                        x: Rect.x, 
                        y: Rect.y
                    }
                }
            });
            if(widthC.length > 0){
                // console.log(widthC[0])
                setSizeChildrem(widthC[0])
            }
            setInterval(()=>{
                const mousePos = { x: position.x, y: position.y };
                console.log(mousePos)
                // console.log(sizeChildrem.position)
                // console.log(sizeChildrem)
                // console.log(`(${sizeChildrem.position.x} <= ${mousePos.x}) && (${mousePos.x} <= (${sizeChildrem.position.x} + ${sizeChildrem.size.width}))`)
                // comprueba si el punto esta dentro de los parametros horizontales
                if ((sizeChildrem.position.x <= mousePos.x) && (mousePos.x <= (sizeChildrem.position.x + sizeChildrem.size.width))){
                    onMouseMoveCapture();
                    setIsSalio(false);
                    return;
                }
                if (!isSalio){
                    onMouseLeave();
                }
            },250)
        })();
    },[])
    

    return (<div style={{width: '100%', height: '100%'}}>
        {children}
    </div>);
}