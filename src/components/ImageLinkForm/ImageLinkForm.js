import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onSubmit, onInputChange}) => {
	return (
		<div>
			<p className='f3'>
				This Magic Brain will detect faces in your pictures
			</p>
			<div className='pa4 br3 shadow-5 dib form'>
				<input type='text' className='f4 pa2 w-70 mh3' onChange={onInputChange}/>
				<button className='grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
			</div>
		</div>
	)
}

export default ImageLinkForm