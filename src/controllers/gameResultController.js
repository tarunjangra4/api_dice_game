exports.getGameResult = async (req, res) => {
  const { bettingOption, bettingAmount, diceValue } = req.body;
  let result = { result: "", wonAmount: 0 };

  if (
    (diceValue < 7 && bettingOption === "7 Down") ||
    (diceValue > 7 && bettingOption === "7 Up")
  ) {
    result = { result: "win", wonAmount: Number(bettingAmount) };
  } else if (diceValue === 7 && bettingOption === "Lucky 7") {
    result = { result: "win", wonAmount: 4 * Number(bettingAmount) };
  } else {
    result = { result: "lost", wonAmount: Number(-bettingAmount) };
  }

  return res.json({ result });
};
