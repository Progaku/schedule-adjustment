export const convertStatusToSymbol = (status: string) => {
  switch (status) {
    case "ok":
      return "○";
    case "pn":
      return "△";
    default:
      return "×";
  }
};
