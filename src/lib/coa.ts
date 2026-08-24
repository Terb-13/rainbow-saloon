/**
 * Chart of accounts for Rainbow Saloon.
 * 4300 / 4510 are the new digital-chat order codes.
 */
export const coa = {
  "4100": {
    code: "4100",
    name: "Food sales — walk-in / phone",
    kind: "food",
    channel: "counter",
  },
  "4300": {
    code: "4300",
    name: "Food sales — digital chat",
    kind: "food",
    channel: "chat",
  },
  "4400": {
    code: "4400",
    name: "Sauce / retail",
    kind: "retail",
    channel: "any",
  },
  "4500": {
    code: "4500",
    name: "Shriners tickets — walk-in / phone / Venmo",
    kind: "ticket",
    channel: "counter",
  },
  "4510": {
    code: "4510",
    name: "Shriners tickets — digital chat",
    kind: "ticket",
    channel: "chat",
  },
} as const;

export type CoaCode = keyof typeof coa;

export const CHAT_FOOD_COA: CoaCode = "4300";
export const CHAT_TICKET_COA: CoaCode = "4510";
