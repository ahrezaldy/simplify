/** Wikimedia Commons photos used in the deck. CC licences require the on-slide credit. */
export const credits = {
  "henry-ford.jpg": { author: "Hartsook", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Henry_ford_1919_(cropped_square).jpg" },
  "model-t.jpg": { author: "ModelTMitch", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:1925_Ford_Model_T_touring.jpg" },
  "kamprad.jpg": { author: "Sandra Baqirjazid / Swedish Ministry of Enterprise", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Ingvar_Kamprad_Haparanda_June_2010_002_(cropped).jpg" },
  "ikea-store.jpg": { author: "Ben MacLeod", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:IKEA_Halifax_2019.jpg" },
  "speedee-sign.jpg": { author: "Northwalker", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Historic_Downey_McDonalds_Hamburgers_Sign.jpg" },
  "first-mcdonalds.jpg": { author: "Cogart Strangehill", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:First_McDonalds,_San_Bernardino,_California.jpg" },
  "mosquito.jpg": { author: "Pjsime", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:De_Havilland_Mosquito_in_Flight.jpg" },
} as const;

export type PhotoName = keyof typeof credits;
