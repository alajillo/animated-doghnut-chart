import * as d3 from 'd3-shape'
import { animated, useSpringValue } from '@react-spring/web'
import { useEffect, useMemo } from "react";

const colorList = ['red', 'blue', 'yellow', 'violet', 'green']

type AnimatedDoughnutProps = {
    value: number
	startAnimation: boolean
}
const AnimatedDoughnut = ({ value, startAnimation }: AnimatedDoughnutProps) => {
	const props = useSpringValue(0)
	useEffect(() => {
		if(startAnimation){
			props.start(value)
		}
	},[startAnimation])

	const colorClassName = useMemo(() => {
		const color = colorList[(Math.floor(Math.random() * colorList.length))]
		return `fill-${color}-500`
	},[])

	const fullArc = d3.arc()
		.innerRadius(70)
		.outerRadius(100)
		.cornerRadius(15)
		.startAngle(0)
		.endAngle(Math.PI * 2)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const fullPath = fullArc()




	return (
		<svg className='w-full h-full' viewBox={'0 0 200 200'}>
			<g transform={'translate(100 100)'}>
				<path d={fullPath} className=' fill-slate-100'/>
				<animated.path d={props.to((value) => {
					const arc = d3.arc()
						.innerRadius(70)
						.outerRadius(100)
						.cornerRadius(15)
						.startAngle(0)
						.endAngle(value / 100 * Math.PI * 2)
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return arc()
				})}
				className={colorClassName}
				/>
			</g>

		</svg>
	)
}

export default AnimatedDoughnut