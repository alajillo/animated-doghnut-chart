import * as d3 from 'd3-shape'
import { animated, useSpring } from '@react-spring/web'
import { useEffect } from "react";
type AnimatedDoughnutProps = {
    value: number
	startAnimation: boolean
}
const AnimatedDoughnut = ({ value, startAnimation }: AnimatedDoughnutProps) => {
	const [props, api] = useSpring(() => ({
		from: { x: 0 }
	}))
	useEffect(() => {
		if(startAnimation){
			api.start({
				from: { x: 0 },
				to: { x: value },
			})
		}
	},[startAnimation])
	const fullArc = d3.arc()
		.innerRadius(70)
		.outerRadius(100)
		.cornerRadius(15)
		.startAngle(0)
		.endAngle(Math.PI * 2)
	const fullPath = fullArc()
	return (
		<svg className='w-full h-full' viewBox={'0 0 200 200'}>
			<g transform={'translate(100 100)'}>
				<path d={fullPath} className=' fill-slate-100 transition-all'/>
				<animated.path d={props.x.to((value) => {
					const arc = d3.arc()
						.innerRadius(70)
						.outerRadius(100)
						.cornerRadius(15)
						.startAngle(0)
						.endAngle(value / 100 * Math.PI * 2)
					return arc()
				})}/>
			</g>
		</svg>
	)
}

export default AnimatedDoughnut