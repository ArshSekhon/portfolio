import React from "react";
import { TimelineMax, Power4 } from "gsap";

import "./alpha-spinner.module.css";

export class AlphaSpinner extends React.Component {
  private svgRef: any;
  private spinnerRotationTimeline: TimelineMax;
  private spinnerEntryTimeline: TimelineMax;

  constructor(props: any) {
    super(props);
    this.svgRef = null;
    this.spinnerRotationTimeline = new TimelineMax({ repeat: -1 });
    this.spinnerEntryTimeline = new TimelineMax();
  }

  componentDidMount() {
    this.buildSpinnerRotationTimeline();
  }

  render() {
    return (
      <div
        className="alpha-spinner"
        ref={(alphaLogo) => (this.svgRef = alphaLogo)}
      >
        <img src="/assets/branding/alpha.svg" />
      </div>
    );
  }

  private buildSpinnerRotationTimeline() {
    this.spinnerRotationTimeline
      .fromTo(
        this.svgRef,
        1.5,
        { rotation: "0", ease: Power4.easeInOut },
        {
          delay: 0.5,
          rotation: "120",
          ease: Power4.easeInOut,
        }
      )
      .fromTo(
        this.svgRef,
        1.5,
        { rotation: "120", ease: Power4.easeInOut },
        {
          delay: 0.5,
          rotation: "240",
          ease: Power4.easeInOut,
        }
      )
      .fromTo(
        this.svgRef,
        1.5,
        { rotation: "240", ease: Power4.easeInOut },
        {
          delay: 0.5,
          rotation: "360",
          ease: Power4.easeInOut,
        }
      );
  }
}
