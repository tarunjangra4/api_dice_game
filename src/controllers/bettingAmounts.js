exports.getBettingAmountsList = async (req, res) => {
  const BettingAmounts = {
    FIRST: 100,
    SECOND: 200,
    THIRD: 500,
  };

  return res.json(BettingAmounts);
};
