import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({box, imageUrl}) => {
	return (
		<div className='center'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='Face' src={imageUrl} width='500px' height='auto'/>
				{
					box.map((box,i) =>{
						return <div key={i} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
					})
				}
			</div>
		</div>
	)
}

export default FaceRecognition