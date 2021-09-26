import React, { useEffect, useRef } from 'react'

import posterPattern from '../../static/posterPattern.jpeg'
import { formatDistance, formatDuration } from '../../utils/common'

import './CanvasPoster.css'

interface ICanvasPoster {
    race: {
        distance: number,
        duration: {
            seconds: number,
            hours: number,
            minutes: number,
        },
    },
    onBlobGenerated?: (poster: string) => void
}

export const CanvasPoster: React.FC<ICanvasPoster> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef) {
            const canvasContext = canvasRef.current.getContext('2d')
            canvasContext.font = 'bold 14px monospace';

            const img = new Image();
            img.src = posterPattern;
            img.onload = () => {
                canvasContext.fillStyle = canvasContext.createPattern(img, 'repeat');
                canvasContext.fillRect(0, 0, 400, 800);
                canvasContext.fillStyle = 'white';

                canvasContext.fillText(`${formatDistance(props.race.distance)} km for ${formatDuration(props.race.duration)}`, 20, 200);
                canvasContext.fillText(`Run with me`, 20, 300);

                const poster = canvasRef.current.toDataURL('image/png')

                if (props.onBlobGenerated) {
                    props.onBlobGenerated(poster)
                }
            };
        }
    }, [canvasRef])

    return (
        <canvas ref={canvasRef} className='canvas_poster' width='400' height='800'/>
    )
}
