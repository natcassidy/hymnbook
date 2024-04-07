class Hymn {
    constructor(id, title, lyrics, audioUrl) {
      this.id = id;
      this.title = title;
      this.lyrics = lyrics;
      this.audioUrl = audioUrl;
    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        lyrics: this.lyrics,
        audioUrl: this.audioUrl,
      };
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Hymn(doc.id, data.title, data.lyrics, data.audioUrl);
    }
  }
  
  export default Hymn;