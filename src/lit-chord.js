import { LitElement, html, } from 'lit';

const chordProgressions = [
    [1,5,6,4],
    [1,6,2,5],
    [1,6,4,5],
    [1,6,3,5],
    [1,3,4,5],
    [1,5,4,5],
    [1,5,2,4],
    [3,6,2,5],
    [6,4,2,5],
    [6,4,5,1],
    [1,4,1,5],
]

const MAJOR = "major"
const MINOR = "minor"
const DIMINISHED = "diminished"

const rootNotes = "ABCDEFG"
const chords = [MAJOR,MINOR,MINOR,MAJOR,MAJOR,MINOR,DIMINISHED]

const randomChoice = (array) => array[Math.floor(Math.random() * array.length)];


export class LitChord extends LitElement {

    constructor(){
        super()
        this.randomize()
    }

  properties(){
      return {
          rootNote: {type:String},
          progression: {type: Array}
      }
  }

  randomize(){
      this.rootNote = randomChoice(rootNotes);
      this.progression = randomChoice(chordProgressions);

  }

  progressionNumerals(){
    const romanNumerals = [
        'I','II','III','IV','V','VI','VII'
    ]
    return this.progression.map(num=>romanNumerals[num-1]).join(' - ')
  }

  progressionChords(){
    const rootIndex = rootNotes.indexOf(this.rootNote)
    const notes = rootNotes.slice(rootIndex) + rootNotes.slice(0,rootIndex)

    return this.progression.map(num => `${notes[num-1]} ${chords[num-1]}`).join(' - ')
  }

  render() {

    return html`
        <h1>Lit chord</h1>
        <h2>Key: ${this.rootNote}</h2>
        <h2>Chords: </h2>
        <p>
            ${this.progressionNumerals()}
        </p>
        <p>
            ${this.progressionChords()}
        </p>

        <ul>
            <li>Triad practice</li>
            <li>Reactive listening</li>
            <li>Scales</li>
            <li>Arpeggios</li>
        </ul>

    `;
  }
}


customElements.define('lit-chord', LitChord);
