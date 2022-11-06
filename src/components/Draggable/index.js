import React, {useEffect, useState, useRef} from 'react';
import './index.css';

function Draggable(props) {
    const {
        children,
    } = props;

    const dragging = useRef(false);
    const diffX = useRef(0);
    const diffY = useRef(0);
    const [styles, setStyles] = useState({});

    useEffect(() => {
        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("mouseup", handlePointerUp);
    }, []);

    const handlePointerDown = (e) => {
        diffX.current = e.screenX - e.currentTarget.getBoundingClientRect().left;
        diffY.current = e.screenY - e.currentTarget.getBoundingClientRect().top;
        dragging.current = true;
    }

    const handlePointerUp = (e) => {
        dragging.current = false;
    }

    const handlePointerMove = (e) => {
        if (dragging.current === true) {
            const left = e.screenX - diffX.current;
            const top = e.screenY - diffY.current;
            setStyles({
                left: left,
                top: top
            });
        }
    }

    return (
        <div
            className="container"
            onMouseDown={handlePointerDown}
            style={styles}
        >
            {children}
        </div>
    );
}

export default Draggable;