import { atom } from "recoil";
import { selector } from 'recoil';

export const nameState = atom({
    key: "nameState",
    default : "User",
});

export const nameSelector = selector({
  key: 'nameSelector',
  get: ({ get }) => {
    const name = get(nameState);
    return name;
  },
});
