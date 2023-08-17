import { useRef } from "react";
import { useMouse } from "../../hooks/useMouse";
import useLongPress from "../../hooks/useLongClick";
import "./index.css";

export const ContenedorInsert = (props) => {
    const { labelH = 'Basico' } = props;
    return (<div className="contenedor_information_card">{labelH}</div>);
}


export function ItemsArrastred(props) {
    const {
        onSelectedItem = () => {},
        onSoltarItem = () => {},
        contentArrastred = <ContenedorInsert/> ,
        children
    } = props;
    const position = useMouse();
    const refGroupSelected = useRef();
    const refGroupSelectedP = useRef();

    const onLongPress = () => {
        // console.log("Ingresado Init")
        onSelectedItem();
        // dar la posicion inicial al container
        moviStart();
        // console.log(position)
        moveAt(position.x,position.y);
    };

    const moviStart = () => {
        refGroupSelected.current.style.position = 'absolute';
        refGroupSelected.current.style.zIndex = 1000;
        refGroupSelected.current.style.display = 'block';
        // document.body.append(refGroupSelected);
    }
    
    const moviFinich = () => {
        refGroupSelected.current.style.position = 'relative';
        refGroupSelected.current.style.zIndex = 1;
        refGroupSelected.current.style.display = 'none';
        onSoltarItem();
        // document.body.append(refGroupSelected.current);
    }

    // centrar la pelota en las coordenadas (pageX, pageY)
    const moveAt = (pageX, pageY) => {
        refGroupSelected.current.style.left = pageX - refGroupSelected.current.offsetWidth / 2 + 'px';
        refGroupSelected.current.style.top = pageY - refGroupSelected.current.offsetHeight / 2 + 'px';
    }

    const onClick = () => {
        console.log('click is triggered')
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    return (
        <div style={{width: "100%"}} >
            {/* onMouseDown = 'return false' onSelectCapture = 'return false' */}
            <div style={{width: "100%"}} onMouseDown = {'return false'} onSelectCapture = {'return false'} {...longPressEvent} ref={refGroupSelectedP} >
                {children}
            </div>
            <div ref={refGroupSelected} onMouseMoveCapture={()=>{
                moveAt(position.x,position.y);
            }} onMouseUp = {()=>{
                moviFinich();
            }} style={{width: '50px', height: '30px', display:"none", position: "relative", zIndex: '10px'}}>
                {contentArrastred}
            </div>
        </div>
    )
}