// Every word a guest reads lives here. Wording follows the printed card
// (both artboards) verbatim; change it here, not in the components.

const mapSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const site = {
  monogram: { first: "C", second: "D" },
  couple: {
    first: "Cordelia",
    second: "Denzil",
    // Order matches the card: the bride is named first.
    bride: {
      fullName: "Cordelia Ridashisha Lyngdoh",
      parents: "daughter of Mr. Dominic E. Nongkynrih & Mrs. Rofina Lyngdoh",
    },
    groom: {
      fullName: "Denzil Dapbiang Tanglieh",
      parents: "son of Mrs. Valarie Tanglieh & late Mr. Damian Tiewdop",
    },
  },

  occasion: "The Holy Matrimony of",
  invitation: "With joyful hearts, we invite you to celebrate the Holy Matrimony of",

  date: {
    day: "Saturday",
    long: "14th November 2026",
    dotted: "14 . 11 . 2026",
    city: "Shillong",
    // Ceremony start, India Standard Time. Drives the countdown.
    countdownTo: "2026-11-14T13:30:00+05:30",
  },

  verse: {
    text: "So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.",
    ref: "Matthew 19:6",
  },

  events: [
    {
      key: "ceremony",
      icon: "church",
      title: "The Ceremony",
      venue: "Cathedral of Mary Help of Christians",
      area: "Laitumkhrah, Shillong",
      time: "1:30 PM",
      map: mapSearch("Cathedral of Mary Help of Christians, Laitumkhrah, Shillong"),
    },
    {
      key: "reception",
      icon: "cheers",
      title: "The Reception",
      venue: "City Hut Dhaba",
      area: "Oakland Road, Police Bazar, Shillong",
      time: "5:00 PM onwards",
      map: mapSearch("City Hut Dhaba, Oakland Road, Police Bazar, Shillong"),
    },
  ],

  gifts: {
    title: "Gifts",
    lines: [
      "Your presence is our greatest blessing.",
      "Should you wish to offer a token,",
      "an envelope would be warmly appreciated.",
    ],
  },

  // Drop an mp3 into /public/music and set its path here to show the
  // floating play/pause button. Left null, no button is rendered.
  music: null as string | null,
} as const;

export type EventIcon = (typeof site.events)[number]["icon"];
