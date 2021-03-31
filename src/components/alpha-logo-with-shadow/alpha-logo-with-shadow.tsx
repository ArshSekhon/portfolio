import React from "react";
import { TweenMax, TimelineMax, Power0, Power2 } from "gsap";

import AlphaLogo from "../../assets/svgs/alpha.svg";
import AlphaLogoShadow from "../../assets/svgs/alpha-shadow.svg";

import "./alpha-logo-with-shadow.css";

export class AlphaLogoWithShadow extends React.Component {
  private alphaLogoRef: HTMLImageElement | null;
  private alphaShadowRef: HTMLImageElement | null;
  private rotateLogoTween: TweenMax | null;
  private verticalLogoAnimationTimeline: TimelineMax | null;
  private alphaLogoShadowTimeline: TimelineMax | null;

  constructor(props: any) {
    super(props);
    this.alphaLogoRef = null;
    this.alphaShadowRef = null;
    this.rotateLogoTween = null;
    this.verticalLogoAnimationTimeline = null;
    this.alphaLogoShadowTimeline = null;
  }

  componentDidMount() {
    this.setupLogoRotationTween();
    this.setupLogoVerticalAnimationTimeline();
    this.setupLogoShadowAnimationTimeline();
  }

  render() {
    return (
      <div className="alpha-logo-with-shadow">
        <img
          className="alpha-logo"
          alt="alpha logo"
          src={AlphaLogo}
          ref={(img) => (this.alphaLogoRef = img)}
        />
        <img
          className="alpha-shadow"
          alt="alpha logo shadwo"
          src={AlphaLogoShadow}
          ref={(img) => (this.alphaShadowRef = img)}
        />
      </div>
    );
  }

  private setupLogoRotationTween() {
    this.rotateLogoTween = TweenMax.fromTo(
      this.alphaLogoRef as {},
      20,
      { rotation: "0" },
      { rotation: "360", ease: Power0.easeNone, repeat: -1 }
    );
  }

  private setupLogoVerticalAnimationTimeline() {
    this.verticalLogoAnimationTimeline = new TimelineMax({ repeat: -1 });
    this.verticalLogoAnimationTimeline
      .fromTo(
        this.alphaLogoRef as {},
        3.33,
        { top: "44%" },
        { top: "51%", ease: Power2.easeInOut }
      )
      .fromTo(
        this.alphaLogoRef as {},
        3.33,
        { top: "51%" },
        { top: "44%", ease: Power2.easeInOut }
      );
  }

  private setupLogoShadowAnimationTimeline() {
    this.alphaLogoShadowTimeline = new TimelineMax({ repeat: -1 });
    this.alphaLogoShadowTimeline
      .fromTo(
        this.alphaShadowRef as {},
        3.33,
        { xPercent:-50, scale: 1, opacity: 0.4 },
        {
          scale: 0.6,
          opacity: 1,
          ease: Power2.easeInOut,
        }
      )
      .fromTo(
        this.alphaShadowRef as {},
        3.33,
        { scale: 0.6, opacity: 1 },
        { scale: 1, opacity: 0.4, ease: Power2.easeInOut }
      );
  }
}
