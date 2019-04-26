import {css, html, LitElement} from 'lit-element';

class KaraokeNight extends LitElement {
    constructor() {
        super();

        this.entries = [
            {singer: 'Chris Weber', song: 'Love Me Now', artist: 'John Legend'},
            {singer: 'Chris Weber', song: 'Counting Stars', artist: 'OneRepublic'},
            {singer: 'Someone Else', song: 'Rise Up', artist: 'Andra Day'},
        ];
    }

    static get properties() {
        return {
            entries: {type: Array},
        };
    }

    static get styles() {
        return [
            css`
        :host {
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: #1a2b42;
        }
        .input-missing {
            outline: 1px solid red;
        }

        header {
          margin: auto;
        }

        a {
          color: #217ff9;
        }
      `,

        ];
    }

    evalInput(e) {
        let name = e.target.getAttribute('name');
        if (this.shadowRoot.activeElement && this.shadowRoot.activeElement.value == '') {
            e.target.classList.add('input-missing');
            this.shadowRoot.getElementById('button').classList.add('input-missing');
        }
        else {
            e.target.classList.remove('input-missing');
            // Check if button can be enabled.
        }
    }

    render() {
        return html`
      <h2>The List</h2>
      <div class="append-list">
        ${this.entries.map(entry => html`
            <karaoke-item  .singer=${entry.singer} .song=${entry.song} .artist=${entry.artist} ></karaoke-item>
        `)}
      </div>
    `;
    }

    /** Return False if invalid, True if valid. */
    allowSubmit() {
        const singer = this.shadowRoot.getElementById('singer');
        const song = this.shadowRoot.getElementById('song');
        const artist = this.shadowRoot.getElementById('artist');
        const link = this.shadowRoot.getElementById('link');

        if (singer && song && artist) {
            return (singer.value != '' && song.value != '' && artist.value != '');
        }

        return false;
    }

    handleClick() {
        const newSinger = this.shadowRoot.getElementById('singer').value;
        const newSong = this.shadowRoot.getElementById('song').value;
        const newArtist = this.shadowRoot.getElementById('artist').value;
        const newLink = this.shadowRoot.getElementById('link').value;
        this.entries = [
            ...this.entries,
            {singer: newSinger, song: newSong, artist: newArtist},
        ];

        this.dispatchEvent(new CustomEvent('event-fired', {detail: 'Tried to save data.'}));
    }
}
customElements.define('karaoke-night', KaraokeNight);

class KaraokeItem extends LitElement {
    constructor() {
        super();
        this.singer = 'Sammy';
        this.song = 'Sings it';
        this.artist = "The Sammies";
    }

    static get properties() {
        return {
            singer: {type: String},
            song: {type: String},
            artist: {type: String},
            link: {type: String},
        };
    }

    static get styles() {
        return [
            css`
        :host {
          display: grid;
            grid-template-columns: auto auto;
            border: 3px #444 solid;
            margin: 3px;
            padding-left: 5px;
            background-color: #805e9c;
            text-align: left;
            min-width: 1fr;
            
        }

        .col {
            vertical-align: top;
        }
        
        .singer {
            font-size: 32px;
        }
        
        .song {
            font-size: 24px;
        }
        
        .artist {
            font-size: 16px;
        }
      `,
        ];
    }

    render() {
        return html`

      <a href="${this._getLink()}" alt="youtube karaoke ${this.song} ${this.artist}" target="KaraokeTargetTab">
      <div>
          <div class="col">
              <div class="singer">
                  ${this.singer}
              </div>
          </div>
          <div class="col">
              <div class="song">
                  ${this.song}
              </div>
              <div class="artist">
                  By ${this.artist}
              </div>
          </div>
      </div>
      </a>
    `;
    }

    _getLink() {
        if (this.link) {
            return this.link;
        }

        return `https://www.youtube.com/results?search_query=karaoke+${this.song.toString().replace(" ", "+")}+${this.artist.toString().replace(" ", "+")}`;
    }
}
customElements.define('karaoke-item', KaraokeItem);
