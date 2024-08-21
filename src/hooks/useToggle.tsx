import { useState } from "react";

export const useToggle = (initialState = false): [boolean, () => void,
    (value: boolean) => void

] => {
    const [state, setState] = useState(initialState);
    const toggle = () => setState((state) => !state);
    const forceSetState = (value: boolean) => setState(value);
    return [state, toggle, forceSetState];
}