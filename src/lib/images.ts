// Deterministic editorial-style placeholder photography, keyed by a stable
// seed (the event slug) so the same event always gets the same image. Swap
// for real photography by setting a mainImage on the event in Wix.
export function placeholderImage(seed: string, width = 900, height = 1125): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

// Real community photography uploaded to the Wix Media Manager, used as the
// mock/offline fallback so local preview matches the live site. The same
// files are set as the mainImage on their matching events in Wix.
export const COMMUNITY_PHOTOS = {
  sunriseYoga: "https://static.wixstatic.com/media/03e457_372b25c262d1404fa892ab52480f264a~mv2.jpg",
  foundersFireside: "https://static.wixstatic.com/media/03e457_b8c1c97d3e1e4ca7afd92c93946be20a~mv2.jpg",
  trailblazersHike: "https://static.wixstatic.com/media/03e457_370a7fa64e5043d3a5aa42e22beadad5~mv2.jpg",
  paintAndPour: "https://static.wixstatic.com/media/03e457_821c09aab3a54eee9a7700f3012bc3fd~mv2.jpg",
  bookClub: "https://static.wixstatic.com/media/03e457_f3da65d6285c457e9b163ef81684851d~mv2.jpg",
  negotiationWorkshop: "https://static.wixstatic.com/media/03e457_fcb08aac1418466b9d1d48909c2d6d32~mv2.jpg",
  newInTownMixer: "https://static.wixstatic.com/media/03e457_a017fb883bc54a6192a77ca459996a2c~mv2.jpg",
  morningRunClub: "https://static.wixstatic.com/media/03e457_eebcdcfabeee46fdb34e6d17383bfe60~mv2.jpg",
  hero: "https://static.wixstatic.com/media/03e457_0151d4f7ad2044d783db34a518680dc5~mv2.jpg",
} as const;
