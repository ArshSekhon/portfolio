import React from 'react';

import {TweenMax, Power1} from 'gsap'

import './loading-banner.css';


export class LoadingBanner extends React.Component{
    private strikeThrough: HTMLDivElement | null;
    private loadingStrikeoutTween: TweenMax | null;

    constructor(props: any){
        super(props);
        this.strikeThrough = null;
        this.loadingStrikeoutTween = null;
    }

    componentDidMount(){
        this.loadingStrikeoutTween = TweenMax.fromTo(this.strikeThrough as {}, 1.5, {left: "-100%"}, {
            left: "100%",
            repeat: -1,
            repeatDelay: 0.5,
            ease: Power1.easeInOut,
        })
    }

    render(){
        return <div className="loading-banner">
                        <div className="loading-text">&nbsp;LOADING</div>
                        <div className="strike-through" ref={div => this.strikeThrough=div}></div>
                </div>;
    }
}