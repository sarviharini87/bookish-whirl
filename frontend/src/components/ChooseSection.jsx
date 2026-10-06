import "./ChooseSection.css"
function ChooseSection(){
    return(
        <section className="choose-section">
            <h2>Choose Your Way</h2>
            <p>How do you want to find your next read?</p>

            <div className="card-container">
                <div className="card">
                    <h3>What Should I Read?</h3>
                    <p>Let the wheel give you a fun bookish challenge.</p>
                    <button className="button">Spin Wheel</button>
                </div>

                <div className="card">
                    <h3>My TBR</h3>
                    <p>Pick a random book from your own TBR.</p>
                    <button className="button">Open TBR</button>
                </div>
            </div>
        </section>
    )
}
export default ChooseSection