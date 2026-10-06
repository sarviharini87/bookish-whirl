
import "./GuideSection.css"

function GuideSection() {
    return (
        <section className="containerSection">
            <h2>How It Works</h2>
            <p>It's simple, fun and totally random!</p>

            <div className="guideContainer">
                <div>
                    <p className="step-number step1">1</p>
                    <h4>Choose a Mode</h4>
                    <p className="subPrompt">Choose whether you want Prompt or TBR</p>
                </div>

                <div>
                    <p className="step-number step2">2</p>
                    <h4>Spin the Wheel</h4>
                    <p className="subPrompt">Let the Wheel decide your Challenge</p>
                </div>

                <div>
                    <p className="step-number step3">3</p>
                    <h4>Get Your Results</h4>
                    <p className="subPrompt">Get a fun Bookish Prompt</p>
                </div>

                <div>
                    <p className="step-number step4">4</p>
                    <h4>Read and Enjoy!</h4>
                    <p className="subPrompt">Find your book and enjoy!</p>
                </div>
            </div>
        </section>
    )
}

export default GuideSection

