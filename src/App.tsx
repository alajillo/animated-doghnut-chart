import AnimatedDoughnut from "./AnimatedDoughnut.tsx";
import { useEffect, useRef, useState } from "react";
const App = () => {
	const listContainerRef = useRef<HTMLUListElement>(null)
	const valueList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
	const [startAnimationList, setStartAnimationList] = useState(new Array(10).fill(false))
	useEffect(() => {
		if(!listContainerRef.current) return
		const list = Array.from(listContainerRef.current.children)
		const observerList = list.map((item, index) => {
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if(entry.isIntersecting){
						setStartAnimationList(v => v.map((startAnimation, animationIndex)=> animationIndex === index ? true : startAnimation))
						observer.unobserve(entry.target)
					}
				})
			}, {
				threshold: 0.8
			})
			observer.observe(item)
			return observer
		})
		return () => list.forEach((item, index) => observerList[index].unobserve(item))
	},[])
	return (
		<ul ref={listContainerRef} className={'m-10 flex flex-col'}>
			{
				valueList.map((value, index) => (
					<li key={index} className={'w-40 h-40 mb-96'}>
						<AnimatedDoughnut startAnimation={startAnimationList[index]} value={value}/>
					</li>
				))
			}
		</ul>
	)
}

export default App