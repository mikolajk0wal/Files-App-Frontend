import { setupServer } from "msw/node";
import { handlers } from "./handlers";

//@TODO Testy do apki zrobić

export const server = setupServer(...handlers);
