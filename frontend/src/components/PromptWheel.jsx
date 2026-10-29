
import { useState } from "react";
import "./PromptWheel.css";

const initialPrompts = [
    "A book with a blue cover",
    "A book with more than 300 pages",
    "A book with a one-word title",
    "A book published before 2000"
];

const themes = {
    dreamy: {
        name: "Dreamy Pink",
        colors: [
            "#FFB6C1",
            "#F8A8D4",
            "#DCC6F6",
            "#FF85A1",
            "#E8B4CB",
            "#F6D5E8"
        ],
        accent: "#E83E80"
    },
    lavender: {
        name: "Lavender Dreams",
        colors: [
            "#DCD6FF",
            "#B8A9F5",
            "#E9D5FF",
            "#A89BEF",
            "#F1E6FF",
            "#C4B5FD"
        ],
        accent: "#7862D9"
    },
    ocean: {
        name: "Ocean Breeze",
        colors: [
            "#A8DADC",
            "#77C9D4",
            "#D6F0F0",
            "#69AFC2",
            "#B8E0D2",
            "#91CDE0"
        ],
        accent: "#378DAB"
    },
    sunset: {
        name: "Soft Sunset",
        colors: [
            "#FFD6A5",
            "#FFADAD",
            "#FFC6A5",
            "#FFB4C2",
            "#FFE5A5",
            "#F8B4D9"
        ],
        accent: "#E8795B"
    }
};

let nextId = 0;

function createPrompt(text) {
    nextId += 1;
    return { id: nextId, text };
}

function PromptWheel() {
    const [prompts, setPrompts] = useState(() =>
        initialPrompts.map(createPrompt)
    );

    const [newPrompt, setNewPrompt] = useState("");
    const [themeName, setThemeName] = useState("dreamy");
    const [rotation, setRotation] = useState(0);

    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState(null);
    const [pendingWinner, setPendingWinner] = useState(null);

    const theme = themes[themeName];

    const count = prompts.length;
    const sectionAngle = count ? 360 / count : 0;

    // Dynamic wheel slices
    const wheelBackground = count
        ? `conic-gradient(from 0deg, ${
            prompts.map((_, index) => {
                const start = index * sectionAngle;
                const end = (index + 1) * sectionAngle;
                const color =
                    theme.colors[index % theme.colors.length];

                return `${color} ${start}deg ${end}deg`;
            }).join(", ")
        })`
        : "#F8EAF2";

    /*
      Labels are placed in the outer portion of the wheel.

      Approximate available tangential width:
      circumference at label radius / prompt count.
    */
    const labelRadius = 0.355;

    const labelWidth = count
        ? Math.min(
            150,
            (2 * Math.PI * 0.355 * 490) / count * 0.88
        )
        : 100;

    const labelFontSize = Math.max(
        6,
        Math.min(12, 220 / Math.max(count, 1))
    );

    function addPrompt(e) {
        e.preventDefault();

        const text = newPrompt.trim();

        if (!text || spinning) return;

        setPrompts(prev => [
            ...prev,
            createPrompt(text)
        ]);

        setNewPrompt("");
    }

    function deletePrompt(id) {
        if (spinning) return;

        setPrompts(prev =>
            prev.filter(item => item.id !== id)
        );
    }

    function spinWheel() {
        if (spinning || count === 0) return;

        const index = Math.floor(Math.random() * count);
        const selected = prompts[index];

        /*
          Slice 0 starts at the top.
          Each slice occupies sectionAngle degrees.

          Its center:
          index * sectionAngle + sectionAngle / 2
        */
        const centerAngle =
            index * sectionAngle + sectionAngle / 2;

        const currentAngle =
            ((rotation % 360) + 360) % 360;

        const delta =
            ((360 - centerAngle - currentAngle) % 360 + 360) % 360;

        const extraTurns =
            5 + Math.floor(Math.random() * 3);

        setPendingWinner(selected);
        setSpinning(true);

        setRotation(
            rotation + extraTurns * 360 + delta
        );
    }

    function handleTransitionEnd(e) {
        if (e.target !== e.currentTarget) return;
        if (e.propertyName !== "transform") return;
        if (!spinning) return;

        setSpinning(false);
        setWinner(pendingWinner);
        setPendingWinner(null);
    }

    function keepWinner() {
        setWinner(null);
    }

    function removeWinner() {
        if (!winner || spinning) return;

        setPrompts(prev =>
            prev.filter(item => item.id !== winner.id)
        );

        setWinner(null);
    }

    return (
        <section
            className="promptWheel"
            style={{
                "--wheel-accent": theme.accent
            }}
        >
            <div className="wheel-heading">
                <span className="eyebrow">
                    YOUR NEXT CHAPTER
                </span>

                <h2>What should I read?</h2>

                <p>
                    Leave it to fate. Let your next
                    favourite story find you.
                </p>
            </div>

            <div className="wheel-toolbar">
                <label htmlFor="wheelTheme">
                    Wheel theme

                    <select
                        id="wheelTheme"
                        value={themeName}
                        disabled={spinning}
                        onChange={e =>
                            setThemeName(e.target.value)
                        }
                    >
                        {Object.entries(themes).map(
                            ([key, value]) => (
                                <option key={key} value={key}>
                                    {value.name}
                                </option>
                            )
                        )}
                    </select>
                </label>
            </div>

            <div className="wheel-layout">

                {/* Wheel */}
                <div className="wheel-area">
                    <div className="wheel-container"
                        style={{
                        "--wheel-size": "100%"
                        }}
                    >

                        <div
                            className="wheel"
                            style={{
                                background: wheelBackground,
                                transform: `rotate(${rotation}deg)`
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            
{prompts.map((item, index) => {
    const angle = index * sectionAngle + sectionAngle / 2;

    return (
        <div
            className="wheel-label"
            key={item.id}
            title={item.text}
            style={{
                "--label-angle": `${angle}deg`,
                "--label-width": `${labelWidth}px`,
                "--label-font": `${labelFontSize}px`
            }}
        >
            <span>
                {item.text}
            </span>
        </div>
    );
})}

                        </div>

                        {/* Pointer stays fixed */}
                        <div className="wheel-pointer">
                            <span />
                        </div>

                        {/* Center button */}
                        <button
                            className="spinBtn"
                            type="button"
                            onClick={spinWheel}
                            disabled={spinning || count === 0}
                        >
                            {spinning ? "..." : "Spin"}
                        </button>
                    </div>

                    <p className="wheel-hint">
                        {spinning
                            ? "Finding your next read..."
                            : "Take a breath and trust the wheel ✨"}
                    </p>
                </div>

                {/* Prompt notebook */}
                <aside className="prompt-notebook">
                    <div className="notebook-header">
                        <div>
                            <span className="eyebrow">
                                YOUR COLLECTION
                            </span>

                            <h3>Reading Prompts</h3>
                        </div>

                        <span className="prompt-count">
                            {count}
                        </span>
                    </div>

                    <form
                        className="add-prompt-form"
                        onSubmit={addPrompt}
                    >
                        <input
                            type="text"
                            value={newPrompt}
                            onChange={e =>
                                setNewPrompt(e.target.value)
                            }
                            placeholder="Add a new prompt..."
                            aria-label="New reading prompt"
                            disabled={spinning}
                        />

                        <button
                            type="submit"
                            disabled={
                                !newPrompt.trim() || spinning
                            }
                        >
                            + Add
                        </button>
                    </form>

                    <div className="prompt-list">
                        {prompts.length === 0 ? (
                            <div className="empty-prompts">
                                <span>📖</span>
                                <p>Your notebook is empty.</p>
                                <small>
                                    Add a prompt to begin.
                                </small>
                            </div>
                        ) : (
                            prompts.map((item, index) => (
                                <div
                                    className="prompt-item"
                                    key={item.id}
                                >
                                    <span className="prompt-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="prompt-text">
                                        {item.text}
                                    </span>

                                    <button
                                        type="button"
                                        className="delete-prompt"
                                        title="Delete prompt"
                                        aria-label={`Delete ${item.text}`}
                                        disabled={spinning}
                                        onClick={() =>
                                            deletePrompt(item.id)
                                        }
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <p className="notebook-footer">
                        Every great read starts somewhere.
                    </p>
                </aside>
            </div>

            {/* Winner popup */}
            {winner && (
                <div
                    className="winner-overlay"
                    onClick={keepWinner}
                >
                    <div
                        className="winner-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="winner-title"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="modal-close"
                            aria-label="Close popup"
                            onClick={keepWinner}
                        >
                            ×
                        </button>

                        <span className="winner-sparkle">
                            ✨
                        </span>

                        <span className="eyebrow">
                            THE WHEEL HAS CHOSEN
                        </span>

                        <h2 id="winner-title">
                            Your next reading prompt
                        </h2>

                        <div className="winner-prompt">
                            {winner.text}
                        </div>

                        <p className="winner-subtitle">
                            Is this the adventure
                            you're looking for?
                        </p>

                        <div className="winner-actions">
                            <button
                                type="button"
                                className="keep-btn"
                                onClick={keepWinner}
                            >
                                Keep prompt
                            </button>

                            <button
                                type="button"
                                className="delete-btn"
                                onClick={removeWinner}
                            >
                                Delete prompt
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default PromptWheel;
