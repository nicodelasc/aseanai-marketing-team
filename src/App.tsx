import { useEffect, useMemo, useRef, useState } from 'react';
import { Confetti } from './components/Confetti';
import { gameTree, START_NODE_ID, type NodeId, type Phase } from './data/gameTree';
import { deriveDecisionPath } from './data/treeUtils';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

const THINKING_DELAY_MS = 650;

const App = () => {
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>(START_NODE_ID);
  const [history, setHistory] = useState<NodeId[]>([START_NODE_ID]);
  const [phase, setPhase] = useState<Phase>('question');
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionTimerRef = useRef<number | null>(null);

  const currentNode = gameTree[currentNodeId];
  const decisionPath = useMemo(() => deriveDecisionPath(history), [history]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const clearPendingTransition = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  };

  const handleOptionSelect = (nextNodeId: NodeId) => {
    clearPendingTransition();
    setPhase('thinking');

    transitionTimerRef.current = window.setTimeout(() => {
      const nextNode = gameTree[nextNodeId];
      setCurrentNodeId(nextNodeId);
      setHistory((currentHistory) => [...currentHistory, nextNodeId]);
      setPhase(nextNode.type === 'result' ? 'result' : 'question');
      transitionTimerRef.current = null;
    }, THINKING_DELAY_MS);
  };

  const handleRestart = () => {
    clearPendingTransition();
    setCurrentNodeId(START_NODE_ID);
    setHistory([START_NODE_ID]);
    setPhase('question');
  };

  return (
    <main className="shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <section className="hero-copy">
        <p className="hero-kicker">ASEAN AI Marketing Team</p>
        <h1>Guess the project. Reveal the proof.</h1>
        <p className="hero-summary">
          This static decision game matches visitors to the right AI case study in three questions or
          fewer. Each reveal leads to a concrete business story, not a generic capability list.
        </p>
      </section>

      <section className="card-shell" aria-live="polite">
        <Confetti enabled={phase === 'result' && !prefersReducedMotion} />

        <div className={`card ${phase === 'thinking' ? 'card-thinking' : ''}`} key={`${currentNodeId}-${phase}`}>
          <header className="card-header">
            <div>
              <p className="eyebrow">
                {phase === 'thinking'
                  ? 'Thinking'
                  : currentNode.type === 'question'
                    ? currentNode.eyebrow
                    : 'Match Found'}
              </p>
              <p className="progress-copy">
                {phase === 'result'
                  ? 'Reveal complete'
                  : `${Math.max(history.length - 1, 0)} decisions made`}
              </p>
            </div>
            <button className="ghost-button" type="button" onClick={handleRestart}>
              Restart
            </button>
          </header>

          {phase === 'thinking' ? (
            <div className="thinking-state" aria-label="Thinking animation">
              <div className="oracle-face">
                <span className="oracle-eye" />
                <span className="oracle-eye" />
                <span className="oracle-mouth" />
              </div>
              <h2>Reading the clues...</h2>
              <p>Searching the project vault for the closest match.</p>
              <div className="thinking-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : currentNode.type === 'question' ? (
            <div className="question-state">
              <h2>{currentNode.prompt}</h2>
              <div className="options-grid">
                {currentNode.options.map((option, index) => (
                  <button
                    key={option.label}
                    className="option-button"
                    type="button"
                    style={{ animationDelay: `${0.12 + index * 0.08}s` }}
                    onClick={() => handleOptionSelect(option.nextId)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="result-state">
              <div className="result-visual-panel">
                <img src={currentNode.heroAsset} alt={`${currentNode.title} illustration`} className="hero-asset" />
              </div>

              <div className="result-content-panel">
                <div className="badge-row">
                  {currentNode.badges.map((badge) => (
                    <span className="badge" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>

                <h2>{currentNode.title}</h2>
                <p className="result-tagline">{currentNode.tagline}</p>
                <p className="result-summary">{currentNode.summary}</p>

                <ul className="impact-list">
                  {currentNode.impactPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                {decisionPath.length > 0 ? (
                  <div className="decision-path" aria-label="Decision path">
                    {decisionPath.map((step) => (
                      <span key={step} className="path-chip">
                        {step}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="cta-row">
                  <a className="cta-primary" href={currentNode.primaryCta.href} target="_blank" rel="noreferrer">
                    {currentNode.primaryCta.label}
                  </a>
                </div>

                <button className="play-again-button" type="button" onClick={handleRestart}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
