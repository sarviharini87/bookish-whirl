import { useState } from "react";
import "./PromptWheel.css";

function PromptWheel() {
    const [prompts, setPrompts] = useState([
        "A book with a blue cover",
        "A book with more than 300 pages",
        "A book with a one-word title",
        "A book published before 2000"
    ]);

    const [newPrompt, setNewPrompt] = useState("");
    const [prompt, setPrompt] = useState("Ready to find your next read?");

    const [rotation, setRotation] = useState(0);
    const colors = [
    "#FFB6C1",
    "#9B8AFB",
    "#FFD166",
    "#B8E0D2",
    "#A8DADC",
    "#CDB4DB"
    ];

    const sectionAngle = 360 / prompts.length;

    const wheelBackground = `conic-gradient(
    ${prompts.map((_, index) => {
        const start = index * sectionAngle;
        const end = (index + 1) * sectionAngle;

        return `${colors[index % colors.length]} ${start}deg ${end}deg`;
        }).join(", ")}
    )`;

    function addPrompt() {
        if (newPrompt.trim() === "") {
            return;
        }

        setPrompts([...prompts, newPrompt.trim()]);
        setNewPrompt("");
    }

    function spinWheel() {
        const randomNum = Math.floor(Math.random() * prompts.length);
        setPrompt(prompts[randomNum]);

        const randomRotation = Math.floor(
            Math.random() * (1800 - 360) + 360
        );

        setRotation(rotation + randomRotation);
    }

    return (
        <div className="promptWheel">

            <h2>What should I read?</h2>

            <div className="wheel-container">

                <div
                    className="wheel"
                    style={{ 
                        transform: `rotate(${rotation}deg)`, 
                        background: wheelBackground
                    }}
                >
                    {prompts.map((item, index) => (
                        <div
                            className="wheel-section"
                            key={item}
                            style={{
                                transform: `
                                    translate(-50%, -50%)
                                    rotate(${sectionAngle * index + sectionAngle / 2}deg)
                                    translateY(-90px)
                                `
                            }}
                            >
                            {item}
                        </div>
                    ))}
                </div>

                <div className="pointer">▼</div>

            </div>

            <button className="spinBtn" onClick={spinWheel}>
                Spin the Wheel
            </button>

            <p>{prompt}</p>

            <div>
                <form>
                    <label htmlFor="addPrompt">Type a Prompt</label>

                    <input
                        type="text"
                        id="addPrompt"
                        name="addPrompt"
                        value={newPrompt}
                        onChange={(e) => setNewPrompt(e.target.value)}
                    /><br></br>
                    <button onClick={addPrompt}>Add</button>
                </form>
            </div>

        </div>
    );
}

export default PromptWheel;