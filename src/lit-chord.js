import { LitElement, html } from 'lit';
import { bulmaStyle } from './bulma-style.js';

const chordProgressions = [
  [1, 5, 6, 4],
  [1, 6, 2, 5],
  [1, 6, 4, 5],
  [1, 6, 3, 5],
  [1, 3, 4, 5],
  [1, 5, 4, 5],
  [1, 5, 2, 4],
  [3, 6, 2, 5],
  [6, 4, 2, 5],
  [6, 4, 5, 1],
  [1, 4, 1, 5],
];

const MAJOR = '';
const MINOR = 'm';
const DIMINISHED = 'diminished';

const rootNotes = 'ABCDEFG';
const noteCircle = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
];

const chords = [MAJOR, MINOR, MINOR, MAJOR, MAJOR, MINOR, DIMINISHED];

const randomChoice = array => array[Math.floor(Math.random() * array.length)];

export class LitChord extends LitElement {
  constructor() {
    super();
    this.randomizeAll();
  }

  // eslint-disable-next-line class-methods-use-this
  static get properties() {
    return {
      rootNote: { type: String },
      progression: { type: Array },
    };
  }

  randomizeRootNote() {
    this.rootNote = randomChoice(rootNotes);
  }

  randomizeProgression() {
    this.progression = randomChoice(chordProgressions);
  }

  randomizeAll() {
    this.randomizeRootNote();
    this.randomizeProgression();
  }

  progressionNumerals() {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    return this.progression.map(num => romanNumerals[num - 1]);
  }

  notesInScale() {
    const majorScale = [2, 2, 1, 2, 2, 2, 1];

    const rootNoteIndex = noteCircle.indexOf(this.rootNote);
    const noteIndices = [rootNoteIndex];
    majorScale.forEach(num => {
      noteIndices.push(num + noteIndices[noteIndices.length - 1]);
    });
    const notes = noteIndices.map(
      index => noteCircle[index % noteCircle.length]
    );

    return notes;
  }

  progressionChords() {
    const notes = this.notesInScale();
    return this.progression.map(num => `${notes[num - 1]}${chords[num - 1]}`);
  }

  render() {
    const numerals = this.progressionNumerals();
    const selectedChords = this.progressionChords();
    const notes = this.notesInScale();

    return html`
      <div class="block box">
        <h1 class="title">Lit chord</h1>
        <h2 class="subtitle">Key: ${this.rootNote}</h2>

        <p><strong>Notes</strong> ${notes.join(' ')}</p>

        <div class="columns is-mobile">
          ${numerals.map(
            (element, index) => html`
              <div class="column">
                <h3 class="title is-3">${element}</h3>
                <h3 class="title is-3">${selectedChords[index]}</h3>
              </div>
            `
          )}
        </div>
        <button class="button" @click=${this.randomizeAll}>
          randomize all
        </button>
        <button class="button" @click=${this.randomizeRootNote}>
          randomize Root note
        </button>
        <button class="button" @click=${this.randomizeProgression}>
          randomize Progression
        </button>
      </div>
      ${bulmaStyle}
    `;
  }
}

customElements.define('lit-chord', LitChord);
