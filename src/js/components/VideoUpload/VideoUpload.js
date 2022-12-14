import { head } from 'lodash';
import React, { useState } from 'react'
import VideoPlayModal from './VideoPlayModal';
import "./VideoUpload.css"

const VideoUpload = ({VideoData}) => {
    const [modal, setModal] = useState(false);
    const videoToggle = () => setModal(!modal);
    const VideoData={
        "tag":"Avibra Onboarding",
        "heading":"Watch how easy it is to choose your benefits.",
        "btnCta":"Watch the video",
        "btnLink":"#",
        "thumbnail":"https://images.avibra.com/siteui/3.02.png",
        "videoLink":"https://www.youtube.com/embed/AWk07Cxxfbg",
        "videoPoster":"https://images.avibra.com/siteui/maditation.jpg"
    }
    const {tag,heading,btnCta,btnLink,thumbnail,videoLink,backgroundColor='',videoPoster=''}=VideoData
    return (
        <div className='video-wrp'>
            <div className='video-box' style={{background:backgroundColor?backgroundColor:'#F5F2FC'}}>
                <div className='row'>
                    <div className='col-lg-5 col-md-6'>
                        <div className='video-left'>
                            <span>{tag}</span>
                            <p>{heading}</p>
                            <button onClick={videoToggle}>{btnCta}</button>
                        </div>
                    </div>
                    <div className='col-lg-7 col-md-6 p-0'>
                        <div className='video-right'>
                            <div className='video-player' onClick={videoToggle}>
                                <img src={thumbnail} alt=""/>
                                <div className='play-icon'>
                                    <img src="https://images.avibra.com/siteui/play_btn.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            {modal && <VideoPlayModal toggle={videoToggle} modal={modal} videoLink={videoLink} videoPoster={videoPoster}/>}
        </div>
    )
}

export default VideoUpload
