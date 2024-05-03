let userPoints = 5000;

exports.getUserPoints = async (req, res) => {
  return res.json({ userPoints: userPoints });
};

exports.updateUserPoints = async (req, res) => {
  const { bettingAmount, gameResult, bettingOption } = req.body;

  if (gameResult === "win") {
    if (bettingOption === "Lucky 7") {
      userPoints += 4 * Number(bettingAmount);
    } else {
      userPoints += Number(bettingAmount);
    }
  } else {
    userPoints -= Number(bettingAmount);
  }
  return res.json({ userPoints: userPoints });
};
