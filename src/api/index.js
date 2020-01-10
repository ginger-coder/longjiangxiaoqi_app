import home from "./home.js";
import login from "./login.js";
import center from "./center.js";
import list from "./list.js";
import delivery from "./delivery";
import collect from "./collect";

export default {
  ...home,
  ...login,
  ...center,
  ...list,
  ...delivery,
  ...collect
}
