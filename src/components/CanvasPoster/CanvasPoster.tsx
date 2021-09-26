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
    const { race, onBlobGenerated } = props

    useEffect(() => {
        if (canvasRef) {
            const canvasContext = canvasRef.current.getContext('2d')
            canvasContext.font = 'bold 20px monospace';

            const img = new Image();
            img.src = posterPattern;
            img.onload = () => {
                canvasContext.fillStyle = canvasContext.createPattern(img, 'repeat');
                canvasContext.fillRect(0, 0, 400, 800);
                canvasContext.fillStyle = 'white';

                canvasContext.fillText(`${formatDistance(race.distance)} km for ${formatDuration(race.duration)}`, 20, 200);
                canvasContext.fillText(`Run with me`, 20, 300);

                const poster = canvasRef.current.toDataURL('image/png')

                if (onBlobGenerated) {
                    onBlobGenerated(poster)
                }
            };
        }
    }, [canvasRef, race, onBlobGenerated])

    return (
        <canvas ref={canvasRef} className='canvas_poster' width='400' height='800'/>
    )
}
