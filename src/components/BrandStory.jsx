import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { storyIntro, storyBlocks } from "../data/story.js";

function Lines({ text }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

function StoryBlock({ block }) {
  switch (block.type) {
    case "list":
      return (
        <ul className="story-beats">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <p className="story-dialogue">
          <Lines text={block.text} />
        </p>
      );
    case "question":
      return (
        <p className="story-question">
          <Lines text={block.text} />
        </p>
      );
    case "caution":
      return (
        <p className="story-caution">
          <Lines text={block.text} />
        </p>
      );
    case "signature":
      return (
        <p className="story-signature">
          <Lines text={block.text} />
        </p>
      );
    default:
      return (
        <p className="story-para">
          <Lines text={block.text} />
        </p>
      );
  }
}

export default function BrandStory() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="brand-story section">
      <p className="story-lead">{storyIntro}</p>

      {expanded && (
        <div className="story-body">
          {storyBlocks.map((block, index) => (
            <StoryBlock key={index} block={block} />
          ))}
        </div>
      )}

      <button
        className="story-toggle"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
      >
        {expanded ? (
          <>
            Show Less <ChevronUp size={17} />
          </>
        ) : (
          <>
            Read the Full Story <ChevronDown size={17} />
          </>
        )}
      </button>
    </section>
  );
}
