import { Platform, usePlatform } from '@vkontakte/vkui'
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

// Генератор рандомных цветов для градиента для iOs
// TODO: превести на HEX
const generateRandomGradientColors = () => {
    const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];

    let leftColor = Math.floor(Math.random() * colors.length);
    let rightColor = Math.floor(Math.random() * colors.length);

    if (leftColor === rightColor) {
        leftColor = leftColor + 1;
    }else if(leftColor === 7 && rightColor === 7){
        rightColor = leftColor - 1;
    }

    return [colors[leftColor], colors[rightColor]]
}

export const CanvasPoster: React.FC<ICanvasPoster> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const platform = usePlatform();

    useEffect(() => {
        if (canvasRef) {
            const canvasContext = canvasRef.current.getContext('2d')
            canvasContext.font = 'bold 20px monospace';

            const renderText = () => {
                canvasContext.fillStyle = 'white';
                canvasContext.strokeStyle = 'black';

                const infoMessage = `${formatDistance(props.race.distance)} km for ${formatDuration(props.race.duration)}`
                const motivationMessage = 'Run with me'

                canvasContext.fillText(infoMessage, 20, 200);
                canvasContext.strokeText(infoMessage, 20, 200);
                canvasContext.fillText(motivationMessage, 20, 300);
                canvasContext.strokeText(motivationMessage, 20, 300);
            }

            if (platform === Platform.IOS) {
                const gradient = canvasContext.createLinearGradient(20,0, 220,0);
                const [leftColor, rightColor] = generateRandomGradientColors()

                gradient.addColorStop(0, leftColor);
                gradient.addColorStop(.5, 'white');
                gradient.addColorStop(1, rightColor);

                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(0, 0, 400, 800);

                renderText()

                const poster = canvasRef.current.toDataURL('image/png')

                if (props.onBlobGenerated) {
                    props.onBlobGenerated(poster)
                }
            } else {
                // На Ios Есть некоторые проблемы с обработкой события onLoad у Image в продакшн сборке,
                // пока не понимаю какие именно, возможно проблемы есть и у андроида, но этого я проверить не могу
                const img = new Image();
                img.src = posterPattern;
                img.onload = () => {
                    canvasContext.fillStyle = canvasContext.createPattern(img, 'repeat');
                    canvasContext.fillRect(0, 0, 400, 800);

                    renderText()

                    const poster = canvasRef.current.toDataURL('image/png')

                    if (props.onBlobGenerated) {
                        props.onBlobGenerated(poster)
                    }
                }
            }
        }
    }, [canvasRef])

    return (
        <canvas ref={canvasRef} className='canvas_poster' width='400' height='800'/>
    )
}
